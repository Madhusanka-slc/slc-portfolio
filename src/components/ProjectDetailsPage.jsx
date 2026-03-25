import React, { useEffect } from "react";
import WakeWordDetectionInfo from "./info/project/WakeWordDetectionInfo";
import SpamClassifierInfo from "./info/project/SpamClassifierInfo";
import BookRecommenderInfo from "./info/project/BookRecommenderInfo";
import AITravelAgentInfo from "./info/project/AITravelAgentInfo";
import DockerAIAgentInfo from "./info/project/DockerAIAgentInfo";
import OCRTextExtractorInfo from "./info/project/OCRTextExtractorInfo";
import LangChainRAGInfo from "./info/project/LangChainRAGInfo";
import AIChatbotInfo from "./info/project/AIChatbotInfo";
import PhotoGeneratorInfo from "./info/project/PhotoGeneratorInfo";

const ProjectDetailsPage = ({ project, setCurrentPage, setSelectedTech }) => {
  useEffect(() => {
    console.log("Rendering project:", project);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project]);

  return (
    <section className="max-w-3xl p-6 rounded-lg text-gray-100">
      <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
      {project.subtitle && (
        <h3 className="text-xl mb-2 text-gray-300">{project.subtitle}</h3>
      )}
      <p className="mb-6 text-gray-400">{project.description}</p>

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
        className="px-4 py-2 bg-blue-950 rounded hover:bg-blue-700 cursor-pointer mb-8"
      >
        Back to Projects
      </button>

      <div className="mt-8 text-left max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-gray-300">
          More About This Project
        </h3>

        {/* Conditionally render project detail components based on project ID */}
        {project.id === 1 && (
          <PhotoGeneratorInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 2 && (
          <SpamClassifierInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 3 && (
          <BookRecommenderInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 4 && (
          <AITravelAgentInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 5 && (
          <DockerAIAgentInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 6 && (
          <OCRTextExtractorInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 7 && (
          <LangChainRAGInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {project.id === 8 && (
          <AIChatbotInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}

        {project.id === 9 && (
          <WakeWordDetectionInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}

      </div>
    </section>
  );
};

export default ProjectDetailsPage;