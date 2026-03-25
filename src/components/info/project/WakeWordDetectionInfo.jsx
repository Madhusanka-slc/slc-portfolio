import React from "react";
import { allProjects } from "../../../data/projectsData";

const WakeWordDetectionInfo = ({ setSelectedTech, setCurrentPage }) => {
  // Get the correct project (adjust ID based on your projectsData)
  const wakeWordProject = allProjects.find((project) => project.id === 10); // or whatever ID you assigned
  const projectSkills = wakeWordProject?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This wake word detection system powers the AI-powered STEM Toy, providing hands-free voice activation 
          for the crank-driven wooden automata. Built with TensorFlow and optimized for ESP32 microcontrollers, 
          it enables the toy to respond to custom voice commands like "Jerry" or other wake words, making the 
          interactive experience seamless and engaging.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          The system uses ElevenLabs TTS to generate synthetic training data for the custom wake word, mixed with 
          background noise to create realistic acoustic scenarios. A GRU-based deep learning model with Conv1D and 
          bidirectional GRU layers processes audio input from the ESP32's microphone. The model was trained on 
          thousands of samples and then optimized using TensorFlow Lite for Microcontrollers, compressing it to 
          fit within the ESP32's limited memory and computational resources. The final model runs entirely on-device, 
          enabling real-time wake word detection without cloud connectivity.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Custom wake word training for personalized voice activation</li>
          <li>Optimized for ESP32 microcontroller deployment</li>
          <li>Real-time audio processing with low latency</li>
          <li>Synthetic data generation using ElevenLabs TTS</li>
          <li>Background noise mixing for robust real-world performance</li>
          <li>TensorFlow Lite for Microcontrollers integration</li>
          <li>Hands-free control for the wooden STEM toy</li>
          <li>Privacy-focused on-device processing (no cloud dependency)</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Integration with STEM Toy</h4>
        <p>
          When the wake word is detected, the ESP32 triggers the crank-driven mechanisms of the wooden toy, 
          activating motors and movements. This creates an interactive experience where children can control 
          the toy simply by speaking. The system is designed to be energy-efficient, allowing battery-powered 
          operation for extended play sessions while maintaining high accuracy in detecting the wake word even 
          in noisy environments.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Transforms a traditional mechanical toy into an interactive AI-powered learning tool. Children learn 
          about voice recognition, embedded AI, and robotics through play. The hands-free control makes the toy 
          accessible to users with different abilities and demonstrates real-world applications of TinyML in 
          consumer products. The system can be easily adapted to support different wake words, making it versatile 
          for various educational scenarios.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/wake-word-detection" target="_blank" rel="noopener noreferrer">
              GitHub Repo - Wake Word Detection System
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

export default WakeWordDetectionInfo;