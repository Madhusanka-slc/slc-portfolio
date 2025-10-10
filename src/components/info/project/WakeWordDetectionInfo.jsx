import React from "react";
import { allProjects } from "../../../data/projectsData";

const WakeWordDetectionInfo = ({ setSelectedTech, setCurrentPage }) => {
  const wakeWordProject = allProjects.find((project) => project.id === 1);
  const projectSkills = wakeWordProject?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      {/* Overview Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          A complete wake word detection system built using TensorFlow, capable
          of training custom models and running real-time detection on an
          ESP32-S3 microcontroller. The model listens continuously using an
          INMP441 I²S microphone and activates upon hearing a specific trigger
          word — all processed locally without cloud dependency.
        </p>
      </div>

      {/* Resources Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a
              href="https://github.com/Madhusanka-slc/wake-word-detection"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo - Wake Word Detection
            </a>
          </li>
        </ul>
      </div>

      {/* Technology Stack */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold mt-6">
          Technology Stack
        </h4>
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
    </div>
  );
};

export default WakeWordDetectionInfo;
