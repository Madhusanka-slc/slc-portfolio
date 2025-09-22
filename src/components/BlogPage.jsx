import React, { useEffect, forwardRef } from "react";
import BlogCard from "./BlogCard";
import { allBlogs } from "../data/blogsData";

// Use forwardRef to pass refs from parent
const BlogPage = forwardRef(({ setCurrentPage, setSelectedPost }, ref) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [setCurrentPage]);

  // Ensure ref.current is always an object
  if (ref && !ref.current) {
    ref.current = {};
  }

  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left border-b-1 p-4 border-b-gray-700">
          Blog
        </h2>
        <div className="flex flex-col space-y-8 items-center w-full">
          {allBlogs.map((post) => (
            <div
              key={post.id}
              id={`blog-${post.id}`}
              ref={(el) => {
                if (ref && ref.current) {
                  // Store with full key like projects do
                  ref.current[`blog-${post.id}`] = el;
                }
              }}
              onClick={() => {
                setSelectedPost(post);
                setCurrentPage("blogDetails");
              }}
              style={{ cursor: "pointer" }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default BlogPage;