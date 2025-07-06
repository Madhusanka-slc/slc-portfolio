import React from "react";
import { allBlogs } from "../../../data/blogsData";
const BlogMLOpsInfo = ({ setSelectedTech, setCurrentPage }) => {
  const defectBlog = allBlogs.find((blog) => blog.id === 1);
  const blogSkills = defectBlog?.skills || [];
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This blog provides a hands-on guide for AI engineers to transition ML
          models from research notebooks to production environments using modern
          MLOps practices.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Focus</h4>
        <ul className="list-disc list-inside">
          <li>CI/CD with GitHub Actions</li>
          <li>Containerization with Docker</li>
          <li>API serving with FastAPI</li>
          <li>Model monitoring and versioning</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Bridges the operational gap between data science and deployment,
          enabling scalable, maintainable, and reliable ML solutions in
          real-world systems.
        </p>
      </div>

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

export default BlogMLOpsInfo;
