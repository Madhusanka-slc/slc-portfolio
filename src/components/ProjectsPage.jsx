import React, { useEffect, forwardRef } from "react";
import ProjectCard from "./ProjectCard";
import { allProjects } from "../data/projectsData";

// Use forwardRef to pass refs from parent
const ProjectsPage = forwardRef((props, ref) => {
  const { setCurrentPage, setSelectedProject } = props;

  useEffect(() => {
    console.log("Project refs set:", ref?.current);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [setCurrentPage]);

  // Ensure ref.current is always an object
  if (ref && !ref.current) {
    ref.current = {};
  }

  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left border-b-1 p-4 border-b-gray-700">
          Projects
        </h2>
        <div className="flex flex-col space-y-8 items-center w-full">
          {allProjects.map((project) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              ref={(el) => {
                if (ref && ref.current) {
                  ref.current[`project-${project.id}`] = el;
                }
              }}
              onClick={() => {
                setSelectedProject(project);
                setCurrentPage("projectDetails");
              }}
              style={{ cursor: "pointer" }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ProjectsPage;
