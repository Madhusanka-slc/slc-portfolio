import React, { useEffect } from "react";
import WakeWordDetectionInfo from "./info/project/WakeWordDetectionInfo";
import DefectDetectionInfo from "./info/project/DefectDetectionInfo";
import MechatronicToyInfo from "./info/project/MechatronicToyInfo";
import PoseEstimationInfo from "./info/project/PoseEstimationInfo";
import FaceLandmarkDetectionInfo from "./info/project/FaceLandmarkDetectionInfo";
const ProjectDetailsPage = ({ project, setCurrentPage, setSelectedTech }) => {
  // Sample project data
  useEffect(() => {
    console.log("Rendering project:", project);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project]);
  return (
    <section className="max-w-3xl p-6  rounded-lg  text-gray-100">
      <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
      {project.subtitle && (
        <h3 className="text-xl mb-2 text-gray-300">{project.subtitle}</h3>
      )}
      <p className="mb-6">{project.description}</p>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full rounded mb-6 object-cover max-h-96"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Not+Found";
          }}
        />
      )}

      <button
        onClick={() => setCurrentPage("projects")}
        className="px-4 py-2 bg-blue-950 rounded hover:bg-blue-700 cursor-pointer"
      >
        Back to Projects
      </button>

      <div className="mt-8 text-left max-w-2xl mx-auto">
        {/* Optional header */}
        <h3 className="text-xl font-semibold mb-2 text-gray-300">
          More About This Project
        </h3>

        {/* Conditionally render project detail components based on project ID */}
        {project.id === 1 && (
          <WakeWordDetectionInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 2 && (
          <FaceLandmarkDetectionInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 3 && (
          <MechatronicToyInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 4 && (
          <PoseEstimationInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 5 && (
          <DefectDetectionInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {/* fallback or general content */}
      </div>
    </section>
  );
};

export default ProjectDetailsPage;
