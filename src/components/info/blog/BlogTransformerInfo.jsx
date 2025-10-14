import React from "react";
import { allBlogs } from "../../../data/blogsData";

import rnnImage from "../../../assets/images/rnn.png";
import gruImage from "../../../assets/images/transformer_full.png";
import lstmImage from "../../../assets/images/transformer_full.png";
import embeddingImage from "../../../assets/images/transformer_full.png";
import attentionImage from "../../../assets/images/transformer_full.png";
import selfAttentionImage from "../../../assets/images/transformer_full.png";
import multiHeadImage from "../../../assets/images/transformer_full.png";
import ffImage from "../../../assets/images/transformer_full.png";
import positionalImage from "../../../assets/images/transformer_full.png";
import addNormImage from "../../../assets/images/transformer_full.png";
import maskImage from "../../../assets/images//transformer_full.png";
import transformerImage from "../../../assets/images/transformer_full.png";

const BlogTransformerInfo = ({ setSelectedTech, setCurrentPage }) => {
  const transformerBlog = allBlogs.find((blog) => blog.id === 6); // replace 6 with the correct ID
  const blogSkills = transformerBlog?.skills || [];

  return (
    <div className="space-y-12 px-4 py-8">
      {/* RNN */}
      <div>
        <h2 className="text-2xl font-bold mb-2">RNN Model – Recurrent Neural Network</h2>
        <p className="text-gray-600 mb-4">
          RNNs process sequential data by maintaining a hidden state that captures past information.
        </p>
        <img src={rnnImage} alt="RNN" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* GRU */}
      <div>
        <h2 className="text-2xl font-bold mb-2">GRU Model – Gated Recurrent Unit</h2>
        <p className="text-gray-600 mb-4">
          GRUs improve on RNNs by adding gates to control information flow, helping to solve the vanishing gradient problem.
        </p>
        <img src={gruImage} alt="GRU" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* LSTM */}
      <div>
        <h2 className="text-2xl font-bold mb-2">LSTM Model – Long Short-Term Memory</h2>
        <p className="text-gray-600 mb-4">
          LSTMs use input, output, and forget gates to maintain long-term dependencies in sequences, better than vanilla RNNs.
        </p>
        <img src={lstmImage} alt="LSTM" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Weaknesses */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Weaknesses of RNN/GRU/LSTM</h2>
        <p className="text-gray-600 mb-4">
          Sequential processing prevents parallelization, long-term dependencies are still hard to capture fully, and training can be slow.
        </p>
      </div>

      {/* Embedding */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Embedding – Feature Vector</h2>
        <p className="text-gray-600 mb-4">
          Words or tokens are converted into dense vectors representing semantic and syntactic features for model input.
        </p>
        <img src={embeddingImage} alt="Embedding" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Attention */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Attention Mechanism (Q, K, V)</h2>
        <p className="text-gray-600 mb-4">
          Attention allows the model to focus on relevant parts of the sequence. Query (Q), Key (K), and Value (V) matrices compute attention scores dynamically.
        </p>
        <img src={attentionImage} alt="Attention" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Transformer Full */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Transformer Architecture Overview</h2>
        <p className="text-gray-600 mb-4">
          Transformers use attention-based representations combined with CNN-style feed-forward processing, enabling parallel computation and long-range dependencies.
        </p>
        <img src={transformerImage} alt="Transformer Full" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Self Attention */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Self-Attention</h2>
        <p className="text-gray-600 mb-4">
          Computes attention of a token with respect to all tokens in the same sequence, capturing contextual relationships.
        </p>
        <img src={selfAttentionImage} alt="Self Attention" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Multi-Head Attention */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Multi-Head Attention</h2>
        <p className="text-gray-600 mb-4">
          Multiple attention heads learn different types of relationships in parallel. Each head has its own Q, K, V projections.
        </p>
        <img src={multiHeadImage} alt="Multi Head Attention" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Feed Forward */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Feed Forward Network</h2>
        <p className="text-gray-600 mb-4">
          A fully connected network applied to each position independently, adding non-linearity and richer feature transformation.
        </p>
        <img src={ffImage} alt="Feed Forward" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Positional Encoding */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Positional Encoding</h2>
        <p className="text-gray-600 mb-4">
          Adds information about token positions so that the model can capture the order of sequences.
        </p>
        <img src={positionalImage} alt="Positional Encoding" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Add & Norm */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Add & Norm</h2>
        <p className="text-gray-600 mb-4">
          Residual connections add the input to the output of a sublayer, followed by normalization to stabilize training and propagate positional info.
        </p>
        <img src={addNormImage} alt="Add and Norm" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Masked Attention */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Masked Attention</h2>
        <p className="text-gray-600 mb-4">
          During training, masking prevents the model from seeing future tokens, ensuring autoregressive prediction in the decoder.
        </p>
        <img src={maskImage} alt="Mask Attention" className="w-full rounded-2xl shadow-lg" />
      </div>

      {/* Encoder-only Models */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Encoder-Only Models & Use Cases</h2>
        <p className="text-gray-600 mb-4">
          Only the encoder is used to generate contextual representations. Example: BERT for classification, NER, or embedding extraction.
        </p>
      </div>

      {/* Decoder-only Models */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Decoder-Only Models & Use Cases</h2>
        <p className="text-gray-600 mb-4">
          Only the decoder is used for text generation tasks. Example: GPT series for autoregressive language modeling.
        </p>
      </div>

      {/* Encoder-Decoder Models */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Encoder-Decoder Models & Use Cases</h2>
        <p className="text-gray-600 mb-4">
          Both encoder and decoder are used for sequence-to-sequence tasks like translation and summarization. Example: original Transformer, T5.
        </p>
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
