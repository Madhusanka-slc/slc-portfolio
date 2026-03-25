import React from "react";
import { allProjects } from "../../../data/projectsData";

const PhotoGeneratorInfo = ({ setSelectedTech, setCurrentPage }) => {
  const project = allProjects.find((p) => p.id === 1);
  const projectSkills = project?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          An AI-powered backend API that generates custom photos using text prompts and fine-tuned Flux models 
          on Replicate. Built with FastAPI, it includes image preprocessing, rate limiting, async generation, 
          and streaming responses.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          The image generation pipeline includes data preprocessing with zip creation, image validation, and 
          optimization before fine-tuning Flux models on Replicate. FastAPI serves as a proxy service with 
          Upstash Redis for rate limiting. Async operations handle long-running Replicate jobs, with streaming 
          responses serving generated images. Pydantic models provide schema-first API responses.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Image generation from text prompts with fine-tuned Flux models</li>
          <li>Dataset preparation with validation and optimization</li>
          <li>API key-based rate limiting with Upstash Redis</li>
          <li>Async background triggers for Replicate generation</li>
          <li>Streaming responses for generated images</li>
          <li>Prediction management endpoints</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Provides a scalable backend for AI image generation services that can be integrated into applications 
          requiring custom photo generation. The rate limiting and async architecture ensure production-ready 
          performance.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/photo_generator" target="_blank" rel="noopener noreferrer">
              GitHub Repo - AI Photo Generator (RepliFace)
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

export default PhotoGeneratorInfo;