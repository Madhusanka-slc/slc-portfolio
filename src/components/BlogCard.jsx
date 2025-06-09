import React from 'react';

const BlogCard = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300 w-full p-8" style={{ backgroundColor: '#2e2e33' }}>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full max-h-xl object-cover rounded-t-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Error';
          }}
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-50 mb-1">{post.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{post.subtitle}</p>
        <p className="text-base text-gray-300">{post.description}</p>
      </div>
    </div>
  );
};

export default BlogCard;

