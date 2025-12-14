import React from "react";

const SocialIcon = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label || "Social link"}
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={icon} />
      </svg>
    </a>
  );
};

export default SocialIcon;
