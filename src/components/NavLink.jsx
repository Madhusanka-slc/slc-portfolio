import React from 'react';

const NavLink = ({ onClick, children }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="text-gray-300 hover:text-white transition-colors duration-200 rounded-md py-1 px-2"
    >
      {children}
    </a>
  );
};

export default NavLink;
