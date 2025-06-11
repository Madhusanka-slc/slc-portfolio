import React, { useEffect } from "react";
import SocialIcon from './SocialIcon'; // Make sure to import your SocialIcon component
import profileImage from '../assets/images/pro.png';
const HeroSection = ({currentPage}) => {
      useEffect(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, [currentPage]);
  return (
    <section className="flex flex-col items-center justify-center w-full text-center px-4">
      {/* Profile Picture */}
      <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-8 shadow-lg ring-2 ring-gray-700">
        <img
          src={profileImage}
          alt="Chathura Madhusanka's profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/192x192/4a5568/a0aec0?text=Error";
          }}
        />
      </div>

      {/* Name */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-4">
        Chathura Madhusanka
      </h2>

      {/* Description */}

      <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
        Hi<span className="text-2xl mr-2">👋🏼</span> I’m Chathura — a curious mind who loves building smart solutions at the intersection of physical systems and AI. As an MPhil researcher, I’m exploring how machine learning can improve healthcare, drawing on my background in mechanical engineering and full-stack development. Let’s connect and create something impactful together!
      </p>






      {/* Social Media Icons */}
      <div className="flex space-x-6">
        <SocialIcon
          href="mailto:madhusanka.slc@gmail.com"
          icon="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
          label="Email"
        />
        <SocialIcon
          href="https://www.linkedin.com/in/chathura-madhusanka-4605401a5/"
          icon="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          label="LinkedIn"
        />
        <SocialIcon
          href="https://github.com/Madhusanka-slc"
          icon="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.261.82-.58 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12"
          label="GitHub"
        />
        <SocialIcon
          href="https://www.youtube.com/channel/UCOenULUuSmGEXV6RB19ELOw"
          icon="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          label="YouTube"
        />
      </div>
    </section>
  );
};

export default HeroSection;
