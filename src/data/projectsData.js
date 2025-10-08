import poseImage from "../assets/images/pose-walk.png";
import toyImage from "../assets/images/robot.jpeg";
import landMarksImage from "../assets/images/landmarks.png";
import defectImage from "../assets/images/defect.png";
import wakeWordImage from "../assets/images/wake-word.png";

export const allProjects = [
  {
    id: 1,
    title: "Wake Word Detection on ESP32-S3",
    subtitle: "Real-Time Trigger Word Detection using INMP441 Microphone",
    description:
      "Developed a real-time wake word detection system on ESP32-S3 using the INMP441 digital I²S microphone for hands-free control in IoT applications.",
    imageUrl: wakeWordImage,
    skills: ["ESP32-S3", "INMP441", "TinyML", "Audio Processing"],
  },
  {
    id: 2,
    title: "Real-Time Face Landmark Detection for HCI",
    subtitle: "AI-Powered Facial Feature Mapping and Gesture Recognition",
    description:
      "Implemented a real-time face landmark system using MediaPipe and Dlib for gesture-based control in accessibility and HCI applications.",
    imageUrl: landMarksImage,
    skills: ["MediaPipe", "Dlib", "Computer Vision", "HCI"],
  },
  {
    id: 3,
    title: "Mechatronic Toy with ESP32 & Wake Word Detection",
    subtitle: "Crank-driven Toy with Embedded AI for Hands-Free Control",
    description:
      "Built a crank-driven automata toy integrating 3D-printed parts, ESP32, and a TinyML wake word detection system for interactive, hands-free operation.",
    imageUrl: toyImage,
    skills: [
      "ESP32",
      "Wake Word Detection",
      "TinyML",
      "3D Printing",
      "Mechanical Design",
    ],
  },
  {
    id: 4,
    title: "Real-Time Pose Estimation for Human-Machine Interaction",
    subtitle: "AI for Ergonomics and Safety",
    description:
      "Developed a system using MediaPipe and TensorFlow to analyze posture and provide ergonomic risk scores in industry.",
    imageUrl: poseImage,
    skills: [
      "MediaPipe",
      "TensorFlow",
      "Ergonomics",
      "Pose Estimation",
      "Python",
    ],
  },
  // {
  //   id: 5,
  //   title: "Automated Defect Detection in Manufacturing",
  //   subtitle: "Computer Vision in Manufacturing Environments",
  //   description:
  //     "Trained and deployed object detection models (e.g., YOLOv8) to automate quality control in mechanical workflows.",
  //   imageUrl: defectImage,
  //   skills: [
  //     "YOLOv8",
  //     "Object Detection",
  //     "Quality Control",
  //     "Manufacturing",
  //     "Python",
  //   ],
  // },
];
