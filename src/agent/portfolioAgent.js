import { allProjects } from '../data/projectsData.js';
import { allExperiences } from '../data/experiencesData.js';
import { allBlogs } from '../data/blogsData.js';
import { personalData } from '../data/personalData.js';
import { generateSystemPrompt } from './promptTemplate.js';

// Configuration
const CONFIG = {
  api: {
    key: import.meta.env.VITE_CEREBRAS_API_KEY,
    baseUrl: 'https://api.cerebras.ai/v1/chat/completions',
    defaultModel: 'qwen-3-235b-a22b-instruct-2507',
  },
  retry: {
    maxRetries: 2,
    baseDelay: 500,
    maxDelay: 3000,
    backoffMultiplier: 1.5,
  },
  cache: {
    ttl: 10 * 60 * 1000, // 10 minutes
    maxSize: 50,
  },
  model: {
    temperature: 0.6,
    maxTokens: 800,
    topP: 0.8,
  },
  context: {
    maxMessages: 4,
  },
};

// Constants
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${CONFIG.api.key}`,
};

const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);

// Cache management
class ResponseCache {
  constructor(ttl, maxSize) {
    this.cache = new Map();
    this.ttl = ttl;
    this.maxSize = maxSize;
  }

  get(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      console.log('Using cached response');
      return cached.data;
    }
    return null;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
    this.cleanup();
  }

  cleanup() {
    if (this.cache.size > this.maxSize) {
      const now = Date.now();
      for (const [key, value] of this.cache.entries()) {
        if (now - value.timestamp > this.ttl) {
          this.cache.delete(key);
        }
      }
    }
  }
}

const responseCache = new ResponseCache(CONFIG.cache.ttl, CONFIG.cache.maxSize);

// Utility functions
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeInput(input) {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateCacheKey(userInput, messages) {
  const normalizedInput = normalizeInput(userInput);
  const lastMessage = messages.length > 0 ? messages.slice(-1) : [];
  return `${normalizedInput}_${JSON.stringify(lastMessage)}`;
}

// Simple fallback for extreme errors only
function getEmergencyFallback() {
  return {
    start: 'Sorry, having technical issues.',
    steps: [],
    end: 'Please try again.',
  };
}

// API interaction
function isRetryableError(error) {
  return (
    RETRYABLE_STATUS_CODES.has(error.status) || error.message.includes('fetch')
  );
}

async function makeAPICall(messages, userInput, retryCount = 0) {
  const requestBody = {
    model: CONFIG.api.defaultModel,
    messages,
    stream: false,
    temperature: CONFIG.model.temperature,
    max_tokens: CONFIG.model.maxTokens,
    top_p: CONFIG.model.topP,
  };

  try {
    const response = await fetch(CONFIG.api.baseUrl, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Cerebras API error: ${response.status} ${errorText}`);
      error.status = response.status;
      error.responseText = errorText;
      throw error;
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error(`API call attempt ${retryCount + 1} failed:`, error.message);

    const shouldRetry = retryCount < CONFIG.retry.maxRetries && isRetryableError(error);

    if (shouldRetry) {
      const delay = Math.min(
        CONFIG.retry.baseDelay * Math.pow(CONFIG.retry.backoffMultiplier, retryCount),
        CONFIG.retry.maxDelay
      );

      console.log(
        `Retrying in ${delay}ms... (attempt ${retryCount + 2}/${CONFIG.retry.maxRetries + 1})`
      );
      await sleep(delay);
      return makeAPICall(messages, userInput, retryCount + 1);
    }

    throw error;
  }
}

// Main function
export async function askPortfolioAgent(userInput, messages = []) {
  // Check cache first
  const cacheKey = generateCacheKey(userInput, messages);
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Prepare messages for API - LLM handles everything
  const recentMessages = messages.slice(-CONFIG.context.maxMessages);
  const systemPrompt = generateSystemPrompt(
    personalData,
    allProjects,
    allExperiences,
    allBlogs
  );

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...recentMessages,
    { role: 'user', content: userInput },
  ];

  try {
    const assistantResponse = await makeAPICall(apiMessages, userInput);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(assistantResponse);
      
      // Validate response structure
      if (!parsedResponse.start || !parsedResponse.end || !Array.isArray(parsedResponse.steps)) {
        console.warn('Invalid response structure, retrying...');
        throw new Error('Invalid JSON structure');
      }
      
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.log('Raw response:', assistantResponse);
      
      // Only use emergency fallback for catastrophic errors
      return getEmergencyFallback();
    }

    // Cache the successful response
    responseCache.set(cacheKey, parsedResponse);
    return parsedResponse;
    
  } catch (error) {
    console.error('API call failed after all retries:', error);
    return getEmergencyFallback();
  }
}