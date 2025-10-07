import React from "react";
import { allProjects } from "../../../data/projectsData";

const MechatronicToyInfo = ({ setSelectedTech, setCurrentPage }) => {
  // Get the correct project (id 3)
  const toyProject = allProjects.find((project) => project.id === 3);
  const projectSkills = toyProject?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This project combines a crank-driven mechatronic toy with an ESP32
          microcontroller and an integrated wake word detection system, allowing
          hands-free control of toy movements using voice commands.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Technical Implementation
        </h4>
        <ul className="list-disc list-inside">
          <li>Designing mechanical parts using CAD and 3D printing</li>
          <li>Programming ESP32 to control motors and actuators</li>
          <li>Integrating wake word detection (TinyML on ESP32) for voice commands</li>
          <li>Adding sensors for motion feedback and performance tracking</li>
          <li>Optional AI/ML models for gesture or pattern recognition</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Crank-driven automata with interactive movement</li>
          <li>ESP32 microcontroller for real-time control</li>
          <li>Hands-free voice control via wake word detection</li>
          <li>3D-printed custom mechanical parts</li>
          <li>Modular design for easy modification and experimentation</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Combines mechanics, electronics, and embedded AI to provide an
          interactive STEM learning experience. Hands-free control makes the toy
          more engaging and demonstrates the application of TinyML in
          real-world devices.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a
              href="https://www.arduino.cc/en/Guide/HomePage"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arduino/ESP32 Programming Guide
            </a>
          </li>
          <li>
            <a
              href="https://www.3dprinting.com/learn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              3D Printing Resources
            </a>
          </li>
          <li>
            <a
              href="https://www.tensorflow.org/lite/microcontrollers"
              target="_blank"
              rel="noopener noreferrer"
            >
              TinyML on Microcontrollers (Wake Word Detection)
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

export default MechatronicToyInfo;
