import React from "react";
import { allProjects } from "../../../data/projectsData";

const DefectDetectionInfo = ({ setSelectedTech, setCurrentPage }) => {
  const defectProject = allProjects.find((project) => project.id === 4);
  const projectSkills = defectProject?.skills || [];
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This project focuses on using computer vision and deep learning to
          automate the inspection of mechanical components in a manufacturing
          environment. It eliminates the need for manual quality control by
          detecting surface defects such as cracks, rust, and deformation in
          real-time.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Technical Implementation
        </h4>
        <p>
          The core of the system is a YOLOv8 object detection model trained on a
          custom dataset of annotated defects in metallic parts. Image data was
          captured using industrial-grade cameras and labeled using Roboflow.
          The inference engine was deployed on an edge device (Raspberry Pi 4
          with Coral TPU) using Flask and OpenCV.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Real-time defect detection using YOLOv8</li>
          <li>Edge deployment on Raspberry Pi for low-latency processing</li>
          <li>Automatic logging of defective parts with timestamp and image</li>
          <li>Web-based dashboard for live monitoring and alerting</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          The system significantly reduced human error in quality control and
          helped identify 23% more defects than manual inspections over a 30-day
          trial. It's particularly useful for small- to mid-scale mechanical
          workshops aiming to adopt Industry 4.0 practices.
        </p>
      </div>

      {/* <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a
              href="https://example.com/notes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Defect Detection Notes
            </a>
          </li>
          <li>
            <a
              href="https://github.com/yourusername/defect-detector"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo - YOLOv8 Detection
            </a>
          </li>
          <li>
            <a
              href="https://example.com/image-labeling"
              target="_blank"
              rel="noopener noreferrer"
            >
              Image Annotation with Roboflow
            </a>
          </li>
          <li>
            <a
              href="https://flask.palletsprojects.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flask Deployment Guide
            </a>
          </li>
        </ul>
      </div> */}

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

export default DefectDetectionInfo;
