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
      title: 'Automated Defect Detection in Manufacturing',
      subtitle: 'Computer Vision in Manufacturing Environments',
      description: 'Learn how to train and deploy object detection models (e.g., YOLOv8) to automate quality control in mechanical workflows.',
      imageUrl: dockerImage,
    },
    {
      id: 2,
      title: 'Mechatronic Toy Design with 3D Vision Feedback',
      subtitle: 'Mechanical Design and CV Feedback Loop',
      description: 'Built a crank-driven automata toy integrating 3D-printed parts, Arduino, and OpenCV for performance tracking.',
      imageUrl: dockerImage,
    },
    {
      id: 3,
      title: 'Smart Shopfloor Inspection Bot',
      subtitle: 'ROS and AI for Equipment Monitoring',
      description: 'Designed an autonomous robot using ROS and OpenCV to detect thermal and structural anomalies on the shop floor.',
      imageUrl: dockerImage,
    },
    {
      id: 4,
      title: 'Real-Time Pose Estimation for Human-Machine Interaction',
      subtitle: 'AI for Ergonomics and Safety',
      description: 'Developed a system using MediaPipe and TensorFlow to analyze posture and provide ergonomic risk scores in industry.',
      imageUrl: dockerImage,
    },
    {
      id: 5,
      title: 'AI-Powered Visual Quality Assurance System',
      subtitle: 'Deep Learning for Factory QA',
      description: 'Created an object detection system to ensure real-time conformity of mechanical parts on the production line.',
      imageUrl: dockerImage,
    },
    {
      id: 6,
      title: 'Thermal Image Analysis for Predictive Maintenance',
      subtitle: 'Infrared Imaging and Deep Learning',
      description: 'Trained CNNs on FLIR images to identify overheating machinery and prevent costly downtime.',
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
