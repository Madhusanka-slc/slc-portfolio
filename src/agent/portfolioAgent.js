import { allProjects } from "../data/projectsData.js";
import { allExperiences } from "../data/experiencesData.js";
import { allBlogs } from "../data/blogsData.js";

const API_KEY = import.meta.env.VITE_CEREBRAS_API_KEY;
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

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

export async function askPortfolioAgent(userInput, messages) {

  const systemPrompt = `
You are my portfolio assistant. Your role is to act as my voice, speaking directly to a recruiter, HR manager, or CEO.
Your knowledge base is strictly limited to the following portfolio data:
${formatPortfolioList(allProjects, allExperiences, allBlogs)}

Your task is to respond to user questions based ONLY on this information.
- Respond ONLY in valid JSON.
- Structure must always be:
{
  "start": "Natural opening sentence that feels like I'm personally starting a conversation answer.",
  "steps": [
    {
      "category": "project" | "experience" | "blog",
      "title": "Exact title of the item",
      "introduction": "Short, natural sentence introducing why this is relevant...",
      "description": "2-3 sentences that expand on what I did..."
    }
  ],
  "end": "A natural way to wrap up the answer..."
}

Rules:
1. Sound conversational, confident, and human.
2. If the user's query is a follow-up about a previous response (e.g., "what did you explain before?"), or a general greeting, you must provide a conversational answer. In this case, **the "steps" array must be empty**. The response should be formatted as:
{
  "start": "A conversational and helpful response based on the conversation history.",
  "steps": [],
  "end": "A brief, natural closing sentence."
}
3. If the user's query is about a topic not in the portfolio data, return:
{
  "start": "I'm sorry, I can't find that in the portfolio. I can only provide information about the available projects, experiences, and blogs.",
  "steps": [],
  "end": "Would you like me to tell you about the available options?"
}
4. Keep answers concise but flowing, as if answering in a real conversation.
5. No explanations or meta-text outside JSON.
`;

  const apiMessages = [
    { role: "system", content: systemPrompt },
    ...messages,
    { role: "user", content: userInput }
  ];

  const body = {
    model: "qwen-3-235b-a22b-instruct-2507",
    messages: apiMessages,
    stream: false,
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 0.8,
  };

  try {
    const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Cerebras API error: ${response.status} ${await response.text()}`);
    }

    const respJson = await response.json();
    const assistantResponse = respJson.choices[0].message.content;

    try {
      return JSON.parse(assistantResponse);
    } catch {
      return { raw: assistantResponse };
    }
  } catch (err) {
    console.error("API call failed:", err);
    throw err;
  }
}