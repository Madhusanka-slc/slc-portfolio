import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard"; // Adjust the path as needed
import dockerImage from '../assets/images/docker.jpg';
const ProjectsPage = ({ setCurrentPage, setSelectedProject }) => {
      useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, [setCurrentPage]);
  const projects = [
    {
      id: 1,
      title: "AUTOMATED DEFECT DETECTION IN MANUFACTURING",
      subtitle: "Computer Vision + Mechanical Engineering",
      description: "A real-time AI system using computer vision to detect surface defects on mechanical components in a manufacturing line. Trained with YOLOv8 and deployed with a web dashboard.",
      imageUrl: dockerImage,
    },
    {
      id: 2,
      title: "MECHATRONIC TOY DESIGN WITH 3D VISION FEEDBACK",
      subtitle: "Mechanical Design + CV Feedback Loop",
      description: "Built a crank-driven automata toy that uses computer vision to track performance. Integrated 3D-printed components with Arduino and OpenCV.",
      imageUrl: dockerImage,
    },
    {
      id: 3,
      title: "SMART SHOPFLOOR INSPECTION BOT",
      subtitle: "ROS + AI + Mechanical Systems",
      description: "Designed and programmed an autonomous inspection robot using ROS and OpenCV to navigate and analyze shop floor equipment for thermal and structural anomalies.",
      imageUrl: dockerImage,
    },
    {
      id: 4,
      title: "REAL-TIME POSE ESTIMATION FOR HUMAN-MACHINE INTERACTION",
      subtitle: "AI for Ergonomics",
      description: "Developed a real-time system using MediaPipe and TensorFlow to analyze human posture in industrial settings and provide ergonomic risk scores.",
      imageUrl: dockerImage,
    },
    {
      id: 5,
      title: "AI-POWERED VISUAL QUALITY ASSURANCE SYSTEM",
      subtitle: "Factory Vision QA",
      description: "A deep learning-powered visual QA system for mechanical parts using object detection and classification to ensure part conformity in real time.",
      imageUrl: dockerImage,
    },
    {
      id: 6,
      title: "THERMAL IMAGE ANALYSIS FOR PREDICTIVE MAINTENANCE",
      subtitle: "IR Imaging + Deep Learning",
      description: "Trained a convolutional neural network to detect overheating machinery using FLIR thermal images to prevent downtime.",
      imageUrl: dockerImage,
    },
  ];

  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left border-b-1 p-4 border-b-gray-700">
          Projects
        </h2>
        <div className="flex flex-col space-y-8 items-center w-full">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {
                setSelectedProject(project);   // Set the entire project object
                setCurrentPage('projectDetails');  // Navigate to details page
              }}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
