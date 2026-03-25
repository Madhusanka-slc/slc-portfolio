import React from "react";
import { allProjects } from "../../../data/projectsData";
const BookRecommenderInfo = ({ setSelectedTech, setCurrentPage }) => {
  const project = allProjects.find((p) => p.id === 3);
  const projectSkills = project?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          An LLM-powered book recommendation system that uses vector search, zero-shot classification, 
          and sentiment analysis to suggest books based on descriptions. The project processes text data, 
          builds vector embeddings, and provides an interactive Gradio dashboard.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          Book descriptions are processed using LangChain for text splitting and vector database integration. 
          Hugging Face transformers handle zero-shot classification and sentiment analysis to categorize books 
          and extract emotions. Vector embeddings are stored in Chroma/FAISS for semantic similarity search, 
          enabling intelligent recommendations based on user queries.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Vector search for finding similar books using embeddings</li>
          <li>Zero-shot classification without fine-tuning</li>
          <li>Sentiment analysis to extract emotions from book descriptions</li>
          <li>Interactive Gradio dashboard for recommendations</li>
          <li>Comprehensive data cleaning and preprocessing pipeline</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Provides a modern approach to book recommendations using LLMs, enabling users to discover books 
          based on semantic meaning rather than simple keyword matching. The system can be extended to 
          other domains like movie or product recommendations.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/book-recommender" target="_blank" rel="noopener noreferrer">
              GitHub Repo - Book Recommender
            </a>
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {projectSkills.map((tech) => (
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
export default BookRecommenderInfo;