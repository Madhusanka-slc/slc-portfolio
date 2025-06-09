import React, { useEffect } from 'react';

const ProjectDetailsPage = ({ project, setCurrentPage }) => {
  // Debug log to check if project prop is received
  useEffect(() => {
    console.log('ProjectDetailsPage received project:', project);
  }, [project]);

  return (
    <section className="max-w-3xl p-6  rounded-lg  text-gray-100">
      <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
      {project.subtitle && <h3 className="text-xl mb-2 text-gray-300">{project.subtitle}</h3>}
      <p className="mb-6">{project.description}</p>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full rounded mb-6 object-cover max-h-96"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Not+Found';
          }}
        />
      )}

      <button
        onClick={() => setCurrentPage('projects')}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Back to Projects
      </button>

               <div className="mt-8 text-left max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Example Project Info</h3>
          <p className="text-gray-400 mb-4">
            Select a project to see its detailed description here. You’ll find an overview of the tools used,
            goals of the project, and links to key resources.
          </p>
          <p className="text-gray-500">
            If no project appears, please go back to the Projects page and select one.
          </p>
        </div>
    </section>
  );
};

export default ProjectDetailsPage;
