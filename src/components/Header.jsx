import React from 'react';
import NavLink from './NavLink'; // Adjust path as needed

const Header = ({ setCurrentPage, currentPage }) => {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col md:flex-row md:justify-around items-center space-y-2 md:space-y-0">
        
        {/* Logo/Title */}
        <div
          className="self-start text-lg sm:text-xl font-bold text-gray-50 cursor-pointer  md:justify-start"
          onClick={() => setCurrentPage('home')}
        >
          <h1 className=" text-gray-500 w-full text-left md:text-center">Portfolio</h1>
        </div>

        {/* Navigation */}
      <nav className="flex justify-center md:justify-start space-x-6 text-base font-medium w-full md:w-auto">
          <NavLink onClick={() => setCurrentPage('home')} isActive={currentPage === 'home'}>Home</NavLink>
          <NavLink onClick={() => setCurrentPage('blog')} isActive={currentPage === 'blog'}>Blog</NavLink>
          <NavLink onClick={() => setCurrentPage('projects')} isActive={currentPage === 'projects'}>Projects</NavLink>
          <NavLink onClick={() => setCurrentPage('experience')} isActive={currentPage === 'experience'}>Experience</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
