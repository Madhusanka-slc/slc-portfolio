import React from "react";
import { allBlogs } from "../../../data/blogsData";
import unetImage from "../../../assets/images/24.png";

const BlogUNetInfo = ({ setSelectedTech, setCurrentPage }) => {
  const unetBlog = allBlogs.find((blog) => blog.id === 2); // replace 2 with your UNet blog ID
  const blogSkills = unetBlog?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This blog post introduces the UNet architecture—a convolutional neural
          network primarily used for biomedical image segmentation. It combines
          an encoder-decoder structure with skip connections to capture both
          context and fine-grained details.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">UNet Architecture</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Encoder (Contracting Path)</strong>
            <p className="ml-4 text-gray-400">
              Extracts features using convolution and pooling layers to reduce spatial dimensions while increasing feature depth.
            </p>
          </li>
          <li>
            <strong>Decoder (Expanding Path)</strong>
            <p className="ml-4 text-gray-400">
              Reconstructs the image using upsampling and convolution layers to restore spatial resolution.
            </p>
          </li>
          <li>
            <strong>Skip Connections</strong>
            <p className="ml-4 text-gray-400">
              Connect corresponding encoder and decoder layers to preserve fine details and improve segmentation accuracy.
            </p>
          </li>
          <li>
            <strong>Output Layer</strong>
            <p className="ml-4 text-gray-400">
              Produces a segmentation map matching the input dimensions.
            </p>
          </li>
        </ul>
      </div>

      <div>
                <img
          src={unetImage}
         
          className="w-full rounded mb-6 object-cover max-h-96"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Not+Found";
          }}
        />

      </div>



      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Applications</h4>
        <p>
          UNet is widely used in medical imaging tasks such as tumor segmentation,
          organ delineation, and cell detection, as well as general image segmentation
          tasks in computer vision.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a
              href="https://arxiv.org/abs/1505.04597"
              target="_blank"
              rel="noopener noreferrer"
            >
              UNet Original Paper (Ronneberger et al., 2015)
            </a>
          </li>
        </ul>
      </div>

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
