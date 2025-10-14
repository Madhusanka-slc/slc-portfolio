import React from "react";
import { allBlogs } from "../../../data/blogsData";

// Placeholder images for LangGraph concepts
import graphImage from "../../../assets/images/unet_pooling.png";
import uiAgentImage from "../../../assets/images/unet_pooling.png";
import reasoningImage from "../../../assets/images/unet_pooling.png";
import decisionImage from "../../../assets/images/unet_pooling.png";

const BlogLangGraphInfo = ({ setSelectedTech, setCurrentPage }) => {
  const langGraphBlog = allBlogs.find((blog) => blog.id === 3); // LangGraph blog ID
  const blogSkills = langGraphBlog?.skills || [];

  return (
    <div className="space-y-12 px-4 py-8">
      {/* LangGraph Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-2">LangGraph Fundamentals</h2>
        <p className="text-gray-600 mb-4">
          LangGraph is a framework for building AI-powered UI agents that can reason over a graph-based representation of the user interface.
        </p>
        <img src={graphImage} alt="LangGraph Overview" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* UI Agent */}
      <div>
        <h2 className="text-2xl font-bold mb-2">UI Agent Concept</h2>
        <p className="text-gray-600 mb-4">
          UI agents use LangGraph to interact with applications intelligently, understanding context and possible actions through structured graphs.
        </p>
        <img src={uiAgentImage} alt="UI Agent" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Reasoning over Graph */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Reasoning Over Graph</h2>
        <p className="text-gray-600 mb-4">
          The agent can reason about different UI states, dependencies, and transitions to determine the optimal action sequence.
        </p>
        <img src={reasoningImage} alt="Reasoning" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Decision Making */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Decision-Making Strategies</h2>
        <p className="text-gray-600 mb-4">
          LangGraph enables decision-making for UI agents, choosing actions based on context, goals, and available options.
        </p>
        <img src={decisionImage} alt="Decision Making" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {blogSkills.map((tech) => (
          <span
            key={tech}
            onClick={() => {
              setSelectedTech(tech);
              setCurrentPage("techDetails");
            }}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition cursor-pointer"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogLangGraphInfo;
