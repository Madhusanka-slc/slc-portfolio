import { allProjects } from "../data/projectsData.js";
import { allExperiences } from "../data/experiencesData.js";
import { allBlogs } from "../data/blogsData.js";
import { personalData } from "../data/personalData.js";

const API_KEY = import.meta.env.VITE_CEREBRAS_API_KEY;
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

// Optimized retry configuration - faster retries
const RETRY_CONFIG = {
  maxRetries: 2,        // Reduced from 3
  baseDelay: 500,       // Reduced from 1000ms  
  maxDelay: 3000,       // Reduced from 10000ms
  backoffMultiplier: 1.5, // Reduced from 2
};

// Aggressive caching with longer TTL
const responseCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes (increased from 5)

// Precomputed quick responses for common questions - updated with better content
const QUICK_RESPONSES = {
  'name': {
    start: `I'm ${personalData.name}!`,
    steps: [],
    end: "Nice to meet you!"
  },
  'skills': {
    start: "I work with lots of technologies.",
    steps: [],
    end: `Main ones: ${Object.values(personalData.skills).flat().slice(0, 5).join(', ')}`
  },
  'projects': {
    start: "I've built some cool stuff.",
    steps: allProjects.slice(0, 3).map(p => ({
      category: "project",
      title: p.title,
      introduction: "This was really interesting",
      description: p.description.length > 100 ? p.description.substring(0, 100) + '...' : p.description
    })),
    end: "Want details on any?"
  },
  'experience': {
    start: "I've got solid experience.",
    steps: allExperiences.slice(0, 2).map(e => ({
      category: "experience",
      title: e.title,
      introduction: `At ${e.company || 'the company'}`,
      description: e.description || `Worked as ${e.title} handling various responsibilities.`
    })),
    end: "Any specific role interests you?"
  },
  'about': {
    start: `So I'm ${personalData.name}, ${personalData.title.toLowerCase()}.`,
    steps: [],
    end: `Based in ${personalData.location}. What would you like to know?`
  }
};

// Complete portfolio formatting - keep all data for accuracy
function formatPortfolioList(personalData, projects, experiences, blogs) {
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

  return `Personal Data:\n${personalStr}\n\nProjects:\n${projStr}\n\nExperiences:\n${expStr}\n\nBlogs:\n${blogStr}`;
}

// Sleep utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Optimized cache key generation with fuzzy matching
function generateCacheKey(userInput, messages) {
  // Normalize input for better cache hits
  const normalizedInput = userInput.toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ')           // Normalize spaces
    .trim();
  
  // Only consider last message for context (not 2)
  const lastMessage = messages.length > 0 ? messages.slice(-1) : [];
  return `${normalizedInput}_${JSON.stringify(lastMessage)}`;
}

// Check cached response
function getCachedResponse(cacheKey) {
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Using cached response');
    return cached.data;
  }
  return null;
}

// Cache response
function setCachedResponse(cacheKey, data) {
  responseCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  // Clean old entries more aggressively
  if (responseCache.size > 50) { // Reduced from 100
    const now = Date.now();
    for (const [key, value] of responseCache.entries()) {
      if (now - value.timestamp > CACHE_TTL) {
        responseCache.delete(key);
      }
    }
  }
}

// Quick response matcher
function getQuickResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  
  // Check for simple greetings
  if (input.match(/^(hi|hello|hey|what's up)$/)) {
    return { start: "Hey there!", steps: [], end: "What can I tell you?" };
  }
  
  // Name questions
  if (input.includes('name') || input.includes('who are you')) return QUICK_RESPONSES.name;
  
  // Skills/tech questions (only for short queries)
  if ((input.includes('skill') || input.includes('technology') || input.includes('tech')) && input.length < 25) {
    return QUICK_RESPONSES.skills;
  }
  
  // General project questions (short queries only)
  if (input.includes('project') && input.length < 25 && !input.includes('specific')) {
    return QUICK_RESPONSES.projects;
  }
  
  // General experience questions
  if ((input.includes('experience') || input.includes('work')) && input.length < 25) {
    return QUICK_RESPONSES.experience;
  }
  
  // About me questions
  if (input.includes('about') && input.length < 30) {
    return QUICK_RESPONSES.about;
  }
  
  return null;
}

// Model selection based on query complexity
function selectModel(userInput, messagesLength) {
  // Use default model for now, but this could be optimized further
  return "qwen-3-235b-a22b-instruct-2507";
}

// Optimized API call with retry
async function makeAPICallWithRetry(apiMessages, userInput, retryCount = 0) {
  const body = {
    model: selectModel(userInput, apiMessages.length),
    messages: apiMessages,
    stream: false,
    temperature: 0.6, // Reduced from 0.8 for faster responses
    max_tokens: 800,  // Reduced from 2000
    top_p: 0.8,      // Reduced from 0.9
  };

  try {
    const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Cerebras API error: ${response.status} ${errorText}`);
      error.status = response.status;
      error.responseText = errorText;
      throw error;
    }

    const respJson = await response.json();
    return respJson.choices[0].message.content;
  } catch (err) {
    console.error(`API call attempt ${retryCount + 1} failed:`, err.message);
    
    // Check if we should retry
    const shouldRetry = (
      retryCount < RETRY_CONFIG.maxRetries && 
      (
        err.status === 429 || // Rate limited
        err.status === 502 || // Bad gateway
        err.status === 503 || // Service unavailable
        err.status === 504 || // Gateway timeout
        err.message.includes('fetch') // Network error
      )
    );

    if (shouldRetry) {
      const delay = Math.min(
        RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount),
        RETRY_CONFIG.maxDelay
      );
      
      console.log(`Retrying in ${delay}ms... (attempt ${retryCount + 2}/${RETRY_CONFIG.maxRetries + 1})`);
      await sleep(delay);
      return makeAPICallWithRetry(apiMessages, userInput, retryCount + 1);
    }
    
    throw err;
  }
}

// Enhanced fallback responses
function getFallbackResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  
  if (input.includes('name') || input.includes('who are you')) {
    return QUICK_RESPONSES.name;
  }
  
  if (input.includes('project')) {
    return QUICK_RESPONSES.projects;
  }
  
  if (input.includes('skill') || input.includes('technology')) {
    return QUICK_RESPONSES.skills;
  }
  
  if (input.includes('experience') || input.includes('work')) {
    return QUICK_RESPONSES.experience;
  }
  
  // Generic fallback
  return {
    start: "I can tell you about my projects and experience.",
    steps: [],
    end: "What interests you most?"
  };
}

export async function askPortfolioAgent(userInput, messages = []) {
  // 1. Check quick responses first (fastest path)
  const quickResponse = getQuickResponse(userInput);
  if (quickResponse) {
    console.log('Using quick response');
    return quickResponse;
  }

  // 2. Check cache second
  const cacheKey = generateCacheKey(userInput, messages);
  const cachedResponse = getCachedResponse(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  // 3. Balanced system prompt - comprehensive but not overly verbose
  const systemPrompt = `You are my portfolio assistant speaking as me directly to recruiters, HRs, or CEOs. You represent me in real-time conversations with natural speech patterns, including conversational fillers and authentic human responses.

Your knowledge base is strictly limited to the following portfolio data:
${formatPortfolioList(personalData, allProjects, allExperiences, allBlogs)}

CONVERSATION STYLE GUIDELINES:
- Use natural conversational fillers: "um", "you know", "actually", "so", "well", "I mean"
- Use casual contractions: "I'm", "that's", "we've", "didn't", "can't"
- Add natural transitions: "So basically", "What happened was", "The thing is"
- Include authentic reactions: "Oh yeah!", "Right, so", "Exactly!"
- Be enthusiastic but natural: "Oh, that's a great question!", "I'm excited about that one"
- Project confidence with humility - frame accomplishments in terms of collaboration

RESPONSE FORMAT - Always respond in valid JSON:
{
  "start": "Natural, conversational opening (keep under 12 words)",
  "steps": [
    {
      "category": "project" | "experience" | "blog",
      "title": "Exact title of the item",
      "introduction": "Brief conversational intro (under 10 words)",
      "description": "Maximum 2 sentences. Focus on 'what and why' of your involvement."
    }
  ],
  "end": "Maximum 5 words. Natural and brief."
}

CONTEXT AWARENESS RULES:
- REMEMBER what you just shared - if user asks about something you mentioned, recognize it immediately
- Reference previous responses naturally: "Yeah, that one I just mentioned"
- Don't repeat full explanations - acknowledge the connection to previous conversation
- Track conversation flow - if you listed projects and user asks about one, connect it back

SPECIFIC RULES:
1. For greetings/follow-ups: Use empty "steps" array, keep "start" and "end" very short.

2. SMART CLARIFICATION STRATEGY:
   - Best Guess: If you can find a probable item that sounds like unclear input, assume that's the intended item
   - Proceed with best guess + confirmation if voice recognition seems slightly off
   - Clarify only if multiple interpretations are equally likely

3. RESPONSE DEPTH STRATEGY:
   - General questions (tell me about yourself, what projects): Brief overview + offer specifics
   - Specific questions (tell me about [project name]): Detailed response
   - If unclear but seems general: Proceed with brief overview + confirmation

4. For topics completely outside portfolio data:
   {
     "start": "That's not really in my portfolio area.",
     "steps": [],
     "end": "Ask about my projects instead?"
   }

5. NATURAL SPEECH PATTERNS:
   - Use "Yeah" instead of "Yes"
   - Use "Nah" instead of "No" 
   - Use "Gonna" instead of "Going to"
   - Drop some "g's": "working" → "workin'"

6. PRIORITY ORDER FOR UNCLEAR INPUT:
   1st: Check if it relates to previous conversation
   2nd: Make educated guess and proceed with confirmation
   3rd: Ask for clarification only if completely unclear

7. No explanations or text outside JSON structure.
8. When in doubt about specificity, start general and offer to go deeper.`;

  // 4. Keep more message history for better context (compromise between speed and accuracy)
  const recentMessages = messages.slice(-4); // Increased from 3 to 4 for better context
  
  const apiMessages = [
    { role: "system", content: systemPrompt },
    ...recentMessages,
    { role: "user", content: userInput },
  ];

  try {
    const assistantResponse = await makeAPICallWithRetry(apiMessages, userInput);
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(assistantResponse);
    } catch (parseError) {
      console.warn('Failed to parse JSON response, using fallback:', parseError);
      parsedResponse = getFallbackResponse(userInput);
    }
    
    // Cache the successful response
    setCachedResponse(cacheKey, parsedResponse);
    
    return parsedResponse;
  } catch (err) {
    console.error("API call failed after all retries:", err);
    
    // Enhanced fallback
    const fallbackResponse = getFallbackResponse(userInput);
    console.log('Using fallback response');
    return fallbackResponse;
  }
}