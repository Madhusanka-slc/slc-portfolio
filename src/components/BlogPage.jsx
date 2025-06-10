import React, { useEffect } from "react";
import BlogCard from './BlogCard';

import visionImage from '../assets/images/docker.jpg';
import mlopsImage from '../assets/images/pytorch.png';
import embeddedImage from '../assets/images/robot.jpeg';
const BlogPage = ({ setCurrentPage, setSelectedPost }) => {
        useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, [setCurrentPage]);
  const blogPosts = [
    {
      id: 1,
      title: 'Building Real-Time Defect Detection Systems',
      subtitle: 'Computer vision in manufacturing environments',
      description: 'Learn how to train and deploy object detection models (e.g., YOLOv8) to automate quality control in mechanical workflows.',
      imageUrl: visionImage,
    },
    {
      id: 2,
      title: 'MLOps for AI Engineers: From Notebook to Production',
      subtitle: 'Bridging the gap between data science and deployment',
      description: 'This post walks through the practical tools and techniques to automate, monitor, and deploy ML models using tools like Docker, GitHub Actions, and FastAPI.',
      imageUrl: mlopsImage,
    },
    {
      id: 3,
      title: 'Making Smart Mechatronic Toys with Embedded AI',
      subtitle: 'Combining mechanical engineering with AI/ML',
      description: 'Explore how to design interactive toys using microcontrollers, sensors, and AI-based motion or gesture recognition.',
      imageUrl: embeddedImage,
    },
  ];

  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left border-b-1 p-4 border-b-gray-700">Blog</h2>
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
