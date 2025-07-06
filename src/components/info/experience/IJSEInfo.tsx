import React from "react";
import { allExperiences } from "../../../data/experiencesData";

const IJSEInfo = ({ setSelectedTech, setCurrentPage }) => {
  const defectExperience = allExperiences.find((blog) => blog.id === 3);
  const experienceSkills = defectExperience?.skills || [];
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Program Overview
        </h4>
        <p>
          Completed the Java Institute of Software Engineering (IJSE) training
          program focused on core Java programming, object-oriented concepts,
          and software development best practices. The program emphasized
          practical coding skills and real-world project experience.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Key Learning Areas
        </h4>
        <ul className="list-disc list-inside">
          <li>
            Java SE fundamentals: syntax, data types, control flow, exception
            handling
          </li>
          <li>
            Object-Oriented Programming concepts: classes, inheritance,
            polymorphism
          </li>
          <li>Java Collections Framework and file I/O operations</li>
          <li>Basic database connectivity using JDBC</li>
          <li>Introduction to Java GUI programming with Swing</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Training Environment
        </h4>
        <p>
          The training involved hands-on coding exercises, quizzes, and small
          projects under the guidance of experienced instructors. Collaborative
          learning and peer code reviews were encouraged to enhance
          understanding.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Skills & Tools</h4>
        <ul className="list-disc list-inside">
          <li>Java SE, OOP principles</li>
          <li>Eclipse IDE, NetBeans</li>
          <li>JDBC for database connectivity</li>
          <li>Basic SQL</li>
          <li>Version control using Git</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          This training provided a strong foundation in Java programming and
          software development principles, preparing me for real-world software
          engineering tasks and further advanced learning.
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

export default IJSEInfo;
