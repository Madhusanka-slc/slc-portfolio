import React from "react";
import { allProjects } from "../../../data/projectsData";

const WakeWordDetectionInfo = ({ setSelectedTech, setCurrentPage }) => {
  const wakeWordProject = allProjects.find((project) => project.id === 1);
  const projectSkills = wakeWordProject?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This project develops a real-time wake word detection system on the
          ESP32-S3 microcontroller using the INMP441 digital I²S microphone. The
          system listens continuously for a trigger word, enabling hands-free
          control for IoT and embedded applications.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Technical Implementation
        </h4>
        <p>
          The solution leverages TinyML for wake word recognition, running a
          lightweight neural network model on the ESP32-S3. Audio is captured
          via the INMP441 microphone, preprocessed with feature extraction
          (MFCC), and fed to the model for inference. Integration with the
          ESP32-S3 allows real-time response to trigger words.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Real-time wake word detection on ESP32-S3</li>
          <li>Uses INMP441 digital I²S microphone for audio input</li>
          <li>Lightweight TinyML model for low-power inference</li>
          <li>Continuous listening for hands-free control</li>
          <li>Integration with IoT devices and embedded systems</li>
          <li>Customizable trigger words</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Enables hands-free interaction with devices, improving user experience
          in IoT and embedded systems. Reduces the need for manual input and
          allows voice-controlled automation in constrained hardware
          environments.
        </p>
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

export default WakeWordDetectionInfo;
