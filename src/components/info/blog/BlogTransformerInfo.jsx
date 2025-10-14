import React from "react";
import { allBlogs } from "../../../data/blogsData";

import transformerImage from "../../../assets/images/transformer_full.png";
import selfAttentionImage from "../../../assets/images/self-attention.png";
import encoderLayerImage from "../../../assets/images/encoder_layer.png";
import encoderImage from "../../../assets/images/encoder.png";
import decoderLayerImage from "../../../assets/images/decoder_layer.png";
import decoderImage from "../../../assets/images/decoder.png";

const BlogTransformerInfo = ({ setSelectedTech, setCurrentPage }) => {
  const transformerBlog = allBlogs.find((blog) => blog.id === 2);
  const blogSkills = transformerBlog?.skills || [];

  return (
    <div className="space-y-12 px-4 py-8">
      {/* Transformer Architecture */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Transformer Architecture</h2>
        <p className="text-gray-600 mb-4">
          The Transformer is a deep learning model introduced by Vaswani et al. (2017),
          designed to handle sequential data using self-attention instead of recurrence.
          It consists of an encoder–decoder structure, enabling efficient parallelization
          and long-range dependency modeling.
        </p>
        <img src={transformerImage} alt="Transformer Architecture" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Self-Attention */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Self-Attention Mechanism</h2>
        <p className="text-gray-600 mb-4">
          Self-attention allows each token to attend to all others in the same sequence,
          computing relationships dynamically using Query, Key, and Value matrices.
          This mechanism helps capture context efficiently without sequential processing.
        </p>
        <img src={selfAttentionImage} alt="Self Attention" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Encoder Layer */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Encoder Layer</h2>
        <p className="text-gray-600 mb-4">
          Each encoder layer contains multi-head self-attention and a feed-forward sublayer,
          connected by residual paths and layer normalization. It processes input embeddings
          into rich contextual representations.
        </p>
        <img src={encoderLayerImage} alt="Encoder Layer" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Encoder */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Encoder</h2>
        <p className="text-gray-600 mb-4">
          The encoder is a stack of multiple identical layers that transform input sequences
          into context-aware representations. Each layer refines the features learned
          from the previous one.
        </p>
        <img src={encoderImage} alt="Encoder" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Decoder Layer */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Decoder Layer</h2>
        <p className="text-gray-600 mb-4">
          Each decoder layer contains masked self-attention, encoder–decoder attention,
          and a feed-forward sublayer. Masking ensures that future tokens are not visible
          during training.
        </p>
        <img src={decoderLayerImage} alt="Decoder Layer" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Decoder */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Decoder</h2>
        <p className="text-gray-600 mb-4">
          The decoder stack generates outputs step by step by attending to both the
          encoder outputs and previously generated tokens. This makes it ideal for
          text generation and translation tasks.
        </p>
        <img src={decoderImage} alt="Decoder" className="w-full rounded-2xl shadow-lg" />
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

export default BlogTransformerInfo;
