import React from "react";
import { allProjects } from "../../../data/projectsData";

// Project components
const SpamClassifierInfo = ({ setSelectedTech, setCurrentPage }) => {
  const project = allProjects.find((p) => p.id === 2);
  const projectSkills = project?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          A machine learning API that classifies text messages (SMS, email, or chat) as spam or ham. 
          Built with Flask and scikit-learn, it exposes a REST endpoint for predictions and integrates 
          with Astra DB for storing results and feedback tracking.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          The system uses a scikit-learn classifier (Naive Bayes/SVM) trained on the SMS Spam Collection dataset. 
          Text preprocessing includes tokenization, stopword removal, and TF-IDF vectorization. 
          The model is serialized with joblib and loaded by the Flask API. Predictions are stored in Astra DB 
          for analytics and model improvement.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>REST API endpoint for spam/ham classification</li>
          <li>Confidence score returned with each prediction</li>
          <li>Astra DB integration for storing predictions</li>
          <li>Docker support for containerized deployment</li>
          <li>Pre-trained model with joblib serialization</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Provides a scalable solution for spam detection that can be integrated into messaging platforms, 
          email systems, or customer service applications. The API handles real-time classification with 
          high accuracy and stores data for continuous model improvement.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/spam-classifier-api" target="_blank" rel="noopener noreferrer">
              GitHub Repo - Spam Classifier API
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

export default SpamClassifierInfo;