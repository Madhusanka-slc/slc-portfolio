import React from 'react';

const InternBodylineInfo = () => {
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Role & Responsibilities</h4>
        <p>
          Served as an Automation Engineer Intern in the R&D department at Bodyline, focusing on designing, testing, and implementing automation solutions to improve manufacturing and product development processes.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Contributions</h4>
        <ul className="list-disc list-inside">
          <li>Designed and programmed automation workflows using PLC and industrial control systems</li>
          <li>Assisted in developing prototype automation setups to optimize production efficiency</li>
          <li>Conducted system testing, troubleshooting, and performance evaluation of automated processes</li>
          <li>Collaborated with cross-functional teams to integrate automation into existing manufacturing lines</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Work Environment</h4>
        <p>
          Worked in a dynamic R&D environment with hands-on experience in industrial automation, robotics, and process optimization, contributing to innovative solutions in manufacturing technology.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Skills & Tools</h4>
        <ul className="list-disc list-inside">
          <li>PLC programming (e.g., Siemens, Allen-Bradley)</li>
          <li>Automation software and SCADA systems</li>
          <li>Electrical and mechanical system troubleshooting</li>
          <li>Industrial robotics basics</li>
          <li>Technical documentation and reporting</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          Contributed to enhancing automation capabilities within the R&D team, resulting in improved production line efficiency and laying groundwork for scalable manufacturing automation solutions.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {['Automation', 'R&D', 'PLC Programming', 'Industrial Automation', 'Manufacturing', 'Process Optimization', 'Robotics'].map((tag) => (
          <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InternBodylineInfo;
