import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import defectImage from "../assets/images/defect.png";
import mlopsImage from "../assets/images/docker.jpg";
import embeddedImage from "../assets/images/robot.jpeg";
import { allBlogs } from "../data/blogsData"; // ✅ Import modularized blog data

const BlogPage = ({ setCurrentPage, setSelectedPost }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [setCurrentPage]);

  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left border-b-1 p-4 border-b-gray-700">
          Blog
        </h2>
        <div className="flex flex-col space-y-8 items-center w-full">
          {allBlogs.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => {
                setSelectedPost(post); // Set the entire blog object
                setCurrentPage("blogDetails"); // Navigate to details page
              }}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
