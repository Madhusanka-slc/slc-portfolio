import React, { useEffect } from 'react';
import TechnologyCard from './TechnologyCard';
import { allProjects } from '../data/projectsData';
import { allExperiences } from '../data/experiencesData';
import { allBlogs } from '../data/blogsData';

const TechnologyPage = ({
  tech,
  setCurrentPage,
  setSelectedProject,
  setSelectedPost,
  setSelectedExperience,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [tech]);

  // Filter content by selected technology tag
  const filteredProjects = allProjects.filter((p) => p.skills?.includes(tech));
  const filteredBlogs = allBlogs.filter((b) => b.skills?.includes(tech));
  const filteredExperiences = allExperiences.filter((e) =>
    e.skills?.includes(tech)
  );

  return (
    <section className="w-full px-4 max-w-4xl mx-auto">
      {/* Header with Tags label and current technology */}
      <div className="flex items-center  mb-8 border-b border-gray-700 pb-2">
        
          <button
            className="px-4 py-2 bg-blue-950 rounded hover:bg-blue-700 mr-5 cursor-pointer"
            onClick={() => setCurrentPage('allTags')}
          >
            Tags
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 flex items-center flex-wrap gap-x-2">
          <span className="text-gray-100 text-lg sm:text-xl font-bold">  {tech}</span>
        </h2>
      </div>

      {/* Projects Section */}
      {filteredProjects.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl text-gray-200 mb-6">Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <TechnologyCard
                key={project.id}
                item={project}
                type="project"
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentPage('projectDetails');
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Blog Posts Section */}
      {filteredBlogs.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl text-gray-200 mb-6">Blog Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredBlogs.map((post) => (
              <TechnologyCard
                key={post.id}
                item={post}
                type="blog"
                onClick={() => {
                  setSelectedPost(post);
                  setCurrentPage('blogDetails');
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Experiences Section */}
      {filteredExperiences.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl text-gray-200 mb-6">Experiences</h3>
          <div className="flex flex-col space-y-6">
            {filteredExperiences.map((exp) => (
              <TechnologyCard
                key={exp.id}
                item={exp}
                type="experience"
                onClick={() => {
                  setSelectedExperience(exp);
                  setCurrentPage('experienceDetails');
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fallback message when no content is found */}
      {filteredProjects.length === 0 &&
        filteredBlogs.length === 0 &&
        filteredExperiences.length === 0 && (
          <p className="text-gray-400">No content found for this tag.</p>
        )}
    </section>
  );
};

export default TechnologyPage;
