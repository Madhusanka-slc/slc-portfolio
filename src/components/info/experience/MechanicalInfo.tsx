import React from 'react';

const MechanicalInfo = () => {
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Role & Responsibilities at Bondville Pvt Ltd</h4>
        <p>
          Worked as a Design and Automation Engineer at Bondville Pvt Ltd, responsible for designing mechanical components and automating manufacturing processes to improve productivity, quality, and efficiency.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Contributions</h4>
        <ul className="list-disc list-inside">
          <li>Designed detailed 3D CAD models and technical drawings for mechanical assemblies and parts</li>
          <li>Developed automation solutions using PLCs, sensors, and actuators to streamline production lines</li>
          <li>Performed feasibility analysis and prototyping to validate design concepts and automation workflows</li>
          <li>Collaborated with cross-disciplinary teams including manufacturing, quality, and R&D to implement solutions</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Work Environment</h4>
        <p>
          Operated in a fast-paced engineering environment focused on innovation and continuous improvement, integrating mechanical design with control systems and automation technologies.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Skills & Tools</h4>
        <ul className="list-disc list-inside">
          <li>SolidWorks, AutoCAD, CATIA</li>
          <li>PLC programming (Siemens, Allen-Bradley)</li>
          <li>Industrial automation and control systems</li>
          <li>Mechanical prototyping and testing</li>
          <li>Root cause analysis and problem-solving</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Enabled increased production efficiency and reduced downtime through innovative design and automation solutions, contributing to cost savings and higher product quality.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {['Mechanical Design', 'Automation', 'CAD Modeling', 'PLC Programming', 'Manufacturing', 'Industrial Engineering', 'Process Improvement'].map((tag) => (
          <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MechanicalInfo;
