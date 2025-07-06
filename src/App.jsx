import React, { useState, useEffect } from "react";
import "./App.css";

// Import components (make sure these are correctly created and exported)
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
  const renderPage = () => {
    console.log("Rendering page:", currentPage);
    console.log("Selected project:", selectedProject);
    console.log("Selected experience:", selectedExperience);
    console.log("Selected blog post:", selectedPost);
    switch (currentPage) {
      case "projects":
        // Pass setter function to allow setting project on click
        return (
          <ProjectsPage
            setCurrentPage={setCurrentPage}
            setSelectedProject={setSelectedProject}
          />
        );
      case "projectDetails":
        // Pass selected project object to details page
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
          />
        );
      case "blogDetails":
        // Pass selected project object to details page
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
          />
        );
      case "experienceDetails":
        // Pass selected project object to details page
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
      className="flex flex-col min-h-screen  text-gray-200 font-inter antialiased"
      style={{ backgroundColor: "#1d1e20" }}
    >
      {/* Header with navigation */}
      <header className="sticky top-0 z-50 bg-[#1d1e20]">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default App;
