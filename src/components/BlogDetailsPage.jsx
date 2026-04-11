import React, { useEffect } from "react";
import BlogDefectDetectionInfo from "./info/blog/BlogDefectDetectionInfo";
import BlogSOLIDInfo from "./info/blog/BlogSOLIDInfo";
import BlogTabTransformerInfo from "./info/blog/BlogTabTransformerInfo";
import BlogMechatronicToysInfo from "./info/blog/BlogMechatronicToysInfo";
import BlogMLOpsInfo from "./info/blog/BlogMLOpsInfo";
import BlogUNetInfo from "./info/blog/BlogUNetInfo";
import BlogTransformerInfo from "./info/blog/BlogTransformerInfo";
import BlogLangGraphInfo from "./info/blog/BlogLangGraphInfo";
import BlogLLMInfo from "./info/blog/BlogLLMInfo";
const BlogDetailsPage = ({ post, setCurrentPage, setSelectedTech }) => {
  useEffect(() => {
    console.log("Rendering blog:", post);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [post]);

  return (
    <section className="max-w-3xl p-6 rounded-lg text-gray-100">
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      {post.subtitle && (
        <h3 className="text-xl mb-2 text-gray-300">{post.subtitle}</h3>
      )}
      <p className="mb-6">{post.description}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full rounded mb-6 object-cover max-h-96"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Not+Found";
          }}
        />
      )}

      <button
        onClick={() => setCurrentPage("blog")}
        className="px-4 py-2 bg-blue-950 rounded hover:bg-blue-700 cursor-pointer"
      >
        Back to Blog
      </button>

      <div className="mt-8 text-left max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-gray-300">
          More About This Blog
        </h3>

        {/* Conditionally render blog info components based on post ID */}
        {post.id === 1 && (
          <BlogSOLIDInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
        {post.id === 2 && (
          <BlogTabTransformerInfo
            setCurrentPage={setCurrentPage}
            setSelectedTech={setSelectedTech}
          />
        )}
      </div>
    </section>
  );
};

export default BlogDetailsPage;
