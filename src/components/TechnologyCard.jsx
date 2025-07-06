import React from 'react';

const TechnologyCard = ({ item, onClick, type }) => {
  // item can be a project, blog, or experience
  // type is a string: 'project', 'blog', or 'experience'

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg overflow-hidden border border-gray-700 hover:shadow-2xl hover:border-gray-400 transition-all duration-300 bg-[#2e2e33] group p-5"
    >
      {/* Show image only for projects or blogs if imageUrl exists */}
      {(type === 'project' || type === 'blog') && item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 object-cover mb-4 rounded group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Error";
          }}
        />
      )}

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 group-hover:text-gray-100 transition-colors duration-300 mb-2">
        {item.title}
      </h3>

      {/* Experience specific details */}
      {type === 'experience' && (
        <>
          <p className="text-gray-400 text-sm sm:text-base mb-1">
            <span className="font-medium">{item.company}</span> &middot; {item.location}
          </p>
          <p className="text-gray-500 text-sm sm:text-base">{item.date}</p>
        </>
      )}

      {/* Subtitle for projects or blogs */}
      {(type === 'project' || type === 'blog') && item.subtitle && (
        <p className="text-gray-400 text-sm sm:text-base">{item.subtitle}</p>
      )}
    </div>
  );
};

export default TechnologyCard;
