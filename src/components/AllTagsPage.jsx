import React, { useEffect } from 'react';
import { allProjects } from '../data/projectsData';
import { allExperiences } from '../data/experiencesData';
import { allBlogs } from '../data/blogsData';

const AllTagsPage = ({ setCurrentPage, setSelectedTech }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Gather all tags with their usage counts
  const tagCounts = {};

  const addTags = (items) => {
    items.forEach((item) => {
      (item.skills || []).forEach((skill) => {
        tagCounts[skill] = (tagCounts[skill] || 0) + 1;
      });
    });
  };

  addTags(allProjects);
  addTags(allExperiences);
  addTags(allBlogs);

  const uniqueTags = Object.keys(tagCounts).sort();

  const handleTagClick = (tag) => {
    setSelectedTech(tag);
    setCurrentPage('techDetails');
  };

  return (
    <section className="w-full px-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-2">
        <h2 className="text-3xl text-gray-100 font-bold">All Tags</h2>
        {/* Uncomment to enable Back to Home button */}
        {/*
        <button
          onClick={() => setCurrentPage('home')}
          className="text-sm px-4 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          Back to Home
        </button>
        */}
      </div>

      <div className="flex flex-wrap gap-4">
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="relative bg-gray-800 text-gray-200 px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition cursor-pointer"
          >
            {/* Count badge */}
            <span className="absolute top-0 right-1 text-xs text-blue-400 font-semibold">
              {tagCounts[tag]}
            </span>
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AllTagsPage;
