import React from "react";
import { allProjects } from "../../../data/projectsData";

const STEMToyInfo = ({ setSelectedTech, setCurrentPage }) => {
  // Get the correct project (id 9)
  const stemProject = allProjects.find((project) => project.id === 9);
  const projectSkills = stemProject?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          Built a crank-driven automata toy integrating 3D-printed parts, ESP32, and a TinyML wake word 
          detection system for interactive, hands-free operation. This project combines mechanical design, 
          embedded systems, and edge AI to create an engaging educational experience.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          The system uses an ESP32 microcontroller to control motors and actuators based on voice commands 
          detected by a TinyML wake word model. Mechanical components were designed in CAD software and 
          3D-printed for precise movement. The wake word detection model was trained using TensorFlow Lite 
          for Microcontrollers and optimized for the ESP32's limited resources. Sensors provide motion 
          feedback for tracking performance and enabling interactive responses.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Crank-driven automata with interactive mechanical movement</li>
          <li>ESP32 microcontroller for real-time motor control</li>
          <li>Hands-free voice activation via wake word detection</li>
          <li>Custom 3D-printed mechanical parts for precise fit</li>
          <li>TinyML model optimized for resource-constrained devices</li>
          <li>Modular design for easy modification and experimentation</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Provides an engaging STEM learning tool that demonstrates the integration of mechanics, electronics, 
          and embedded AI. The hands-free voice control makes the toy accessible to users with different abilities 
          and showcases real-world applications of TinyML in consumer products. Serves as an educational platform 
          for learning about 3D printing, microcontroller programming, and edge AI deployment.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/ai-travel-agent" target="_blank" rel="noopener noreferrer">
              GitHub Repo - STEM Toy Project
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

export default STEMToyInfo;