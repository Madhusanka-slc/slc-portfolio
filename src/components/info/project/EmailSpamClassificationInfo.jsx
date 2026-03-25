import React from "react";
import { allProjects } from "../../../data/projectsData";

const SpamEmailClassificationInfo = ({ setSelectedTech, setCurrentPage }) => {
  const spamProject = allProjects.find((project) => project.id === 6);
  const projectSkills = spamProject?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This project focuses on building an intelligent email spam
          classification system using machine learning and natural language
          processing techniques. The system analyzes email content and
          automatically classifies messages as spam or legitimate (ham),
          helping to reduce unwanted emails and improve communication security.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Technical Implementation
        </h4>
        <p>
          The solution is implemented using a classical NLP pipeline that
          includes text cleaning, tokenization, stop-word removal, and feature
          extraction using TF-IDF vectorization. Supervised machine learning
          models such as Naive Bayes and Logistic Regression are trained and
          evaluated using Scikit-learn. The system is designed to be modular,
          allowing easy experimentation with different models and feature
          extraction strategies.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Automatic spam and ham email classification</li>
          <li>Robust text preprocessing and normalization pipeline</li>
          <li>TF-IDF–based feature extraction for textual data</li>
          <li>Support for multiple ML classifiers</li>
          <li>Model evaluation using precision, recall, and F1-score</li>
          <li>Scalable design suitable for real-world email filtering</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          The system significantly improves email filtering efficiency by
          reducing false positives and accurately identifying spam content.
          During evaluation, the model achieved high classification accuracy
          and demonstrated strong generalization across unseen email samples,
          making it suitable for deployment in production-level email systems.
        </p>
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

export default SpamEmailClassificationInfo;
