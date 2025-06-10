import React from "react";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg overflow-hidden border border-gray-700 hover:border-gray-400 hover:shadow-2xl bg-[#2e2e33] transition-all duration-300 group sm:p-6 p-4"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full max-h-xl rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Error";
          }}
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg sm:text-xl font-bold text-gray-100 group-hover:text-gray-400 transition-colors mb-1">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-sm text-gray-400 italic mb-2">{project.subtitle}</p>
        )}
        {project.description && (
          <p className="text-sm text-gray-300 leading-relaxed">
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
