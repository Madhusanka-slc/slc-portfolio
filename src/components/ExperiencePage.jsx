import React from 'react';
import ExperienceCard from './ExperienceCard'; // Adjust path if needed

const ExperiencePage = ({ setCurrentPage, setSelectedExperience }) => {
  const experiences = [
    {
      id: 1,
      title: 'AI Researcher (MPhil)',
      company: 'University of Peradeniya',
      location: 'Sri Lanka',
      date: 'May 2025 - Present',
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'M I Synergy (Pvt) Ltd',
      location: 'Sri Lanka.',
      date: 'Apr 2023 - Present',
    },
    {
      id: 3,
      title: 'Trainee Software Engineer',
      company: 'IJSE - Institute of Software Engineering',
      location: 'Sri Lanka.',
      date: 'May 2022 - Dec 2022',
    },
    {
      id: 4,
      title: 'Automation Engineer',
      company: 'Bondville (Pvt) Ltd',
      location: 'Sri Lanka.',
      date: 'Mar 2021 - May 2022',
    },
    {
      id: 5,
      title: 'Mechanical Engineering Intern',
      company: 'Bodyline (Pvt) Ltd',
      location: 'Sri Lanka.',
      date: 'Feb 2019 - May 2019',
    },
    {
      id: 6,
      title: 'Mechanical Engineering Intern',
      company: 'Sri Lanka Air Force',
      location: 'Sri Lanka.',
      date: 'Nov 2017 - Jan 2018',
    },
  ];

  const handleCardClick = (experience) => {
    setSelectedExperience(experience);
    setCurrentPage('experienceDetails');
  };

  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left border-b-1 p-4 border-b-gray-700">
          Experiences
        </h2>
        <div className="flex flex-col space-y-6 items-center w-full">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="w-full cursor-pointer"
              onClick={() => handleCardClick(experience)}
            >
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencePage;
