import React from "react";
import { allBlogs } from "../../../data/blogsData";

// Placeholder images for LLM concepts
import loraImage from "../../../assets/images/unet_pooling.png";
import qloraImage from "../../../assets/images/unet_pooling.png";
import finetuneImage from "../../../assets/images/unet_pooling.png";
import llmImage from "../../../assets/images/unet_pooling.png";

const BlogLLMInfo = ({ setSelectedTech, setCurrentPage }) => {
  const llmBlog = allBlogs.find((blog) => blog.id === 4); // LLM blog ID
  const blogSkills = llmBlog?.skills || [];

  return (
    <div className="space-y-12 px-4 py-8">
      {/* LLM Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Large Language Models Overview</h2>
        <p className="text-gray-600 mb-4">
          Large Language Models (LLMs) are pre-trained on massive text corpora and can perform a wide range of NLP tasks, from text generation to summarization and translation.
        </p>
        <img src={llmImage} alt="LLM Overview" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Instruction Tuning */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Instruction Tuning</h2>
        <p className="text-gray-600 mb-4">
          Fine-tuning LLMs with specific instructions or datasets to adapt them for custom tasks and improve performance on specialized domains.
        </p>
        <img src={finetuneImage} alt="Instruction Tuning" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* LoRA */}
      <div>
        <h2 className="text-2xl font-bold mb-2">LoRA – Low-Rank Adaptation</h2>
        <p className="text-gray-600 mb-4">
          LoRA injects trainable low-rank matrices into the pre-trained model, allowing efficient fine-tuning without updating all model parameters.
        </p>
        <img src={loraImage} alt="LoRA" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* QLoRA */}
      <div>
        <h2 className="text-2xl font-bold mb-2">QLoRA – Quantized LoRA</h2>
        <p className="text-gray-600 mb-4">
          QLoRA combines LoRA with quantization to reduce memory usage and speed up fine-tuning while maintaining performance.
        </p>
        <img src={qloraImage} alt="QLoRA" className="w-full rounded-2xl shadow-lg" />
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

export default BlogLLMInfo;
