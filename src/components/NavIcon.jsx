import React from 'react';

const NavIcon = ({ onClick, iconPath, label }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
    >
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d={iconPath} />
      </svg>
    </button>
  );
};

export default NavIcon;
