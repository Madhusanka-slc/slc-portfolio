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
          An end-to-end wake word detection system that trains a custom deep 
          learning model and deploys it on ESP32-S3 microcontroller for 
          real-time voice activation using an INMP441 I²S microphone.
        </p>
      </div>

      {/* Pipeline Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Development Pipeline
        </h4>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Data Generation:</strong> Download audio samples via ElevenLabs TTS
          </li>
          <li>
            <strong>Dataset Creation:</strong> Mix with background noise
          </li>
          <li>
            <strong>Model Training:</strong> Train Conv1D + GRU model
          </li>
          <li>
            <strong>Model Testing:</strong> Evaluate detection performance
          </li>
          <li>
            <strong>Hardware Deployment:</strong> Deploy to ESP32-S3
          </li>
        </ul>
      </div>

      {/* Model Architecture Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Model Architecture
        </h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Conv1D layer for feature extraction</li>
          <li>Two GRU layers for pattern recognition</li>
          <li>TimeDistributed Dense for predictions</li>
          <li>Dropout & BatchNormalization layers</li>
        </ul>
      </div>

      {/* Key Features Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Custom wake word training</li>
          <li>Real-time detection on ESP32-S3</li>
          <li>Low-power continuous listening</li>
          <li>INMP441 I²S microphone</li>
          <li>&gt;95% detection accuracy</li>
          <li>Model size &lt;500KB</li>
        </ul>
      </div>

      {/* Impact Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Enables hands-free voice control in IoT devices without cloud 
          dependency. On-device processing ensures privacy, low latency, 
          and works offline. Suitable for smart home automation, wearables, 
          and embedded systems.
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
          <li>
            <a
              href="https://github.com/Madhusanka-slc/wake-word-detection/blob/main/notebooks/01_data_generation.ipynb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Generation Notebook
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Madhusanka-slc/wake-word-detection/blob/main/notebooks/02_model_training.ipynb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Model Training Notebook
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Madhusanka-slc/wake-word-detection/blob/main/notebooks/03_model_testing.ipynb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Model Testing & Inference Notebook
            </a>
          </li>
        </ul>
      </div>

      {/* YouTube Demo Section */}
      {/* Uncomment when video is ready */}
      {/* <div>
        <h4 className="text-lg text-gray-300 font-semibold mt-6">Demo Video</h4>
        <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Wake Word Detection Demo"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
        </div>
      </div> */}

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