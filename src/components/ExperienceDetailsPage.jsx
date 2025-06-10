import React, { useEffect } from 'react';
import MphilInfo from './info/experience/MphilInfo';
import DeveloperInfo from './info/experience/DeveloperInfo';
import MechanicalInfo from './info/experience/MechanicalInfo';
import IJSEInfo from './info/experience/IJSEInfo';
import InternBodylineInfo from './info/experience/InternBodylineInfo';
import InternAirForceInfo from './info/experience/InternAirForceInfo';


const ExperienceDetailsPage = ({ experience, setCurrentPage }) => {
  // Debug log to check if experience prop is received
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [experience]);

  return (
    <section className="max-w-3xl p-6 rounded-lg text-gray-100">
      <h2 className="text-3xl font-bold mb-4">{experience.title}</h2>
      {experience.company && <h3 className="text-xl mb-2 text-gray-300">{experience.company}</h3>}
      <p className="mb-2 text-gray-400">{experience.location}</p>
      <p className="mb-6 text-gray-500">{experience.date}</p>

      {experience.description && (
        <p className="mb-6 text-gray-300">{experience.description}</p>
      )}

      {experience.imageUrl && (
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full rounded mb-6 object-cover max-h-96"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Not+Found';
          }}
        />
      )}

      <button
        onClick={() => setCurrentPage('experience')}
        className="px-4 py-2 bg-blue-950 rounded hover:bg-blue-700"
      >
        Back to Experiences
      </button>


      <div className="mt-8 text-left max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-gray-300">More About This Experience</h3>

        {/* Conditionally render based on blog post ID */}
        {experience.id === 1 && <MphilInfo />}
        {experience.id === 2 && <DeveloperInfo />}
        {experience.id === 3 && <IJSEInfo />}
        {experience.id === 4 && <MechanicalInfo />}
        {experience.id === 5 && <InternBodylineInfo />}
        {experience.id === 6 && <InternAirForceInfo />}
      </div>
    </section>
  );
};

export default ExperienceDetailsPage;
