import React, { useEffect, forwardRef } from "react";
import ExperienceCard from "./ExperienceCard";
import { allExperiences } from "../data/experiencesData";

// Wrap component with forwardRef
const ExperiencePage = forwardRef(
  ({ setCurrentPage, setSelectedExperience }, ref) => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, [setCurrentPage]);

    const handleCardClick = (experience) => {
      setSelectedExperience(experience);
      setCurrentPage("experienceDetails");
    };

    return (
      <section className="w-full flex flex-col items-center px-4">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-left border-b-1 p-4 border-b-gray-700">
            Experiences
          </h2>
          <div className="flex flex-col space-y-6 items-center w-full">
            {allExperiences.map((experience) => (
              <div
                key={experience.id}
                id={`experience-${experience.id}`}
                ref={(el) => {
                  if (ref && ref.current) {
                    // Store with full key like projects do
                    ref.current[`experience-${experience.id}`] = el;
                  }
                }}
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
  }
);

export default ExperiencePage;
