import React from "react";
import { allProjects } from "../../../data/projectsData";
const LangChainRAGInfo = ({ setSelectedTech, setCurrentPage }) => {
  const project = allProjects.find((p) => p.id === 7);
  const projectSkills = project?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          A Retrieval-Augmented Generation (RAG) API built with LangChain and FastAPI that enables intelligent 
          chat with private knowledge sources using vector embeddings and semantic search, featuring rate limiting 
          and secure API key authentication.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          LangChain orchestrates the RAG pipeline with OpenAI LLMs and embeddings. Upstash Vector stores document 
          embeddings for semantic search, while Upstash Redis handles API key-based rate limiting. FastAPI provides 
          REST endpoints with LangServe for remote Runnable clients. The system includes step-by-step Jupyter 
          notebooks for learning each component.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>RAG pipeline with private knowledge sources</li>
          <li>Vector embeddings with Upstash Vector database</li>
          <li>API key-based rate limiting with Upstash Redis</li>
          <li>LangServe Remote Runnable for API integration</li>
          <li>Interactive Jupyter notebooks for learning</li>
          <li>Production-ready FastAPI endpoints</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Enables organizations to build secure, rate-limited chatbots that can query their private documents 
          without exposing data to external services. The architecture serves as a template for enterprise RAG 
          applications.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/langchain-rag-api" target="_blank" rel="noopener noreferrer">
              GitHub Repo - LangChain RAG API
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

export default LangChainRAGInfo;