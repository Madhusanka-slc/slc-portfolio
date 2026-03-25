import React from "react";
import { allProjects } from "../../../data/projectsData";
const AIChatbotInfo = ({ setSelectedTech, setCurrentPage }) => {
  const project = allProjects.find((p) => p.id === 8);
  const projectSkills = project?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          A Python-based AI-powered multimodal messenger that integrates text, voice, and image inputs for 
          interactive conversations. Uses memory management, workflow orchestration, and multiple AI models 
          to provide intelligent, context-aware responses.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          LangGraph orchestrates complex workflows with specialized nodes for memory, routing, context injection, 
          and multimodal output. DuckDB provides short-term memory while Qdrant stores long-term embeddings. 
          TogetherAI/Groq handle text responses, Whisper handles speech-to-text, ElevenLabs provides text-to-speech, 
          and FLUX.1 generates images. Chainlit provides the chat interface.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Multimodal input (text, voice, images)</li>
          <li>Short-term and long-term memory management</li>
          <li>LangGraph workflow orchestration</li>
          <li>Text-to-speech with ElevenLabs</li>
          <li>Text-to-image with FLUX.1</li>
          <li>Speech-to-text with Whisper</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Demonstrates a sophisticated AI assistant that maintains conversation context across sessions and 
          can respond with text, audio, or images based on user input. The architecture is modular and 
          extensible for adding new capabilities.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/ai-multimodal-messenger" target="_blank" rel="noopener noreferrer">
              GitHub Repo - AI Multimodal Messenger (Nova)
            </a>
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {projectSkills.map((tech) => (
          <span
            key={tech}
            onClick={() => {
              setSelectedTech(tech);
              setCurrentPage("techDetails");
            }}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition cursor-pointer"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
export default AIChatbotInfo;