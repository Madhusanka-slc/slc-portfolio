import React from "react";
import ProjectCard from "./ProjectCard"; // Adjust the path as needed
import NavLink from './NavLink';
import dockerImage from '../assets/images/docker.jpg';
const ProjectsPage = ({ setCurrentPage, setSelectedProject }) => {
  // Sample project data
  const projects = [
    {
      id: 1,
      title: "SHARING NOTES with GITHUB ACTIONS",
      subtitle: "Obsidian Publish using GitHub Action",
      description: "A GitHub Action to publish Obsidian notes as a website.",
      imageUrl: dockerImage,
    },
    {
      id: 2,
      title: "SYNC KINDLE HIGHLIGHTS TO NOTION",
      subtitle: "Kindle to Notion",
      description: "A way to seamlessly transfer your Kindle highlights to Notion.",
      imageUrl: dockerImage,
    },
    {
      id: 3,
      title: "A dog sitting on a rock in front of a lake",
      subtitle: "Away to your Koenights to ston D",
      description: "A beautiful project showcasing nature photography.",
      imageUrl: dockerImage,
    },
  ];

  const handleProjectClick = (project) => {
    console.log("Clicked project:", project.id);
    setSelectedProject(project); // store the full project object or just project.id depending on usage
    setCurrentPage('projectDetails');
  };

  return (
  <section className="w-full flex flex-col items-center px-4">
    <div className="w-full max-w-3xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-center md:text-left">
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
