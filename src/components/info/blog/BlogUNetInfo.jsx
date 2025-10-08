import React, { useState } from "react";
import { allBlogs } from "../../../data/blogsData";
import mpoolImg from "../../../assets/images/hqgpt.png";
import transImg from "../../../assets/images/trans.png";
import convImg from "../../../assets/images/gemi.svg";
import carsegImg from "../../../assets/images/carseg.png";
import unetFullImg from "../../../assets/images/unet.png";
import decoderImg from "../../../assets/images/decoder.png";
import encoderImg from "../../../assets/images/encoder.png";
import prepoUnetImg from "../../../assets/images/prepounet.png";

// Code highlighter import
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const BlogUNetInfo = ({ setSelectedTech, setCurrentPage }) => {
  const unetBlog = allBlogs.find((blog) => blog.id === 2);
  const blogSkills = unetBlog?.skills || [];
  const [copied, setCopied] = useState(false);

  // === Python U-Net Implementation ===
  const unetCode = `import torch
import torch.nn as nn

# Convolution block (Conv -> BN -> ReLU) x2
class ConvBlock(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(ConvBlock, self).__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, 3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, 3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
        )

    def forward(self, x):
        return self.conv(x)

# U-Net architecture
class UNet(nn.Module):
    def __init__(self, in_channels=3, out_channels=1):
        super(UNet, self).__init__()
        # Encoder
        self.encoder1 = ConvBlock(in_channels, 64)
        self.pool1 = nn.MaxPool2d(2)
        self.encoder2 = ConvBlock(64, 128)
        self.pool2 = nn.MaxPool2d(2)

        # Bottleneck
        self.bottleneck = ConvBlock(128, 256)

        # Decoder
        self.up1 = nn.ConvTranspose2d(256, 128, 2, stride=2)
        self.decoder1 = ConvBlock(256, 128)
        self.up2 = nn.ConvTranspose2d(128, 64, 2, stride=2)
        self.decoder2 = ConvBlock(128, 64)

        # Output
        self.output_layer = nn.Conv2d(64, out_channels, kernel_size=1)

    def forward(self, x):
        # Encoder
        x1 = self.encoder1(x)
        x2 = self.pool1(x1)
        x3 = self.encoder2(x2)
        x4 = self.pool2(x3)

        # Bottleneck
        x5 = self.bottleneck(x4)

        # Decoder
        x6 = self.up1(x5)
        x6 = torch.cat([x6, x3], dim=1)
        x7 = self.decoder1(x6)
        x8 = self.up2(x7)
        x8 = torch.cat([x8, x1], dim=1)
        x9 = self.decoder2(x8)

        return self.output_layer(x9)

# Example
if __name__ == "__main__":
    model = UNet()
    x = torch.randn(1, 3, 128, 128)
    print("Output shape:", model(x).shape)`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(unetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          car, or person.
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
          segmentation. The model learns to predict pixel-wise class labels.
        </p>
      </div>

      {/* Python Implementation Section */}
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          U-Net Python Implementation
        </h4>
        <p>
          Below is a simplified <b>PyTorch</b> implementation of the U-Net
          architecture for semantic segmentation:
        </p>
      </div>

      {/* Code Block - Responsive Card with Hover Copy Button */}
      <div className="relative -mx-6 sm:mx-0">
        <div className="rounded-none sm:rounded-lg overflow-hidden border-y sm:border border-gray-700 hover:shadow-2xl hover:border-gray-400 transition-all duration-300 bg-[#2e2e33] group">
          
          {/* Card Body with Scrollable Code */}
          <div className="relative overflow-x-auto">
            {/* Copy Button - Only visible on hover */}
            <button
              onClick={handleCopyCode}
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs transition-all duration-200 flex items-center gap-1"
            >
              {copied ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  copy
                </>
              )}
            </button>

            <SyntaxHighlighter
              language="python"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "20px",
                backgroundColor: "transparent",
                fontSize: "0.875rem",
              }}
              wrapLongLines={false}
              showLineNumbers={false}
            >
              {unetCode}
            </SyntaxHighlighter>
          </div>
        </div>
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