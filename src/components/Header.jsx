import React from 'react';
import NavLink from './NavLink'; // Adjust path as needed

const Header = ({ setCurrentPage }) => {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col md:flex-row md:justify-around items-center space-y-2 md:space-y-0">
        
        {/* Logo/Title */}
        <div
          className="flex items-center text-lg sm:text-xl font-bold text-gray-50 cursor-pointer w-full md:w-auto md:justify-start"
          onClick={() => setCurrentPage('home')}
        >
          <h1 className="text-gray-500 w-full text-left md:text-center">Portfolio</h1>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center space-x-6 text-base font-medium w-full md:w-auto">
          <NavLink onClick={() => setCurrentPage('home')}>Home</NavLink>
          <NavLink onClick={() => setCurrentPage('blog')}>Blog</NavLink>
          <NavLink onClick={() => setCurrentPage('projects')}>Projects</NavLink>
          <NavLink onClick={() => setCurrentPage('experience')}>Experience</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
