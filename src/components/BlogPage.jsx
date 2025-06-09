import React, { useState } from 'react';
import BlogCard from './BlogCard';
import BlogDetailsPage from './BlogDetailsPage';

import dockerImage from '../assets/images/docker.jpg';
import pytorchImage from '../assets/images/pytorch.png';
import robotImage from '../assets/images/robot.jpeg';
const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState('blogList');
  const [selectedPost, setSelectedPost] = useState(null);


  const blogPosts = [
    {
      id: 1,
      title: "First Steps in React: A Beginner's Guide",
      subtitle: 'Getting started with component-based UI',
      description: 'This post covers the basics of React components, props, and state.',
      imageUrl: dockerImage,
    },
    {
      id: 2,
      title: 'Mastering Tailwind CSS for Rapid UI Development',
      subtitle: 'Utility-first CSS framework in action',
      description: 'Learn how to build beautiful and responsive UIs quickly with Tailwind.',
      imageUrl: pytorchImage,
    },
    {
      id: 3,
      title: 'Understanding Asynchronous JavaScript',
      subtitle: 'Callbacks, Promises, and Async/Await',
      description: 'A deep dive into handling asynchronous operations in JavaScript.',
      imageUrl: robotImage,
    },
  ];

  if (currentPage === 'blogDetails' && selectedPost) {
    return (
      <BlogDetailsPage post={selectedPost} setCurrentPage={setCurrentPage} />
    );
  }

  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left">Blog</h2>
        <div className="flex flex-col space-y-8 items-center">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => {
                setSelectedPost(post);
                setCurrentPage('blogDetails');
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
