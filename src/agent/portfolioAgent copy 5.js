import { allProjects } from "../data/projectsData.js";
import { allExperiences } from "../data/experiencesData.js";
import { allBlogs } from "../data/blogsData.js";
import { personalData } from "../data/personalData.js";

const API_KEY = import.meta.env.VITE_CEREBRAS_API_KEY;
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

// Rate limiting and retry configuration
const RETRY_CONFIG = {
  maxRetries: 2, // Reduced from 3
  baseDelay: 500, // Reduced from 1000ms
  maxDelay: 5000, // Reduced from 10000ms
  backoffMultiplier: 2,
};

// Simple in-memory cache for responses
const responseCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes (increased)

// Pre-formatted portfolio data (CACHE THIS!)
let cachedPortfolioData = null;

function formatPortfolioList(personalData, projects, experiences, blogs) {
  if (cachedPortfolioData) return cachedPortfolioData;
  
  const personalStr = `
About Me:
- Name: ${personalData.name}
- Title: ${personalData.title}
- Location: ${personalData.location}
- Summary: ${personalData.about}
- Key Skills: ${Object.values(personalData.skills).flat().join(", ")}
- Education: ${personalData.education[0].degree} at ${personalData.education[0].institution} (${personalData.education[0].period})
`;

  const projStr = projects
    .map(
      (p, i) =>
        `${i + 1}. "${p.title}": ${p.description} [Skills: ${
          p.skills?.join(", ") || "Not specified"
        }]`
    )
    .join("\n");
  const expStr = experiences
    .map(
      (e, i) =>
        `${i + 1}. "${e.title}" at ${e.company || "N/A"}: [Skills: ${
          e.skills?.join(", ") || "Not specified"
        }]`
    )
    .join("\n");
  const blogStr = blogs
    .map(
      (b, i) =>
        `${i + 1}. "${b.title}": ${b.description} [Skills: ${
          b.skills?.join(", ") || "Not specified"
        }]`
    )
    .join("\n");

  cachedPortfolioData = `Personal Data:\n${personalStr}\n\nProjects:\n${projStr}\n\nExperiences:\n${expStr}\n\nBlogs:\n${blogStr}`;
  return cachedPortfolioData;
}

// Sleep utility for delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate cache key from user input and recent messages
function generateCacheKey(userInput, messages) {
  const recentMessages = messages.slice(-2);
  const key = `${userInput.toLowerCase().trim()}_${recentMessages.length}`;
  return key; // Simplified key generation
}

// Check if cached response is still valid
function getCachedResponse(cacheKey) {
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

// Cache a response
function setCachedResponse(cacheKey, data) {
  responseCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
}

// SIMPLIFIED conversation history - remove summarization complexity
function simplifyConversationHistory(messages) {
  // Keep only last 3 exchanges (6 messages) for context
  if (messages.length <= 6) return messages;
  return messages.slice(-6);
}

// STREAMING implementation for real-time feel
async function makeStreamingAPICall(apiMessages, onToken) {
  const body = {
    model: "qwen-3-235b-a22b-instruct-2507",
    messages: apiMessages,
    stream: true, // ENABLE STREAMING
    temperature: 0.4, // LOWER for faster responses
    max_tokens: 250, // REDUCED from 500
    top_p: 0.8,
  };

  const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} ${errorText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullResponse = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const data = JSON.parse(line.slice(6));
            const token = data.choices[0]?.delta?.content;
            
            if (token) {
              fullResponse += token;
              onToken(token, fullResponse);
            }
          } catch (e) {
            // Skip malformed JSON lines
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullResponse;
}

// Fallback responses for common questions (EXPANDED)
function getFallbackResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  
  // Expanded fallback responses
  const fallbacks = {
    name: {
      start: `Hey, I'm ${personalData.name}!`,
      steps: [],
      end: "What can I tell you about?"
    },
    projects: {
      start: "I've worked on some cool projects.",
      steps: allProjects.slice(0, 2).map(p => ({
        category: "project",
        title: p.title,
        introduction: "This was interesting",
        description: p.description.split('.')[0] + '.'
      })),
      end: "Want details on any?"
    },
    skills: {
      start: "I work with various technologies.",
      steps: [],
      end: `Main skills: ${Object.values(personalData.skills).flat().slice(0, 5).join(', ')}`
    },
    experience: {
      start: "I've had some great experiences.",
      steps: allExperiences.slice(0, 2).map(e => ({
        category: "experience",
        title: e.title,
        introduction: `At ${e.company}`,
        description: e.description?.split('.')[0] + '.' || 'Gained valuable experience.'
      })),
      end: "Which one interests you?"
    },
    default: {
      start: "I'd love to tell you about my work.",
      steps: [],
      end: "Ask me anything!"
    }
  };

  if (input.includes('name') || input.includes('who are you')) return fallbacks.name;
  if (input.includes('project')) return fallbacks.projects;
  if (input.includes('skill') || input.includes('tech')) return fallbacks.skills;
  if (input.includes('experience') || input.includes('job')) return fallbacks.experience;
  
  return fallbacks.default;
}

// DEBOUNCE utility to prevent rapid successive calls
let lastCallTime = 0;
const DEBOUNCE_DELAY = 1000; // 1 second between calls

export async function askPortfolioAgent(userInput, messages = [], onStreamToken = null) {
  // Debounce rapid calls
  const now = Date.now();
  if (now - lastCallTime < DEBOUNCE_DELAY) {
    await sleep(DEBOUNCE_DELAY - (now - lastCallTime));
  }
  lastCallTime = Date.now();

  // Simplify conversation history
  const processedMessages = simplifyConversationHistory(messages);
  
  // Check cache first
  const cacheKey = generateCacheKey(userInput, processedMessages);
  const cachedResponse = getCachedResponse(cacheKey);
  if (cachedResponse && !onStreamToken) { // Don't use cache for streaming calls
    return cachedResponse;
  }

  const systemPrompt = `
You are my portfolio assistant. Respond concisely in 1-2 sentences maximum. Keep responses under 50 words.

Your knowledge base:
${formatPortfolioList(personalData, allProjects, allExperiences, allBlogs)}

Respond in JSON format only:
{
  "start": "Brief opening (max 10 words)",
  "steps": [{
    "category": "project|experience|blog", 
    "title": "Item name",
    "introduction": "Brief context (max 8 words)",
    "description": "1 sentence maximum"
  }],
  "end": "Short closing (max 5 words)"
}

Be direct and conversational. No explanations.`;
  
  const apiMessages = [
    { role: "system", content: systemPrompt },
    ...processedMessages,
    { role: "user", content: userInput },
  ];

  try {
    let assistantResponse;
    
    if (onStreamToken) {
      // Use streaming for real-time feel
      assistantResponse = await makeStreamingAPICall(apiMessages, onStreamToken);
    } else {
      // Use regular API call with retry logic
      assistantResponse = await makeAPICallWithRetry(apiMessages);
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(assistantResponse);
    } catch (parseError) {
      console.warn('JSON parse failed, using fallback');
      parsedResponse = getFallbackResponse(userInput);
    }
    
    // Cache successful response
    if (!onStreamToken) {
      setCachedResponse(cacheKey, parsedResponse);
    }
    
    return parsedResponse;
  } catch (err) {
    console.error("API call failed:", err);
    return getFallbackResponse(userInput);
  }
}

// Regular API call with retry (for non-streaming)
async function makeAPICallWithRetry(apiMessages, retryCount = 0) {
  const body = {
    model: "qwen-3-235b-a22b-instruct-2507",
    messages: apiMessages,
    stream: false,
    temperature: 0.4,
    max_tokens: 250,
    top_p: 0.8,
  };

  try {
    const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    if (retryCount < RETRY_CONFIG.maxRetries) {
      const delay = Math.min(
        RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount),
        RETRY_CONFIG.maxDelay
      );
      await sleep(delay);
      return makeAPICallWithRetry(apiMessages, retryCount + 1);
    }
    throw err;
  }
}