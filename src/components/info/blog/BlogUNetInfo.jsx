import React from "react";
import { allBlogs } from "../../../data/blogsData";
import { ArrowDown } from "lucide-react";

import convImage from "../../../assets/images/unet_convolution.png";
import poolImage from "../../../assets/images/unet_pooling.png";
import transImage from "../../../assets/images/unet_transpose.png";
import preprocessImage from "../../../assets/images/unet_preprocess.png";
import encoderImage from "../../../assets/images/unet_encoder.png";
import decoderImage from "../../../assets/images/unet_decoder.png";
import unetImage from "../../../assets/images/unet.png";

const BlogUNetInfo = ({ setSelectedTech, setCurrentPage }) => {
  const unetBlog = allBlogs.find((blog) => blog.id === 2); // replace 2 with your actual blog ID
  const blogSkills = unetBlog?.skills || [];

  const conceptStages = [
    {
      title: "Convolution",
      image: convImage,
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
    {
      title: "Max Pooling",
      image: poolImage,
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
    {
      title: "Transpose Convolution",
      image: transImage,
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
  ];

  const pipelineStages = [
    {
      title: "Data Preprocessing",
      image: preprocessImage,
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
    {
      title: "Encoder Path",
      image: encoderImage,
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
    {
      title: "Decoder Path",
      image: decoderImage,
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
    {
      title: "Full U-Net Architecture",
      image: unetImage,
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
    },
  ];

  return (
    <div className="text-gray-400 space-y-6">
      {/* Overview */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          U-Net is a deep learning architecture designed for image segmentation,
          where each pixel is classified individually. Its symmetric encoder–
          decoder structure allows it to capture both fine details and overall
          context — making it perfect for medical imaging, satellite analysis,
          and more.
        </p>
      </div>

      {/* Prerequisite Concepts */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold mb-4">
          Prerequisite Concepts
        </h4>
        <div className="space-y-3 max-w-4xl mx-auto">
          {conceptStages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`border-2 ${stage.borderColor} ${stage.bgColor} rounded-xl p-3 sm:p-4 transition-all duration-300 hover:border-gray-400 hover:shadow-2xl group`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <p className="text-center text-gray-300 font-medium mt-2">
                  {stage.title}
                </p>
              </div>
              {idx < conceptStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown
                    className="text-gray-500"
                    size={32}
                    strokeWidth={2.5}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Data Preprocessing + Architecture */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold mb-4">
          U-Net Pipeline
        </h4>
        <div className="space-y-3 max-w-4xl mx-auto">
          {pipelineStages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`border-2 ${stage.borderColor} ${stage.bgColor} rounded-xl p-3 sm:p-4 transition-all duration-300 hover:border-gray-400 hover:shadow-2xl group`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <p className="text-center text-gray-300 font-medium mt-2">
                  {stage.title}
                </p>
              </div>
              {idx < pipelineStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown
                    className="text-gray-500"
                    size={32}
                    strokeWidth={2.5}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Why U-Net Works So Well
        </h4>
        <ul className="list-disc list-inside space-y-2">
          <li>Balances global context with fine local detail.</li>
          <li>Efficient even with small datasets.</li>
          <li>Delivers pixel-accurate segmentation results.</li>
        </ul>
      </div>

      {/* Summary */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">In Short</h4>
        <p>
          <strong>
            U-Net = Encoder (Feature Extraction) + Decoder (Reconstruction) +
            Skip Connections (Precision)
          </strong>
        </p>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a
              href="https://towardsdatascience.com/u-net-b229b32b4a71"
              target="_blank"
              rel="noopener noreferrer"
            >
              Understanding U-Net Architecture – Towards Data Science
            </a>
          </li>
        </ul>
      </div>

      {/* Skill Tags */}
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

export default BlogUNetInfo;
