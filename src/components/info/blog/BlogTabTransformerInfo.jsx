import React from "react";
import { allBlogs } from "../../../data/blogsData";

const BlogTabTransformerInfo = ({ setSelectedTech, setCurrentPage }) => {
  const tabTransformerBlog = allBlogs.find((blog) => blog.id === 2); // replace with your Tab Transformer blog ID
  const blogSkills = tabTransformerBlog?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          TabTransformer converts categorical values into learnable vectors (embeddings) 
          and uses self-attention to capture relationships between features. It solves 
          the core problem of traditional encoding where numbers create fake order and 
          fake distance (e.g., Male=1 > Female=0 — nonsense!).
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">
          Problems It Solves
        </h4>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>False Ordering</strong>
            <p className="ml-4 text-gray-400">
              Model assumes Male(1) > Female(0) or Asymptomatic(3) > Typical(0). 
              But categories are just different — no order exists.
            </p>
          </li>
          <li>
            <strong>False Distance</strong>
            <p className="ml-4 text-gray-400">
              Model thinks Typical(0) is closer to Atypical(1) than to Asymptomatic(3). 
              All categories are equally different — no fake distances.
            </p>
          </li>
          <li>
            <strong>No Context</strong>
            <p className="ml-4 text-gray-400">
              Same number (Chest Pain=0) means same for every patient. 
              But real meaning depends on Age, Sex, and other features.
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Innovations</h4>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Learnable Embeddings</strong>
            <p className="ml-4 text-gray-400">
              Encode categories as vectors (e.g., "Typical" → [0.1, 0.3, 0.1, 0.8]) 
              instead of single numbers — kills false order and false distance.
            </p>
          </li>
          <li>
            <strong>Self-Attention</strong>
            <p className="ml-4 text-gray-400">
              Lets each feature look at all other features — adds context. 
              Same chest pain, different patient → different meaning.
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">How It Works</h4>
        <p>
          Token = Column Embedding + Value Embedding
        </p>
        <p className="mt-2 text-gray-400">
          Example: "Male from Sex column" → [0.5, -0.2, -0.3, 0.4]
          <br />
          • First part (l) → identifies the column
          <br />
          • Second part (d-l) → represents the value
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Value</h4>
        <p>
          TabTransformer outperforms traditional models on categorical-heavy tabular data 
          by removing artificial bias (fake order/distance) and adding context through attention.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a
              href="https://medium.com/@madhusanka.slc/a-deep-technical-exploration-of-tab-transformer-for-tabular-data-modeling-39fe803366e3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Deep Technical Exploration of TabTransformer
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

export default BlogTabTransformerInfo;