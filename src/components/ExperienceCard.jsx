import React from "react";

const ExperienceCard = ({ experience, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300 w-full p-4"
      style={{ backgroundColor: "#252529" }}
    >
      {experience.imageUrl && (
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full max-h-64 object-cover rounded-t-lg mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Error";
          }}
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-50 mb-1 saira-font">{experience.title}</h3>
        <p className="text-sm text-gray-400 mb-1">{experience.company}</p>
        <p className="text-sm text-gray-400 mb-1">{experience.location}</p>
        <p className="text-sm text-gray-500">{experience.date}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
