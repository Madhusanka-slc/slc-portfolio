import React from "react";
import { allBlogs } from "../../../data/blogsData";
import mpoolImg from "../../../assets/images/mpool.png";
import transImg from "../../../assets/images/trans.png";
import convImg from "../../../assets/images/conlu.png";
import carsegImg from "../../../assets/images/carseg.png";
import unetFullImg from "../../../assets/images/unet.png";
import decoderImg from "../../../assets/images/decoder.png";
import encoderImg from "../../../assets/images/encoder.png";
import prepoUnetImg from "../../../assets/images/prepounet.png";
const BlogUNetInfo = ({ setSelectedTech, setCurrentPage }) => {
  const unetBlog = allBlogs.find((blog) => blog.id === 2);
  const blogSkills = unetBlog?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      {/* Overview Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This blog post introduces <b>semantic segmentation</b>—the process of
          assigning a class label to every pixel in an image. It covers the
          U-Net architecture, its components, preprocessing, and training
          pipeline for image segmentation tasks such as medical imaging and
          autonomous driving.
        </p>
      </div>

      {/* Semantic Segmentation Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Semantic Segmentation
        </h4>
        <p>
          Semantic segmentation means understanding <b>what</b> and <b>where</b>{" "}
          in an image. Each pixel is labeled according to its class, e.g., road,
          car, person.
        </p>
        <div>
          <img
            src={carsegImg}
            alt="Semantic Segmentation Example"
            className="w-full mt-3 block"
          />
        </div>
      </div>

      {/* U-Net Fundamentals Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          U-Net Fundamentals
        </h4>
        <ul className="list-disc list-inside space-y-4">
          <li>
            <b>Convolution:</b> Extracts features from the image.
            <div>
              <img
                src={convImg}
                alt="Convolution"
                className="w-full mt-2 block"
              />
            </div>
          </li>

          <li>
            <b>Max Pooling:</b> Downsamples the image, keeping key features.
            <div>
              <img
                src={mpoolImg}
                alt="Max Pooling"
                className="w-full mt-2 block"
              />
            </div>
          </li>

          <li>
            <b>Transpose Convolution:</b> Upsamples the image in the decoder.
            <div>
              <img
                src={transImg}
                alt="Transpose Convolution"
                className="w-full mt-2 block"
              />
            </div>
          </li>
        </ul>
      </div>

      {/* U-Net Architecture Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          U-Net Architecture
        </h4>
        <p>
          The U-Net has a <b>U-shaped structure</b> consisting of:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <b>Encoder:</b> Downsampling path with conv + max pooling blocks.
          </li>
          <li>
            <b>Decoder:</b> Upsampling path with transpose conv + concatenation.
          </li>
          <li>
            <b>Skip Connections:</b> Connect encoder to decoder to preserve
            spatial details.
          </li>
        </ul>

        {/* Encoder */}
        <div className="mt-4">
          <img
            src={encoderImg}
            alt="U-Net Encoder"
            className="w-full mt-2 block"
          />
          <div className="text-sm text-center mt-1">Encoder</div>
        </div>

        {/* Decoder */}
        <div className="mt-4">
          <img
            src={decoderImg}
            alt="U-Net Decoder"
            className="w-full mt-2 block"
          />
          <div className="text-sm text-center mt-1">Decoder</div>
        </div>
      </div>

      {/* Preprocessing Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Preprocessing</h4>
        <p>
          Preprocessing includes resizing images, normalization, and data
          augmentation to improve model robustness.
        </p>
        <div>
          <img
            src={prepoUnetImg}
            alt="Preprocessing Pipeline"
            className="w-full mt-3 block"
          />
          <div className="text-sm text-center mt-1">Preprocessing Pipeline</div>
        </div>
      </div>

      {/* Training Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Training</h4>
        <p>
          Training involves feeding images and corresponding masks into the
          U-Net model using a loss function like <b>cross-entropy</b> for
          segmentation. The model learns to predict pixel-wise class labels.{" "}
          <br />
          <img
            src="training_pipeline.png"
            alt="Training Pipeline"
            style={{ width: "100%", marginTop: "10px" }}
          />
        </p>
      </div>

      {/* Skills Tags Section */}
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
