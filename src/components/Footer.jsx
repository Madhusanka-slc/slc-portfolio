import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full h-16 flex items-center justify-center text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Chathura Madhusanka. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
