import React, { useState, useRef } from "react";
import "./App.css";

// Import components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProjectsPage from "./components/ProjectsPage";
import BlogPage from "./components/BlogPage";
import ExperiencePage from "./components/ExperiencePage";
import Footer from "./components/Footer";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import ExperienceDetailsPage from "./components/ExperienceDetailsPage";
import BlogDetailsPage from "./components/BlogDetailsPage";
import TechnologyPage from "./components/TechnologyPage";
import AllTagsPage from "./components/AllTagsPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);

  // Refs for scrolling
  const projectRefs = useRef({});
  const blogRefs = useRef({});
  const experienceRefs = useRef({});

  const renderPage = () => {
    switch (currentPage) {
      case "projects":
        return (
          <ProjectsPage
            setCurrentPage={setCurrentPage}
            setSelectedProject={setSelectedProject}
            ref={projectRefs} // pass refs
          />
        );
      case "projectDetails":
        return (
          <ProjectDetailsPage
            project={selectedProject}
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        );
      case "blog":
        return (
          <BlogPage
            setCurrentPage={setCurrentPage}
            setSelectedPost={setSelectedPost}
            ref={blogRefs} // pass refs
          />
        );
      case "blogDetails":
        return (
          <BlogDetailsPage
            post={selectedPost}
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        );
      case "experience":
        return (
          <ExperiencePage
            setCurrentPage={setCurrentPage}
            setSelectedExperience={setSelectedExperience}
            ref={experienceRefs} // pass refs
          />
        );
      case "experienceDetails":
        return (
          <ExperienceDetailsPage
            experience={selectedExperience}
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        );
      case "techDetails":
        return (
          <TechnologyPage
            tech={selectedTech}
            setCurrentPage={setCurrentPage}
            setSelectedProject={setSelectedProject}
            setSelectedPost={setSelectedPost}
            setSelectedExperience={setSelectedExperience}
          />
        );
      case "allTags":
        return (
          <AllTagsPage
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        );
      case "home":
      default:
        return <HeroSection currentPage={currentPage} />;
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen text-gray-200 font-inter antialiased"
      style={{ backgroundColor: "#1d1e20" }}
    >
      {/* Header with navigation + voice */}
      <header className="sticky top-0 z-50 bg-[#1d1e20]">
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          projectRefs={projectRefs}
          blogRefs={blogRefs}
          experienceRefs={experienceRefs}
        />
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
