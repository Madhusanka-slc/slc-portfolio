// src/data/blogsData.js
import mlopsImage from '../assets/images/docker.jpg';
import embeddedImage from '../assets/images/robot.jpeg';
import defectImage from '../assets/images/defect.png';

export const allBlogs = [
  {
    id: 1,
    title: 'MLOps for AI Engineers: From Notebook to Production',
    subtitle: 'Bridging the gap between data science and deployment',
    description: 'This post walks through the practical tools and techniques to automate, monitor, and deploy ML models using tools like Docker, GitHub Actions, and FastAPI.',
    imageUrl: mlopsImage,
    skills: ['MLOps', 'FastAPI', 'GitHub Actions', 'Docker']
  },
  {
    id: 2,
    title: 'Making Smart Mechatronic Toys with Embedded AI',
    subtitle: 'Combining mechanical engineering with AI/ML',
    description: 'Explore how to design interactive toys using microcontrollers, sensors, and AI-based motion or gesture recognition.',
    imageUrl: embeddedImage,
    skills: ['Embedded Systems', 'AI/ML', 'Mechatronics', 'Gesture Recognition', 'Python']
  },
  {
    id: 3,
    title: 'Building Real-Time Defect Detection Systems',
    subtitle: 'Computer vision in manufacturing environments',
    description: 'Learn how to train and deploy object detection models (e.g., YOLOv8) to automate quality control in mechanical workflows.',
    imageUrl: defectImage,
    skills: ['YOLOv8', 'Object Detection', 'Computer Vision', 'Manufacturing', 'Python']
  }
];
