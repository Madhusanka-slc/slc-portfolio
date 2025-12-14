/**
 * agentService.js
 * ------------------------------------------------------------------
 * Central AI agent layer responsible for communicating with the LLM
 * (Cerebras / Groq / any OpenAI-compatible provider) and returning
 * structured responses for the voice-driven portfolio experience.
 *
 * Responsibilities:
 * - Build system prompts using portfolio data (projects, blogs, experience, personal info)
 * - Send user queries and recent conversation context to the AI API
 * - Parse, validate, and normalize structured JSON agent responses
 * - Normalize navigation target keys to match DOM element IDs
 * - Cache recent responses to reduce redundant API calls
 * - Provide safe fallback responses on errors or malformed outputs
 *
 * Used by:
 * - Voice conversation hooks
 * - Response handling and navigation orchestration logic
 */

import { allProjects } from '../data/projectsData';
import { allExperiences } from '../data/experiencesData';
import { allBlogs } from '../data/blogsData';
import { personalData } from '../data/personalData';
import { generateSystemPrompt } from '../prompt/promptTemplate';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const API_MODEL = import.meta.env.VITE_API_MODEL;

export const agentService = {
  cache: new Map(),

  // Get current provider info
  getProviderInfo() {
    return {
      model: API_MODEL,
      url: API_URL,
    };
  },

  // Normalize targetKey to match DOM IDs
  normalizeTargetKey(targetKey, category) {
    if (!targetKey) return null;
    
    // If already in correct format (e.g., "project-1"), return as-is
    if (targetKey.match(/^(project|blog|experience)-\d+$/)) {
      return targetKey;
    }
    
    // Extract number if it's just "1", "2", etc.
    const num = targetKey.match(/\d+/)?.[0];
    if (num && category) {
      const prefix = category === 'project' ? 'project' : 
                     category === 'blog' ? 'blog' : 'experience';
      return `${prefix}-${num}`;
    }
    
    return targetKey;
  },

  // Ask agent with caching
  async ask(userInput, conversationHistory = []) {
    const cacheKey = this.getCacheKey(userInput, conversationHistory);
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    // Use your existing prompt template
    const systemPrompt = generateSystemPrompt(
      personalData,
      allProjects,
      allExperiences,
      allBlogs
    );

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-4), // Last 4 messages only
      { role: 'user', content: userInput },
    ];

    try {
      const response = await this.callAPI(messages);
      const parsed = JSON.parse(response);
      
      // Validate structure
      if (!parsed.start || !parsed.end || !Array.isArray(parsed.steps)) {
        throw new Error('Invalid response structure');
      }

      // Normalize all targetKeys
      if (parsed.steps) {
        parsed.steps = parsed.steps.map(step => ({
          ...step,
          targetKey: this.normalizeTargetKey(step.targetKey, step.category)
        }));
      }

      this.cache.set(cacheKey, parsed);
      return parsed;
    } catch (error) {
      console.error('Agent error:', error);
      return {
        start: 'Sorry, having technical issues.',
        steps: [],
        end: 'Please try again.',
      };
    }
  },

  // Call AI API (works with both providers)
  async callAPI(messages, retryCount = 0) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: API_MODEL,
        messages,
        temperature: 0.6,
        max_tokens: 800,
        top_p: 0.8,
      }),
    });

    if (!response.ok) {
      if (retryCount < 2 && [429, 502, 503, 504].includes(response.status)) {
        await new Promise(r => setTimeout(r, 500 * (retryCount + 1)));
        return this.callAPI(messages, retryCount + 1);
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  },

  // Cache key
  getCacheKey(input, history) {
    const normalized = input.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const lastMsg = history.slice(-1);
    return `${normalized}_${JSON.stringify(lastMsg)}`;
  },
};
