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
            <strong>Data Generation:</strong> Download activate and negative 
            audio samples using ElevenLabs TTS API
          </li>
          <li>
            <strong>Dataset Creation:</strong> Mix samples with background 
            noise and generate training/validation datasets
          </li>
          <li>
            <strong>Model Training:</strong> Train Conv1D + GRU model on 
            audio spectrograms
          </li>
          <li>
            <strong>Model Testing:</strong> Evaluate performance and test 
            wake word detection
          </li>
          <li>
            <strong>Hardware Deployment:</strong> Deploy optimized model 
            to ESP32-S3 with INMP441 microphone
          </li>
        </ul>
      </div>

      {/* Model Architecture Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Model Architecture
        </h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Conv1D layer - Feature extraction from audio</li>
          <li>Two GRU layers - Sequential pattern recognition</li>
          <li>TimeDistributed Dense - Frame-by-frame predictions</li>
          <li>Dropout & BatchNormalization - Model stability</li>
        </ul>
      </div>

      {/* Key Features Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Custom wake word training with synthetic data</li>
          <li>Real-time detection on ESP32-S3 microcontroller</li>
          <li>Low-power continuous listening mode</li>
          <li>INMP441 I²S digital microphone integration</li>
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
          {/* <li>
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
          </li> */}
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