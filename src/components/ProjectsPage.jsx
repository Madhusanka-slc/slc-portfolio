import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard"; // Adjust the path as needed
import poseImage from '../assets/images/pose-walk.png';
import toyImage from '../assets/images/robot.jpeg';
import landMarksImage from '../assets/images/landmarks.png';
import defectImage from '../assets/images/defect.png';
const ProjectsPage = ({ setCurrentPage, setSelectedProject }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [setCurrentPage]);
  const projects = [
    {
      id: 1,
      title: 'Real-Time Face Landmark Detection for HCI',
      subtitle: 'AI-Powered Facial Feature Mapping and Gesture Recognition',
      description: 'Implemented a real-time face landmark system using MediaPipe and Dlib for gesture-based control in accessibility and HCI applications.',
      imageUrl: landMarksImage,
    },

    {
      id: 2,
      title: 'Mechatronic Toy Design with 3D Vision Feedback',
      subtitle: 'Mechanical Design and CV Feedback Loop',
      description: 'Built a crank-driven automata toy integrating 3D-printed parts, Arduino, and OpenCV for performance tracking.',
      imageUrl: toyImage,
    },
    {
      id: 3,
      title: 'Real-Time Pose Estimation for Human-Machine Interaction',
      subtitle: 'AI for Ergonomics and Safety',
      description: 'Developed a system using MediaPipe and TensorFlow to analyze posture and provide ergonomic risk scores in industry.',
      imageUrl: poseImage,
    },
    {
      id: 4,
      title: 'Automated Defect Detection in Manufacturing',
      subtitle: 'Computer Vision in Manufacturing Environments',
      description: 'Learn how to train and deploy object detection models (e.g., YOLOv8) to automate quality control in mechanical workflows.',
      imageUrl: defectImage,
    }

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
