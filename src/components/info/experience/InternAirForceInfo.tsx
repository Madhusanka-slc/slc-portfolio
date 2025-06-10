import React from 'react';

const InternAirForceInfo = () => {
  return (
    <div className="text-gray-400 space-y-6">
      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Role & Responsibilities</h4>
        <p>
          Completed an internship at the Air Force, assisting in the development and maintenance of internal software tools and supporting technical operations. Responsibilities included troubleshooting, system monitoring, and collaborating with the IT team to improve workflow efficiency.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Key Contributions</h4>
        <ul className="list-disc list-inside">
          <li>Assisted in maintaining and updating software applications used in operational workflows</li>
          <li>Performed system testing and bug fixing to improve application reliability</li>
          <li>Supported IT staff in network monitoring and hardware setup</li>
          <li>Documented technical processes and contributed to user manuals</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Work Environment</h4>
        <p>
          Worked within a disciplined, structured military IT environment emphasizing teamwork, attention to detail, and adherence to security protocols. Gained exposure to real-world IT infrastructure and operational procedures.
        </p>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Skills & Tools</h4>
        <ul className="list-disc list-inside">
          <li>Basic network administration and troubleshooting</li>
          <li>Software testing and debugging</li>
          <li>Windows and Linux operating systems</li>
          <li>Technical documentation and communication</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg text-gray-300 font-semibold">Impact</h4>
        <p>
          The internship provided valuable hands-on experience in IT operations within a secure and high-stakes environment, building foundational skills in system maintenance and teamwork.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {['Internship', 'IT Support', 'Network Administration', 'Software Testing', 'Military Environment', 'Teamwork', 'Documentation'].map((tag) => (
          <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InternAirForceInfo;
