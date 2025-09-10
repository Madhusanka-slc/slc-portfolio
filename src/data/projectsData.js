// src/data/projectsData.js
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
];
