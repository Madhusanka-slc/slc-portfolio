import React from "react";
import { allExperiences } from "../../../data/experiencesData";

const DeveloperInfo = ({ setSelectedTech, setCurrentPage }) => {
  const defectExperience = allExperiences.find((blog) => blog.id === 3);
  const experienceSkills = defectExperience?.skills || [];
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Role & Responsibilities
        </h4>
        <p>
          As a Software Developer, I was responsible for designing, developing,
          and maintaining web and backend applications. I worked closely with
          cross-functional teams to deliver high-quality software solutions,
          ensuring performance, scalability, and security.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Key Contributions
        </h4>
        <ul className="list-disc list-inside">
          <li>Developed and optimized RESTful APIs and frontend interfaces</li>
          <li>
            Implemented automated testing and CI/CD pipelines to improve
            deployment reliability
          </li>
          <li>
            Collaborated with product managers and designers to deliver
            user-focused features
          </li>
          <li>
            Improved application performance and reduced bugs through code
            reviews and refactoring
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Work Environment
        </h4>
        <p>
          I worked in an agile software development team using Scrum
          methodology. The environment was collaborative and fast-paced,
          encouraging continuous learning and innovation.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Skills & Tools</h4>
        <ul className="list-disc list-inside">
          <li>JavaScript, React, Node.js</li>
          <li>REST APIs, GraphQL</li>
          <li>Git, Docker, Jenkins</li>
          <li>Agile methodologies and teamwork</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          My contributions helped enhance product functionality, reduced
          time-to-market for new features, and improved overall application
          stability and user satisfaction.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {experienceSkills.map((tech) => (
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

export default DeveloperInfo;
