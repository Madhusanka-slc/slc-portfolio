import React from 'react';

const NavLink = ({ onClick, children, isActive }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`py-1 px-2 rounded-md transition-colors duration-200 
        ${isActive ? 'font-bold text-white' : 'text-gray-300 hover:text-white'}`}
    >
      {children}
    </a>
  );
};

export default NavLink;
