import React from "react";
import { allProjects } from "../../../data/projectsData";
const AITravelAgentInfo = ({ setSelectedTech, setCurrentPage }) => {
  const project = allProjects.find((p) => p.id === 4);
  const projectSkills = project?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          An AI-powered travel recommendation system that predicts flight prices and suggests travel destinations 
          using machine learning, vector search, and OpenAI integration. The platform combines MindsDB for forecasting, 
          MariaDB for data storage, and a modern Next.js frontend.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          Flight price predictions use MindsDB machine learning models trained on historical data. OpenAI integration 
          provides intelligent travel recommendations. The backend is built with FastAPI using SQLAlchemy and Pydantic, 
          while the frontend uses Next.js with TailwindCSS and Flowbite. Docker containers run MariaDB, and Gretel 
          generates synthetic data for model training.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Flight price prediction using MindsDB forecasting models</li>
          <li>AI-powered travel recommendations with OpenAI</li>
          <li>Interactive Next.js dashboard with dropdown selectors</li>
          <li>FastAPI backend with SQLAlchemy and Pydantic schemas</li>
          <li>Docker deployment on AWS EC2 with MariaDB integration</li>
          <li>Synthetic data generation with Gretel</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Helps travelers make informed decisions about flight bookings and destinations. The combination of 
          price prediction and AI recommendations provides a comprehensive travel planning assistant that can 
          save time and money.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/ai-travel-agent" target="_blank" rel="noopener noreferrer">
              GitHub Repo - AI Travel Agent
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

export default AITravelAgentInfo;