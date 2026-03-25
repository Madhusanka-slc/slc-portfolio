import spamImage from "../assets/images/spam-classifier.png";
import bookImage from "../assets/images/book-recommender.png";
import photoImage from "../assets/images/pic-generator.png";
import toyImage from "../assets/images/tom-jerry.png";
import dockerImage from "../assets/images/docker.jpg";
import ocrImage from "../assets/images/ocr.png";
import travelImage from "../assets/images/travel-ai.png";
import messengerImage from "../assets/images/chat-ai.png";
import ragImage from "../assets/images/langchain-rag.png";


export const allProjects = [
    {
    id: 1,
    title: "AI Photo Generator",
    subtitle: "RepliFace - Custom Image Generation API",
    description:
      "AI-powered backend API generating custom photos using text prompts and fine-tuned Flux models on Replicate, with rate limiting and streaming responses.",
    imageUrl: photoImage, // Replace with photoImage once available
    skills: ["FastAPI", "Replicate", "Upstash Redis", "Flux", "Python"],
  },
  {
    id: 2,
    title: "Spam Classifier API",
    subtitle: "Machine Learning API for Message Classification",
    description:
      "A machine learning API that classifies text messages as spam or ham using Flask and scikit-learn, with Astra DB integration for storing predictions and feedback tracking.",
    imageUrl: spamImage,
    skills: ["Python", "Flask", "scikit-learn", "Astra DB", "Docker"],
  },
  {
    id: 3,
    title: "Book Recommender System",
    subtitle: "LLM-Powered Book Recommendations",
    description:
      "An LLM-powered book recommendation system using vector search, zero-shot classification, and sentiment analysis to suggest books based on descriptions, with an interactive Gradio dashboard.",
    imageUrl: bookImage, // Replace with bookImage once available
    skills: ["Python", "LangChain", "Hugging Face", "Gradio", "FAISS"],
  },
  {
    id: 4,
    title: "AI Travel Agent",
    subtitle: "Flight Price Prediction & Travel Recommendations",
    description:
      "AI-powered travel system that predicts flight prices using MindsDB and suggests destinations with OpenAI integration, featuring a Next.js frontend and FastAPI backend.",
    imageUrl: travelImage, // Replace with travelImage once available
    skills: ["FastAPI", "Next.js", "MindsDB", "OpenAI", "Docker", "Postgres"],
  },
  {
    id: 5,
    title: "Docker AI Agent",
    subtitle: "Containerized Multi-Agent System",
    description:
      "Docker-based AI agent system with LangChain, LangGraph, and FastAPI, featuring multi-agent orchestration, email automation, and Postgres integration.",
    imageUrl: dockerImage, // Replace with dockerImage once available
    skills: ["Docker", "FastAPI", "LangChain", "LangGraph", "Postgres"],
  },
  {
    id: 6,
    title: "OCR Text Extractor",
    subtitle: "Image to Text Extraction Service",
    description:
      "FastAPI-based OCR service using Tesseract to extract text from images with file validation, API key authentication, and comprehensive test suite.",
    imageUrl: ocrImage, // Replace with ocrImage once available
    skills: ["FastAPI", "Tesseract", "Docker", "PyTest", "DigitalOcean"],
  },
  {
    id: 7,
    title: "LangChain RAG API",
    subtitle: "Retrieval-Augmented Generation API",
    description:
      "RAG API built with LangChain and FastAPI for intelligent chat with private knowledge sources using vector embeddings, with Upstash Redis for rate limiting.",
    imageUrl: ragImage, // Replace with ragImage once available
    skills: ["LangChain", "FastAPI", "OpenAI", "Upstash", "Redis"],
  },
  {
    id: 8,
    title: "AI Multimodal Messenger",
    subtitle: "Nova - Multimodal AI Assistant",
    description:
      "Python-based multimodal messenger integrating text, voice, and images with memory management, LangGraph workflow orchestration, and multiple AI models.",
    imageUrl: messengerImage, // Replace with messengerImage once available
    skills: ["Python", "LangGraph", "Chainlit", "TogetherAI", "Qdrant"],
  },

  {
    id: 9,
    title: "Wake Word Detection System",
    subtitle: "TinyML-powered Voice Activation for ESP32",
    description: "Deep learning pipeline for custom wake word detection, optimized for ESP32 deployment to enable hands-free voice control for embedded applications like the STEM Toy.",
    imageUrl: toyImage,
    skills: ["TinyML", "TensorFlow Lite", "ESP32", "Audio Processing", "Edge AI", "ElevenLabs"],
  }
];