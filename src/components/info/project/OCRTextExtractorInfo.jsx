import React from "react";
import { allProjects } from "../../../data/projectsData";
const OCRTextExtractorInfo = ({ setSelectedTech, setCurrentPage }) => {
  const project = allProjects.find((p) => p.id === 6);
  const projectSkills = project?.skills || [];

  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Overview</h4>
        <p>
          A FastAPI-based OCR service that extracts text from images using Tesseract OCR. The application handles 
          file uploads, validates images, and returns extracted text with authentication support, ready for 
          deployment on DigitalOcean.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Technical Implementation</h4>
        <p>
          Tesseract OCR engine with pytesseract wrapper processes uploaded images. FastAPI handles file validation, 
          authentication via API keys, and returns extracted text. The system includes comprehensive PyTest 
          integration for testing file uploads and authentication. Docker containerization enables one-click 
          deployment to DigitalOcean App Platform.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Features</h4>
        <ul className="list-disc list-inside">
          <li>Text extraction from images using Tesseract OCR</li>
          <li>File upload validation for image formats and sizes</li>
          <li>API key-based authentication</li>
          <li>Jinja templates for web interface testing</li>
          <li>Comprehensive PyTest test suite</li>
          <li>Docker and DigitalOcean deployment ready</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Provides a production-ready OCR service that can be integrated into document processing workflows, 
          data extraction pipelines, or any application requiring text extraction from images.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Resources</h4>
        <ul className="list-disc list-inside text-blue-400">
          <li>
            <a href="https://github.com/Madhusanka-slc/ocr-text-extractor" target="_blank" rel="noopener noreferrer">
              GitHub Repo - OCR Text Extractor
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

export default OCRTextExtractorInfo;