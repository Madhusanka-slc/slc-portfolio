// src/data/projectsData.js
import poseImage from '../assets/images/pose-walk.png';
import toyImage from '../assets/images/robot.jpeg';
import landMarksImage from '../assets/images/landmarks.png';
import defectImage from '../assets/images/defect.png';
export const allProjects = [
  {
    id: 1,
    title: 'Real-Time Face Landmark Detection for HCI',
    subtitle: 'AI-Powered Facial Feature Mapping and Gesture Recognition',
    description: 'Implemented a real-time face landmark system using MediaPipe and Dlib for gesture-based control in accessibility and HCI applications.',
    imageUrl: landMarksImage,
    skills: ['MediaPipe', 'Dlib', 'Computer Vision', 'HCI']
  },
  {
    id: 2,
    title: 'Mechatronic Toy Design with 3D Vision Feedback',
    subtitle: 'Mechanical Design and CV Feedback Loop',
    description: 'Built a crank-driven automata toy integrating 3D-printed parts, Arduino, and OpenCV for performance tracking.',
    imageUrl: toyImage,
    skills: ['OpenCV', 'Arduino', '3D Printing', 'Mechanical Design']
  },
  {
    id: 3,
    title: 'Real-Time Pose Estimation for Human-Machine Interaction',
    subtitle: 'AI for Ergonomics and Safety',
    description: 'Developed a system using MediaPipe and TensorFlow to analyze posture and provide ergonomic risk scores in industry.',
    imageUrl: poseImage,
    skills: ['MediaPipe', 'TensorFlow', 'Ergonomics', 'Pose Estimation', 'Python']
  },
  {
    id: 4,
    title: 'Automated Defect Detection in Manufacturing',
    subtitle: 'Computer Vision in Manufacturing Environments',
    description: 'Learn how to train and deploy object detection models (e.g., YOLOv8) to automate quality control in mechanical workflows.',
    imageUrl: defectImage,
    skills: ['YOLOv8', 'Object Detection', 'Quality Control', 'Manufacturing', 'Python']
  }
];
