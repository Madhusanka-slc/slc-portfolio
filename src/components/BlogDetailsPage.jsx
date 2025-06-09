import React, { useEffect } from 'react';

const BlogDetailsPage = ({ post, setCurrentPage }) => {
  useEffect(() => {
    console.log('BlogDetailsPage received post:', post);
  }, [post]);

  return (
    <section className="max-w-3xl p-6 rounded-lg text-gray-100">
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      {post.subtitle && <h3 className="text-xl mb-2 text-gray-300">{post.subtitle}</h3>}
      <p className="mb-6">{post.description}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full rounded mb-6 object-cover max-h-96"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Not+Found';
          }}
        />
      )}

      <button
        onClick={() => setCurrentPage('blogList')}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Back to Blog
      </button>

      <div className="mt-8 text-left max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-gray-300">Note</h3>
        <p className="text-gray-400 mb-4">
          Select another blog post to read its full details. If nothing is shown,
          return to the blog list and select again.
        </p>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
