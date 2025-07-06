import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard"; // Adjust the path as needed
import { allProjects } from "../data/projectsData"; // ✅ Import modularized data
const ProjectsPage = ({ setCurrentPage, setSelectedProject }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [setCurrentPage]);

  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left border-b-1 p-4 border-b-gray-700">
          Projects
        </h2>
        <div className="flex flex-col space-y-8 items-center w-full">
          {allProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {
                setSelectedProject(project); // Set the entire project object
                setCurrentPage("projectDetails"); // Navigate to details page
              }}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
