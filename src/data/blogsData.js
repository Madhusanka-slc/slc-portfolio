import mlopsImage from "../assets/images/docker.jpg";
import embeddedImage from "../assets/images/robot.jpeg";
import defectImage from "../assets/images/defect.png";
import solidImage from "../assets/images/SOLID.png";
import unetImage from "../assets/images/imgseg.png";

export const allBlogs = [
  {
    id: 1,
    title: "SOLID Principles: Writing Clean and Maintainable Code",
    subtitle: "Master the five core principles of object-oriented design",
    description:
      "This blog post introduces the SOLID principles—Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion—to help developers write modular, flexible, and maintainable code.",
    imageUrl: solidImage,
    skills: ["SOLID", "OOP", "Clean Code", "Software Design"],
  },
  {
    id: 2,
    title: "MLOps for AI Engineers: From Notebook to Production",
    subtitle: "Bridging the gap between data science and deployment",
    description:
      "Walkthrough of practical tools and techniques to automate, monitor, and deploy ML models using Docker, GitHub Actions, and FastAPI.",
    imageUrl: mlopsImage,
    skills: ["MLOps", "Docker", "GitHub Actions", "FastAPI"],
  },
  {
    id: 3,
    title: "Making Smart Mechatronic Toys with Embedded AI",
    subtitle: "Combining mechanical engineering with AI/ML",
    description:
      "Explore how to design interactive toys using microcontrollers, sensors, and AI-based motion or gesture recognition.",
    imageUrl: embeddedImage,
    skills: [
      "Embedded Systems",
      "AI/ML",
      "Mechatronics",
      "Gesture Recognition",
      "Python",
    ],
  },
  {
    id: 4,
    title: "Building Real-Time Defect Detection Systems",
    subtitle: "Computer vision in manufacturing environments",
    description:
      "Learn how to train and deploy object detection models (e.g., YOLOv8) to automate quality control in mechanical workflows.",
    imageUrl: defectImage,
    skills: [
      "YOLOv8",
      "Object Detection",
      "Computer Vision",
      "Manufacturing",
      "Python",
    ],
  },
    {
    id: 5,
    title: "Understanding U-Net Architecture for Image Segmentation",
    subtitle: "Deep learning for precise medical and industrial image analysis",
    description:
      "Explore the U-Net convolutional neural network, designed for semantic segmentation tasks. Learn how its encoder-decoder structure with skip connections enables accurate pixel-level predictions in biomedical images and beyond.",
    imageUrl: unetImage, // replace with your imported U-Net image
    skills: [
      "U-Net",
      "Image Segmentation",
      "Deep Learning",
      "Computer Vision",
      "PyTorch",
      "TensorFlow",
    ],
  },

];
