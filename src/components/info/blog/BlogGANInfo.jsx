import React from "react";
import { allBlogs } from "../../../data/blogsData";

// Placeholder images for GAN concepts
import ganOverviewImage from "../../../assets/images/unet_pooling.png";
import generatorImage from "../../../assets/images/unet_pooling.png";
import discriminatorImage from "../../../assets/images/unet_pooling.png";
import trainingImage from "../../../assets/images/unet_pooling.png";

const BlogGANInfo = ({ setSelectedTech, setCurrentPage }) => {
  const ganBlog = allBlogs.find((blog) => blog.id === 7); // Replace with your GAN blog ID
  const blogSkills = ganBlog?.skills || [];

  return (
    <div className="space-y-12 px-4 py-8">
      {/* GAN Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Generative Adversarial Networks (GANs) – Overview</h2>
        <p className="text-gray-600 mb-4">
          GANs are a class of neural networks where two models, the generator and discriminator, compete with each other to produce realistic data, such as images.
        </p>
        <img src={ganOverviewImage} alt="GAN Overview" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Generator */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Generator – Creating Data</h2>
        <p className="text-gray-600 mb-4">
          The generator network produces fake data samples to mimic the real data distribution, trying to fool the discriminator.
        </p>
        <img src={generatorImage} alt="GAN Generator" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Discriminator */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Discriminator – Distinguishing Real from Fake</h2>
        <p className="text-gray-600 mb-4">
          The discriminator network evaluates whether a sample is real (from the dataset) or fake (produced by the generator), providing feedback for the generator to improve.
        </p>
        <img src={discriminatorImage} alt="GAN Discriminator" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Training Process */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Training GANs – Adversarial Learning</h2>
        <p className="text-gray-600 mb-4">
          GANs are trained in an adversarial manner: the generator tries to fool the discriminator, and the discriminator tries to correctly identify real vs fake samples. This competition improves both networks over time.
        </p>
        <img src={trainingImage} alt="GAN Training" className="w-full rounded-2xl shadow-lg" />
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

export default BlogGANInfo;
