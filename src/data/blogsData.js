import solidImage from "../assets/images/SOLID.png";
import tabTransformerImage from "../assets/images/tab_transformer.png";

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
    title: "TabTransformer: Deep Learning for Tabular Data",
    subtitle: "Understanding categorical embeddings and self-attention for tabular data modeling",
    description:
      "TabTransformer converts categorical values into learnable vectors (embeddings) and uses self-attention to capture relationships between features. It solves the core problem of traditional encoding where numbers create fake order and fake distance.",
    imageUrl: tabTransformerImage,
    skills: ["TabTransformer", "Deep Learning", "Self-Attention", "Embeddings", "Transformers"],
  },
];