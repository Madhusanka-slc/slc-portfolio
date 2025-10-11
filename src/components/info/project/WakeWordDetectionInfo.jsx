import React from "react";
import { ArrowDown } from "lucide-react";
import { allProjects } from "../../../data/projectsData";

const WakeWordDetectionInfo = ({ setSelectedTech, setCurrentPage }) => {
  const wakeWordProject = allProjects.find((project) => project.id === 1);
  const projectSkills = wakeWordProject?.skills || [];

  const pipelineStages = [
    {
      title: "Audio Data Sources",
      items: ["Activates (TTS)", "Negatives (Noise)", "Background Audio"],
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      title: "Data Preprocessing",
      items: ["Normalize volume", "Mix with background", "Create 10s clips", "Label time windows"],
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      title: "Model Architecture",
      items: ["Conv1D (features)", "GRU × 2 (temporal)", "Dense (prediction)", "Dropout + BatchNorm"],
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400"
    },
    {
      title: "ESP32-S3 Deployment",
      items: ["Convert to TFLite", "Deploy on board", "Use INMP441 mic", "Real-time detection"],
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-400"
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
        <h4 className="text-lg text-gray-300 font-semibold mb-4">
          Pipeline Architecture
        </h4>
        <div className="space-y-3 max-w-3xl mx-auto">
          {pipelineStages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div className={`border-2 ${stage.borderColor} ${stage.bgColor} rounded-xl p-4 sm:p-6 transition-all hover:scale-[1.02] hover:shadow-lg`}>
                <h5 className={`${stage.iconColor} font-bold text-base sm:text-lg text-center mb-3 pb-2 border-b ${stage.borderColor}`}>
                  {stage.title}
                </h5>
                <ul className="space-y-2">
                  {stage.items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm sm:text-base">
                      <span className={`mr-2 mt-0.5 ${stage.iconColor} font-bold`}>•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {idx < pipelineStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="text-gray-500" size={28} strokeWidth={2.5} />
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