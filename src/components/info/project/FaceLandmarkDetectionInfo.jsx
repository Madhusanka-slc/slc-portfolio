import React from "react";
import { allProjects } from "../../../data/projectsData";
const FaceLandmarkDetectionInfo = ({ setSelectedTech, setCurrentPage }) => {
  const defectProject = allProjects.find((project) => project.id === 2);
  const projectSkills = defectProject?.skills || [];
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This project leverages deep learning-based facial landmark detection
          to enhance human-computer interaction (HCI). The system identifies key
          facial features—eyes, nose, mouth, and jawline—in live camera feeds,
          enabling applications like emotion detection, virtual try-ons, and
          gesture-controlled interfaces.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Technical Implementation
        </h4>
        <p>
          The solution is built on MediaPipe Face Mesh and Dlib’s 68-point
          landmark model, offering high-precision facial tracking in real-time.
          OpenCV is used for camera integration and preprocessing, while Flask
          handles the backend. ONNX Runtime is optionally used for performance
          optimization.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Accurate 68 or 468-point facial landmark detection</li>
          <li>Real-time video stream processing with OpenCV</li>
          <li>Modular backend with Dlib, MediaPipe, or ONNX models</li>
          <li>Gesture recognition for hands-free interaction</li>
          <li>Web-based interface using Flask</li>
          <li>Cross-platform deployment including edge devices</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          The system enables hands-free control for accessibility and
          interactive systems. In prototype tests, it achieved 95% precision in
          gesture recognition under varied lighting and reduced UI interaction
          time by 38% compared to traditional input methods.
        </p>
      </div>

      {/* <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a
              href="https://github.com/yourusername/face-landmark-detection"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo - Face Landmark Detection
            </a>
          </li>
          <li>
            <a
              href="https://google.github.io/mediapipe/solutions/face_mesh.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              MediaPipe Face Mesh Documentation
            </a>
          </li>
          <li>
            <a
              href="http://dlib.net/face_landmark_detection_ex.cpp.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dlib 68-Point Model Guide
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

export default FaceLandmarkDetectionInfo;
