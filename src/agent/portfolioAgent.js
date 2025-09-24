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
  maxRetries: 3,
  baseDelay: 1000, // Start with 1 second
  maxDelay: 10000, // Max 10 seconds
  backoffMultiplier: 2,
};

// Simple in-memory cache for responses
const responseCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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

// Sleep utility for delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate cache key from user input and recent messages
function generateCacheKey(userInput, messages) {
  const recentMessages = messages.slice(-2); // Only consider last 2 messages for context
  return `${userInput.toLowerCase().trim()}_${JSON.stringify(recentMessages)}`;
}

// Check if cached response is still valid
function getCachedResponse(cacheKey) {
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Using cached response');
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
  
  // Clean old cache entries periodically
  if (responseCache.size > 100) {
    const now = Date.now();
    for (const [key, value] of responseCache.entries()) {
      if (now - value.timestamp > CACHE_TTL) {
        responseCache.delete(key);
      }
    }
  }
}

// Summarize conversation history to maintain context while keeping it concise
async function summarizeConversationHistory(messages) {
  if (messages.length <= 4) {
    // If we have 4 or fewer messages (2 Q&A pairs), no summarization needed
    return messages;
  }

  try {
    // Keep the last 4 messages (2 Q&A pairs) and summarize the rest
    const messagesToSummarize = messages.slice(0, -4);
    const recentMessages = messages.slice(-4);

    // Create summarization prompt
    const summarizationMessages = [
      {
        role: "system",
        content: `You are helping to summarize a conversation between a user and a portfolio assistant. 
        Create a very brief summary (max 2-3 sentences) that captures:
        1. What topics/projects/experiences were discussed
        2. Any specific interests or focus areas the user showed
        3. Key context needed for ongoing conversation
        
        Keep it concise and conversational. Focus only on portfolio-related topics.`
      },
      {
        role: "user",
        content: `Please summarize this conversation history:\n\n${messagesToSummarize.map(m => `${m.role}: ${m.content}`).join('\n\n')}`
      }
    ];

    const summaryResponse = await makeAPICallWithRetry(summarizationMessages);
    
    // Create a condensed history with summary + recent messages
    const condensedHistory = [
      {
        role: "system",
        content: `Previous conversation summary: ${summaryResponse}`
      },
      ...recentMessages
    ];

    console.log(`Summarized ${messagesToSummarize.length} messages into context summary`);
    return condensedHistory;

  } catch (error) {
    console.warn('Failed to summarize conversation history, keeping last 4 messages only:', error);
    // Fallback: just keep the last 4 messages
    return messages.slice(-4);
  }
}

// Enhanced retry logic with exponential backoff
async function makeAPICallWithRetry(apiMessages, retryCount = 0) {
  const body = {
    model: "qwen-3-235b-a22b-instruct-2507",
    messages: apiMessages,
    stream: false,
    temperature: 0.8,
    max_tokens: 2000,
    top_p: 0.9,
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
      return makeAPICallWithRetry(apiMessages, retryCount + 1);
    }
    
    throw err;
  }
}

// Fallback responses for common questions when API fails
function getFallbackResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  
  // Simple keyword matching for common questions
  if (input.includes('name') || input.includes('who are you')) {
    return {
      start: `I'm ${personalData.name}, nice to meet you!`,
      steps: [],
      end: "What would you like to know?"
    };
  }
  
  if (input.includes('project') && !input.includes('specific')) {
    return {
      start: "I've worked on several cool projects.",
      steps: allProjects.slice(0, 2).map(p => ({
        category: "project",
        title: p.title,
        introduction: "This was really interesting",
        description: p.description.split('.')[0] + '.'
      })),
      end: "Want details on any?"
    };
  }
  
  if (input.includes('skill') || input.includes('technology')) {
    const skills = Object.values(personalData.skills).flat().slice(0, 5).join(', ');
    return {
      start: "I work with quite a few technologies.",
      steps: [],
      end: `Main ones: ${skills}`
    };
  }
  
  return null;
}

export async function askPortfolioAgent(userInput, messages = []) {
  // Summarize conversation history if it's getting too long
  const processedMessages = await summarizeConversationHistory(messages);
  
  // Check cache first (using processed messages for cache key)
  const cacheKey = generateCacheKey(userInput, processedMessages);
  const cachedResponse = getCachedResponse(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  const systemPrompt = `
You are my portfolio assistant speaking as me directly to recruiters, HRs, or CEOs. You represent me in real-time conversations with natural speech patterns, including conversational fillers and authentic human responses.

Your knowledge base is strictly limited to the following portfolio data:
${formatPortfolioList(personalData, allProjects, allExperiences, allBlogs)}

CONVERSATION STYLE GUIDELINES:
- Use natural conversational fillers: "um", "you know", "actually", "so", "well", "I mean", "like"
- Include authentic hesitation sounds: "uhh", "hmm", "ah", "oh"  
- Use casual contractions: "I'm", "that's", "we've", "didn't", "can't"
- Add natural transitions: "So basically", "What happened was", "The thing is"
- Include authentic reactions: "Oh yeah!", "Right, so", "Exactly!"
- Use conversational confirmations: "you see", "you know what I mean?", "if that makes sense"
- Be enthusiastic but natural: "Oh, that's a great question!", "I'm excited about that one"
- **Project confidence with humility** - frame accomplishments in terms of collaboration and problem-solving

RESPONSE FORMAT - Always respond in valid JSON. You have two valid JSON formats:
1. **Response with content if skills projects blogs experience related**:
{
  "start": "Natural, conversational opening with fillers (keep under 15 words)",
  "steps": [
    {
      "category": "project" | "experience" | "blog",
      "title": "Exact title of the item",
      "introduction": "Brief conversational intro with natural speech patterns (under 12 words)",
      "description": "Maximum 2 sentences. Focus on 'what and why' of your involvement."
    }
  ],
  "end": "Maximum 6 words. Natural and brief."
}
2. **Clarification/Confirmation question or asking personal details**:
{
  "start": "Natural, conversational question (under 15 words)",
  "steps": [],
  "end": null
}

CONTEXT AWARENESS RULES:
- **REMEMBER what you just shared** - if user asks about something you mentioned in previous response, recognize it immediately
- **Reference previous responses naturally**: "Yeah, that one I just mentioned" or "Right, from that list I gave you"
- **Don't repeat full explanations** - acknowledge the connection to previous conversation
- **Track conversation flow** - if you listed projects and user asks about one, connect it back

CONVERSATION FLOW EXAMPLES:
User: "What projects do you have?"
You: [Lists Project A, Project B, Project C]

User: "Tell me about Project B"  
CORRECT: "Oh yeah, Project B - the one I just mentioned!"
WRONG: "Hmm, what project are you asking about?"

User: "The React one"
CORRECT: "Right, the React project from that list!"
WRONG: "Which React project?"

SPECIFIC RULES:

1. **For greetings/follow-ups**: Use empty "steps" array, keep "start" and "end" very short.

2. **SMART CLARIFICATION STRATEGY** (Crucial for voice-based interaction):
   
   **When to clarify vs. when to proceed:**
   - **Best Guess**: If you can find a probable item in the portfolio data that sounds like the unclear input, assume that is the intended item.
   - **Proceed with best guess + confirmation**: If the voice recognition is slightly off, proceed by explaining the best-fit item and briefly confirm the guess.
   - **Clarify only if multiple interpretations are equally likely**: If you can't confidently guess, ask a brief clarification question.
   - **Ask for repeat if completely unclear**: If no match is found, ask for a repeat using a natural phrase.
   
   **Clarification Examples:**
   - You hear: "complet vision project"
      **CORRECT**: Guess a similar project like "Computer Vision Project" and respond about it.
      **WRONG**: Ask "What project?"
   - You hear: "wait word detection"
      **CORRECT**: Guess a similar project like "Wake Word Detection" and respond about it.
      **WRONG**: Ask "What are you talking about?"

   **Smart Response Pattern:**
   {
     "start": "[Best guess interpretation] - is that what you meant?",
     "steps": [relevant content based on guess],
     "end": "Right track?"
   }
   
3. **RESPONSE DEPTH STRATEGY**:

   **GENERAL/OVERVIEW QUESTIONS** (Keep brief, high-level summaries):
   - "Tell me about yourself" → Brief personal summary
   - "What technologies do you know?" → Quick skills overview  
   - "What projects have you done?" → Brief list with 1-sentence descriptions
   - "Your experience?" → Brief career highlights
   
   Example General Response:
   {
     "start": "So I'm a full-stack developer who loves building cool stuff.",
     "steps": [
       {
         "category": "project",
         "title": "Project A",
         "introduction": "This was a React app",
         "description": "Built an e-commerce platform with real-time features."
       },
       {
         "category": "project", 
         "title": "Project B",
         "introduction": "And this Python one",
         "description": "Created a machine learning model for data analysis."
       }
     ],
     "end": "Want details on any specific one?"
   }

   **SPECIFIC QUESTIONS** (Provide detailed explanations):
   - "Tell me about [specific project name]" → Full project details with steps
   - "How did you build [specific thing]?" → Technical details and process
   - "What was your role in [specific experience]?" → Detailed role explanation
   
   Example Specific Response:
   {
     "start": "Oh yeah, that project was really exciting!",
     "steps": [
       {
         "category": "project",
         "title": "Specific Project Name",
         "introduction": "So this was a really challenging build",
         "description": "I built this using React and Node.js. The main challenge was handling real-time data, which I solved using WebSocket connections and Redux for state management."
       }
     ],
     "end": "Pretty cool stuff!"
   }

   **RECOGNITION RULES**:
   - If question mentions specific project/blog/experience name → Detailed response
   - If question is general/broad → Brief summary + offer specifics
   - If unclear but seems general → Proceed with brief overview + confirmation
   - If user references something from previous response → Acknowledge connection immediately

4. **For topics completely outside portfolio data**:
   {
     "start": "That's not really in my portfolio area.",
     "steps": [],
     "end": "Ask about my projects instead?"
   }

5. **CONVERSATION EXAMPLES**:
   - Instead of: "I have experience in React"
   - Say: "Yeah, I've been using React quite a bit"
   
   - Instead of: "This project demonstrates my skills"  
   - Say: "This project shows my problem-solving approach"
   
   - Instead of: "I single-handedly designed the database"
   - Say: "I led the database design with my team"

6. **PRIORITY ORDER FOR UNCLEAR INPUT**:
   1st: Check if it relates to previous conversation
   2nd: Make educated guess and proceed with confirmation
   3rd: Ask for clarification only if completely unclear
   
7. **LENGTH LIMITS** (CRITICAL):
   - "start": Never exceed 15 words
   - "introduction": Never exceed 12 words  
   - "description": Maximum 2 sentences
   - "end": Maximum 6 words
   
8. **NATURAL SPEECH PATTERNS**:
   - Use "Yeah" instead of "Yes"
   - Use "Nah" instead of "No" 
   - Use "Gonna" instead of "Going to"
   - Use "Wanna" instead of "Want to"
   - Drop some "g's": "working" → "workin'"

9. **ERROR RECOVERY PHRASES** for unclear input:
   - "Hmm, I think you might be asking about...?"
   - "Are you asking about [most likely guess]?"
   - "Could you repeat that? I didn't quite catch it."

10. No explanations or text outside JSON structure.
11. **SMART CONVERSATION FLOW**: Don't ask for clarification repeatedly - make educated guesses and confirm briefly.
12. **CONTEXT FIRST**: Always check if the question relates to something you just mentioned before treating it as a new topic.
13. When in doubt about specificity, start general and offer to go deeper.
`;

  const apiMessages = [
    { role: "system", content: systemPrompt },
    ...processedMessages,
    { role: "user", content: userInput },
  ];

  try {
    const assistantResponse = await makeAPICallWithRetry(apiMessages);
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(assistantResponse);
    } catch (parseError) {
      console.warn('Failed to parse JSON response, using raw response:', parseError);
      parsedResponse = { raw: assistantResponse };
    }
    
    // Cache the successful response
    setCachedResponse(cacheKey, parsedResponse);
    
    return parsedResponse;
  } catch (err) {
    console.error("API call failed after all retries:", err);
    
    // Try fallback response
    const fallbackResponse = getFallbackResponse(userInput);
    if (fallbackResponse) {
      console.log('Using fallback response');
      return fallbackResponse;
    }
    
    // If all else fails, throw the error
    throw err;
  }
}