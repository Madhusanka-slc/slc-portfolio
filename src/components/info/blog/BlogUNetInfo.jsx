import React from "react";
import convImage from "../../../assets/images/unet_convolution.png";
import poolImage from "../../../assets/images/unet_pooling.png";
import transImage from "../../../assets/images/unet_transpose.png";
import preprocessImage from "../../../assets/images/unet_preprocess.png";
import encoderImage from "../../../assets/images/unet_encoder.png";
import decoderImage from "../../../assets/images/unet_decoder.png";
import unetImage from "../../../assets/images/unet.png";

const BlogUNetInfo = () => {
  return (
    <div className="space-y-12 px-4 py-8">
      {/* Convolution Network */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Convolution Network – How It Works</h2>
        <p className="text-gray-600 mb-4">
          Convolutional layers use filters to extract local features like edges, shapes,
          and textures from input images.
        </p>
        <img
          src={convImage}
          alt="Convolution"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>

      {/* Max Pooling */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Max Pooling – Feature Reduction</h2>
        <p className="text-gray-600 mb-4">
          Downsamples feature maps to reduce spatial size while keeping the most
          important activations.
        </p>
        <img
          src={poolImage}
          alt="Pooling"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>

      {/* Transpose Convolution */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Transpose Convolution – Upsampling</h2>
        <p className="text-gray-600 mb-4">
          Performs the reverse of convolution to reconstruct high-resolution outputs from
          low-resolution feature maps.
        </p>
        <img
          src={transImage}
          alt="Transpose Convolution"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>

      {/* Data Preprocessing */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Data Preprocessing</h2>
        <p className="text-gray-600 mb-4">
          Input images are decoded, normalized, and resized before being fed into the
          U-Net model.
        </p>
        <img
          src={preprocessImage}
          alt="Preprocessing"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>

      {/* Encoder Path */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Encoder Path</h2>
        <p className="text-gray-600 mb-4">
          The encoder captures hierarchical patterns and spatial features through
          convolution and pooling.
        </p>
        <img
          src={encoderImage}
          alt="Encoder"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>

      {/* Decoder Path */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Decoder Path</h2>
        <p className="text-gray-600 mb-4">
          The decoder reconstructs segmentation maps by upsampling and merging encoder
          features.
        </p>
        <img
          src={decoderImage}
          alt="Decoder"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>

      {/* Full U-Net Architecture */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Full U-Net Architecture</h2>
        <p className="text-gray-600 mb-4">
          Combines encoder, decoder, and skip connections for precise, pixel-level image
          segmentation.
        </p>
        <img
          src={unetImage}
          alt="U-Net Full"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default BlogUNetInfo;
