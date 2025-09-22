// src/agent/portfolioAgent.js
import { allProjects } from "../data/projectsData.js";
import { allExperiences } from "../data/experiencesData.js";
import { allBlogs } from "../data/blogsData.js";

const API_KEY = import.meta.env.VITE_CEREBRAS_API_KEY;
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

console.log("Using Cerebras API Key:", API_KEY ? "Yes" : "No");
console.log("Using Cerebras API Key:", API_KEY ? "Yes" : "No");

// Helper: format portfolio data for the system prompt
function formatPortfolioList(projects, experiences, blogs) {
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

  return `Projects:\n${projStr}\n\nExperiences:\n${expStr}\n\nBlogs:\n${blogStr}`;
}

// Main function to query the agent
export async function askPortfolioAgent(userInput, messages = []) {
  messages.push({ role: "user", content: userInput });

  const systemPrompt = `
You are my portfolio assistant. Imagine you are speaking directly to a recruiter, HR manager, or CEO who is asking me about my skills, experience, or projects. 

Portfolio Knowledge:
${formatPortfolioList(allProjects, allExperiences, allBlogs)}

Your task:
- Respond ONLY in valid JSON.
- Structure must always be:
{
  "start": "Natural opening sentence that feels like I'm personally starting a conversation answer.",
  "steps": [
    {
      "category": "project" | "experience" | "blog",
      "title": "Exact title of the item",
      "introduction": "Short, natural sentence introducing why this is relevant, as if I’m telling it in an interview.",
      "description": "2–3 sentences that expand on what I did, the skills I used, and the impact — phrased conversationally, not robotic."
    }
  ],
  "end": "A natural way to wrap up the answer, like I would say at the end of explaining my work."
}

Rules:
1. Sound conversational, confident, and human — like I’m really speaking to someone, not generating text.
   Example: Instead of "This concludes the overview…" → say "That’s a bit about how I applied those skills" or "That’s one of the projects I’m most proud of."
2. If no items match, return:
{
  "start": "I usually focus on sharing my portfolio, skills, projects, and experiences — would you like me to walk you through those?",
  "steps": []
}
3. Keep answers concise but flowing, as if answering in a real conversation.
4. No explanations or meta-text outside JSON.

User Query: "${userInput}"
`;

  const body = {
    model: "qwen-3-235b-a22b-instruct-2507",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    stream: false,
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 0.8,
  };

  const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `Cerebras API error: ${response.status} ${await response.text()}`
    );
  }

  const respJson = await response.json();
  const assistantResponse = respJson.choices[0].message.content;

  try {
    return JSON.parse(assistantResponse);
  } catch {
    return { raw: assistantResponse };
  }
}
