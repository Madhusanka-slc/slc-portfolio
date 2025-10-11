import React from "react";
import { ArrowDown } from "lucide-react";
import { allProjects } from "../../../data/projectsData";

const WakeWordDetectionInfo = ({ setSelectedTech, setCurrentPage }) => {
  const wakeWordProject = allProjects.find((project) => project.id === 1);
  const projectSkills = wakeWordProject?.skills || [];

  const pipelineStages = [
    {
      title: "Audio Data Sources",
      items: ["Activates (TTS)", "Negatives (Noise)", "Background Audio"]
    },
    {
      title: "Data Preprocessing",
      items: ["Normalize volume", "Mix with background", "Create 10s clips", "Label time windows"]
    },
    {
      title: "Model Architecture",
      items: ["Conv1D (features)", "GRU × 2 (temporal)", "Dense (prediction)", "Dropout + BatchNorm"]
    },
    {
      title: "ESP32-S3 Deployment",
      items: ["Convert to TFLite", "Deploy on board", "Use INMP441 mic", "Real-time detection"]
    }
  ];

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

      {/* Architecture / Pipeline Diagram */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold mb-6">
          Pipeline Architecture
        </h4>
        <div className="space-y-4 max-w-3xl mx-auto">
          {pipelineStages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div className="rounded-lg overflow-hidden border border-gray-700 hover:border-gray-400 hover:shadow-2xl bg-[#2e2e33] transition-all duration-300 group p-4 sm:p-6">
                {/* Title */}
                <h5 className="text-lg sm:text-xl font-bold text-gray-100 group-hover:text-gray-400 transition-colors text-center mb-4">
                  {stage.title}
                </h5>
                
                {/* Items */}
                <div className="space-y-2">
                  {stage.items.map((item, i) => (
                    <div 
                      key={i} 
                      className="text-center py-2 px-3 rounded bg-gray-800/50 border border-gray-700"
                    >
                      <p className="text-sm sm:text-base text-gray-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {idx < pipelineStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="text-gray-500" size={32} strokeWidth={2.5} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
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
              className="hover:underline"
            >
              GitHub - Wake Word Detection
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