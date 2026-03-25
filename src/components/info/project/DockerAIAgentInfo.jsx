import React from "react";
import { allProjects } from "../../../data/projectsData";
const DockerAIAgentInfo = ({ setSelectedTech, setCurrentPage }) => {
  const project = allProjects.find((p) => p.id === 5);
  const projectSkills = project?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          A comprehensive Docker-based AI agent system that combines containerization with LangChain, LangGraph, 
          and FastAPI. Demonstrates how to build, deploy, and orchestrate AI agents using Docker, with integrations 
          for Postgres, email automation, and multi-agent systems.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          Custom Dockerfiles and Docker Compose orchestrate FastAPI backend, Postgres database, and AI agents. 
          LangChain provides tool-calling capabilities, while LangGraph orchestrates multi-agent workflows with a 
          supervisor pattern. Email integration uses Python's standard library with Gmail. Deployment targets 
          include Railway and DigitalOcean App Platform.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Docker fundamentals with custom Dockerfiles and Compose</li>
          <li>Multi-agent system with LangGraph Supervisor</li>
          <li>Email automation for sending and reading Gmail</li>
          <li>Postgres integration with Docker volumes</li>
          <li>Docker Model Runner for open-source models</li>
          <li>Deployment to Railway and DigitalOcean</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Provides a production-ready template for building containerized AI agents that can be deployed 
          across multiple cloud platforms. The multi-agent architecture enables complex task automation 
          with tool-calling capabilities.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/docker-ai-agent" target="_blank" rel="noopener noreferrer">
              GitHub Repo - Docker AI Agent
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

export default DockerAIAgentInfo;