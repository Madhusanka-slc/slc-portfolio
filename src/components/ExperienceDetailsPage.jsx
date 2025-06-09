import React, { useEffect } from 'react';

const ExperienceDetailsPage = ({ experience, setCurrentPage }) => {
  // Debug log to check if experience prop is received
  useEffect(() => {
    console.log('ExperienceDetailsPage received experience:', experience);
  }, [experience]);

  if (!experience) {
    return (
      <section className="max-w-3xl p-6 rounded-lg text-gray-100">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Experience not found</h2>
        <p className="text-gray-400 mb-6">Please go back to the Experiences page and select an experience.</p>
        <button
          onClick={() => setCurrentPage('experiences')}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Back to Experiences
        </button>
      </section>
    );
  }

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
        onClick={() => setCurrentPage('experiences')}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Back to Experiences
      </button>

      <div className="mt-8 text-left max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-gray-300">About this Experience</h3>
        <p className="text-gray-400 mb-4">
          This section can be extended to include more in-depth details like responsibilities, technologies used,
          outcomes, and more.
        </p>
        <p className="text-gray-500">
          If no experience details are shown, return to the Experiences page and select a valid entry.
        </p>
      </div>
    </section>
  );
};

export default ExperienceDetailsPage;
