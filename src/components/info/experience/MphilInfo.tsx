import React from 'react';

const MphilInfo = () => {
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Role & Responsibilities</h4>
        <p>
          As an MPhil researcher in Artificial Intelligence, I was responsible for designing and conducting research on AI-based models for cardiac valvular disease analysis. My key responsibilities included data collection, preprocessing, model development, validation, and collaborating with clinical partners.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Contributions</h4>
        <ul className="list-disc list-inside">
          <li>Developed an AI model for mitral valve function assessment using multimodal imaging</li>
          <li>Integrated echocardiography, X-ray, MRI, and CT data for robust feature extraction</li>
          <li>Published research findings in relevant conferences and journals</li>
          <li>Collaborated with cardiologists and radiologists to validate the clinical applicability</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Work Environment</h4>
        <p>
          I worked in an interdisciplinary academic research environment, closely engaging with both the engineering and medical faculties. This setup provided access to cutting-edge imaging data and expert domain knowledge.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Skills & Tools</h4>
        <ul className="list-disc list-inside">
          <li>Python, PyTorch, OpenCV</li>
          <li>Medical image analysis</li>
          <li>Deep learning model training and evaluation</li>
          <li>Scientific communication and academic writing</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          The research contributed to early diagnosis of valvular heart diseases and supports healthcare professionals in resource-constrained settings with AI-assisted diagnostic tools.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {['AI Research', 'Medical Imaging', 'MPhil', 'Cardiology', 'Deep Learning', 'Python', 'Echocardiography'].map((tag) => (
          <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MphilInfo;
