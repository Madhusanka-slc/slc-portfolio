import React from "react";
import { allBlogs } from "../../../data/blogsData";

const BlogSOLIDInfo = ({ setSelectedTech, setCurrentPage }) => {
  const solidBlog = allBlogs.find((blog) => blog.id === 3); // replace 1 with your SOLID blog ID
  const blogSkills = solidBlog?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          This blog post introduces the SOLID principles—five core design
          concepts aimed at creating maintainable, scalable, and flexible
          object-oriented code, as defined by Robert C. Martin.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          SOLID Principles
        </h4>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>SRP</strong> – Single Responsibility Principle
            <p className="ml-4 text-gray-400">
              A class should have only one reason to change.
            </p>
          </li>
          <li>
            <strong>OCP</strong> – Open-Closed Principle
            <p className="ml-4 text-gray-400">
              Software entities should be open for extension, but closed for
              modification.
            </p>
          </li>
          <li>
            <strong>LSP</strong> – Liskov Substitution Principle
            <p className="ml-4 text-gray-400">
              Subtypes should be substitutable for their base types without
              affecting correctness.
            </p>
          </li>
          <li>
            <strong>ISP</strong> – Interface Segregation Principle
            <p className="ml-4 text-gray-400">
              Clients shouldn’t be forced to depend on interfaces they don’t
              use.
            </p>
          </li>
          <li>
            <strong>DIP</strong> – Dependency Inversion Principle
            <p className="ml-4 text-gray-400">
              Depend on abstractions, not concrete implementations.
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Value</h4>
        <p>
          Applying SOLID makes your code easier to maintain, test, and
          extend—reducing coupling and minimizing the risk of unintended
          side-effects. It promotes clean, modular design.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a
              href="https://medium.com/@madhusanka.slc/solid-principles-d198049d998c"
              target="_blank"
              rel="noopener noreferrer"
            >
              SOLID Principles Medium Article
            </a>
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {blogSkills.map((tech) => (
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

export default BlogSOLIDInfo;
