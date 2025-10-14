import React from "react";
import { ArrowDown } from "lucide-react";
import { allProjects } from "../../../data/projectsData";
import poseImage from "../../../assets/images/process.png";
import polImage from "../../../assets/images/unet_pooling.png";
import convImage from "../../../assets/images/unet_convolution.png";
import decoImage from "../../../assets/images/unet_convolution.png";
const WakeWordDetectionInfo = ({ setSelectedTech, setCurrentPage }) => {
  const wakeWordProject = allProjects.find((project) => project.id === 1);
  const projectSkills = wakeWordProject?.skills || [];

  const pipelineStages = [
    {
      title: "Audio Data Sources",
      image: poseImage, // Add your image path here
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
  ];

  return (
    <div className="text-gray-400 space-y-6">
      {/* Overview Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          A complete wake word detection system built using TensorFlow, capable
          of training custom models and running real-time detection on an
          ESP32-S3 microcontroller. I developed a full end-to-end pipeline that
          downloads positive and negative samples from ElevenLabs relevant to
          the custom wake word, uses a user-provided 10-second background audio
          clip, preprocesses all data, and automatically generates structured
          training and development datasets. The model is then trained,
          optimized, and deployed to the ESP32-S3, where it continuously listens
          via the INMP441 I²S microphone and activates upon hearing the trigger
          word — all processed locally without any cloud dependency.
        </p>
      </div>

      {/* Architecture / Pipeline Diagram */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold mb-4">
          Pipeline Architecture
        </h4>
        <div className="space-y-3 max-w-4xl mx-auto">
          {pipelineStages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`border-2 ${stage.borderColor} ${stage.bgColor} rounded-xl p-3 sm:p-4 transition-all duration-300 hover:border-gray-400 hover:shadow-2xl group`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {idx < pipelineStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown
                    className="text-gray-500"
                    size={32}
                    strokeWidth={2.5}
                  />
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
