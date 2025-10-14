import solidImage from "../assets/images/SOLID.png";
import mlopsImage from "../assets/images/docker.jpg";
import embeddedImage from "../assets/images/robot.jpeg";
import unetImage from "../assets/images/imgseg.png";
import transformerImage from "../assets/images/transformer_full.png";

export const allBlogs = [
  {
    id: 1,
    title: "Understanding U-Net Architecture for Image Segmentation",
    subtitle: "Deep learning for precise medical and industrial image analysis",
    description:
      "Explore the U-Net convolutional neural network, designed for semantic segmentation tasks. Learn how its encoder-decoder structure with skip connections enables accurate pixel-level predictions in biomedical images and beyond.",
    imageUrl: unetImage,
    skills: ["U-Net", "Image Segmentation", "Deep Learning", "Computer Vision", "PyTorch", "TensorFlow"],
  },
  {
    id: 2,
    title: "Transformer Architecture: Attention and Translation",
    subtitle: "Deep learning model for sequence-to-sequence tasks",
    description:
      "Dive into Transformers for NLP and translation tasks, covering self-attention, multi-head attention, positional encoding, feed-forward networks, and encoder-decoder structures.",
    imageUrl: transformerImage,
    skills: ["Transformer", "Attention", "NLP", "Deep Learning", "Sequence Modeling"],
  },
  {
    id: 3,
    title: "SOLID Principles: Writing Clean and Maintainable Code",
    subtitle: "Master the five core principles of object-oriented design",
    description:
      "This blog post introduces the SOLID principles—Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion—to help developers write modular, flexible, and maintainable code.",
    imageUrl: solidImage,
    skills: ["SOLID", "OOP", "Clean Code", "Software Design"],
  },
];
