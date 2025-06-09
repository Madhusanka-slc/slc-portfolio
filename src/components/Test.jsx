import React, { useState } from 'react';

// Main App component
const App = () => {
  // State to manage which page is currently displayed ('home', 'projects', 'blog', or 'experience')
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-inter antialiased">
      {/* Header component, now passing setCurrentPage to allow navigation */}
      <Header setCurrentPage={setCurrentPage} />

      {/* Main content section, conditionally rendering the Home, Projects, Blog, or Experience page */}
      <main className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' ? <HeroSection /> :
         currentPage === 'projects' ? <ProjectsPage /> :
         currentPage === 'blog' ? <BlogPage /> :
         <ExperiencePage />} {/* Render ExperiencePage if currentPage is 'experience' */}
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

// Header Component (updated to include navigation logic)
const Header = ({ setCurrentPage }) => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center border-b border-gray-700">
      {/* Logo/Name on the left */}
      <div className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-gray-50 cursor-pointer" onClick={() => setCurrentPage('home')}>
        <h1>Abdur Rahman</h1>
        {/* Sun icon (using inline SVG for simplicity) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m-.386-6.364l1.591 1.591"
          />
        </svg>
      </div>

      {/* Navigation links on the right */}
      <nav className="hidden md:flex space-x-6 text-base font-medium">
        <NavLink onClick={() => setCurrentPage('home')}>Home</NavLink>
        <NavLink onClick={() => setCurrentPage('blog')}>Blog</NavLink>
        <NavLink onClick={() => setCurrentPage('projects')}>Projects</NavLink>
        <NavLink onClick={() => setCurrentPage('experience')}>Experience</NavLink> {/* Experience navigation link */}
        <NavLink onClick={() => setCurrentPage('search')}>Search</NavLink> {/* Assuming search might be another page */}
      </nav>

      {/* Mobile menu button (hidden on larger screens) */}
      <div className="md:hidden">
        <button className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

// Reusable NavLink component (updated for onClick handling)
const NavLink = ({ onClick, children }) => {
  return (
    <a
      href="#" // Using # as placeholder, actual navigation is handled by onClick
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="text-gray-300 hover:text-white transition-colors duration-200 rounded-md py-1 px-2"
    >
      {children}
    </a>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="flex flex-col items-center max-w-4xl w-full text-center">
      {/* Profile Picture */}
      <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-8 shadow-lg ring-4 ring-gray-700">
        {/* Placeholder image. Replace with actual image path. */}
        <img
          src="https://placehold.co/192x192/4a5568/a0aec0?text=Profile"
          alt="Abdur Rahman's profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/192x192/4a5568/a0aec0?text=Error";
          }}
        />
      </div>

      {/* Name */}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-4">
        Abdur Rahman
      </h2>

      {/* Description */}
      <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl px-4">
        Hi I'm Abdur, a tech enthusiast who loves solving complex problems. As a
        Software Developer in the Backend Infrastructure team at{" "}
        <span className="font-semibold text-blue-400">Clio</span>, I'm building
        robust systems to transform the legal experience for all. By evening,
        you can find me pushing the limits of my strength at the gym or whipping
        up my favorite recipe in the kitchen. Let's connect and create something
        awesome together!
      </p>

      {/* Social Media Icons */}
      <div className="flex space-x-6">
        <SocialIcon
          href="mailto:your.email@example.com"
          icon="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
        <SocialIcon
          href="https://linkedin.com/in/yourprofile"
          icon="M18.375 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v14.625c0 1.036.84 1.875 1.875 1.875h12.75c1.036 0 1.875-.84 1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875zm-9.375 9.75V8.25h-2.25v3h2.25zm0 2.25c.621 0 1.125-.504 1.125-1.125s-.504-1.125-1.125-1.125-1.125.504-1.125 1.125.504 1.125 1.125 1.125zm3.75-2.25c0-.621.504-1.125 1.125-1.125s1.125.504 1.125 1.125-.504 1.125-1.125 1.125-1.125-.504-1.125-1.125zm3.75 0c0-.621.504-1.125 1.125-1.125s1.125.504 1.125 1.125-.504 1.125-1.125 1.125-1.125-.504-1.125-1.125z"
        />
        <SocialIcon
          href="https://github.com/yourprofile"
          icon="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.261.82-.58 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.542-1.373-1.322-1.734-1.322-1.734-1.087-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.493.998.108-.77.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.383 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.105 3.176.77.838 1.235 1.911 1.235 3.221 0 4.61-2.802 5.625-5.475 5.922.42.36.81 1.096.81 2.22 0 1.606-.015 2.895-.015 3.284 0 .315.21.69.825.57C20.565 21.828 24 17.302 24 12c0-6.627-5.373-12-12-12z"
        />
        <SocialIcon
          href="https://youtube.com/yourchannel"
          icon="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.275 14.88c-.144.509-.646.906-1.129 1.072-1.539.544-3.086.817-4.636.817-1.55 0-3.097-.273-4.636-.817-.483-.166-.985-.563-1.129-1.072-.144-.509-.234-1.123-.234-1.748V9.12c0-.625.09-1.239.234-1.748.144-.509.646-.906 1.129-1.072 1.539-.544 3.086-.817 4.636-.817 1.55 0 3.097.273 4.636.817.483.166.985.563 1.129 1.072.144.509.234 1.123.234 1.748v4.012c0 .625-.09 1.239-.234 1.748z"
        />
      </div>
    </section>
  );
};

// Reusable SocialIcon component
const SocialIcon = ({ href, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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


// Projects Page Component
const ProjectsPage = () => {
  // Sample project data
  const projects = [
    {
      id: 1,
      title: 'SHARING NOTES with GITHUB ACTIONS',
      subtitle: 'Obsidian Publish using GitHub Action',
      description: 'A GitHub Action to publish Obsidian notes as a website.',
      imageUrl: 'https://placehold.co/600x400/2D3748/A0AEC0?text=Project+1', // Placeholder
    },
    {
      id: 2,
      title: 'SYNC KINDLE HIGHLIGHTS TO NOTION',
      subtitle: 'Kindle to Notion',
      description: 'A way to seamlessly transfer your Kindle highlights to Notion.',
      imageUrl: 'https://placehold.co/600x400/2D3748/A0AEC0?text=Project+2', // Placeholder
    },
    {
      id: 3,
      title: 'A dog sitting on a rock in front of a lake',
      subtitle: 'Away to your Koenights to ston D', // Placeholder subtitle
      description: 'A beautiful project showcasing nature photography.', // Placeholder description
      imageUrl: 'https://placehold.co/600x400/2D3748/A0AEC0?text=Project+3', // Placeholder
    },
  ];

  return (
    <section className="w-full max-w-xl px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-center md:text-left">
        Projects
      </h2>
      <div className="flex flex-col space-y-8 items-center">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

// Blog Page Component
const BlogPage = () => {
  // Sample blog post data
  const blogPosts = [
    {
      id: 1,
      title: 'First Steps in React: A Beginner\'s Guide',
      subtitle: 'Getting started with component-based UI',
      description: 'This post covers the basics of React components, props, and state.',
      imageUrl: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Blog+Post+1', // Placeholder
    },
    {
      id: 2,
      title: 'Mastering Tailwind CSS for Rapid UI Development',
      subtitle: 'Utility-first CSS framework in action',
      description: 'Learn how to build beautiful and responsive UIs quickly with Tailwind.',
      imageUrl: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Blog+Post+2', // Placeholder
    },
    {
      id: 3,
      title: 'Understanding Asynchronous JavaScript',
      subtitle: 'Callbacks, Promises, and Async/Await',
      description: 'A deep dive into handling asynchronous operations in JavaScript.',
      imageUrl: 'https://placehold.co/600x400/1a202c/e2e8f0?text=Blog+Post+3', // Placeholder
    },
  ];

  return (
    <section className="w-full max-w-xl px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-center md:text-left">
        Blog
      </h2>
      <div className="flex flex-col space-y-8 items-center">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

// Experience Page Component (New)
const ExperiencePage = () => {
  // Sample experience data
  const experiences = [
    {
      id: 1,
      title: 'Software Developer II (Backend Infrastructure)',
      company: 'Clio',
      location: 'Toronto, Canada',
      date: 'June 2024 - Present',
    },
    {
      id: 2,
      title: 'Software Engineer (LLM & Backend Infrastructure)',
      company: '16Bit',
      location: 'Toronto, Canada',
      date: 'Sep 2022 - June 2024',
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'BuyerAssist (India)',
      location: 'June 2021 - Aug 2022',
      date: '', // No specific end date if still ongoing or not provided
    },
    {
      id: 4,
      title: 'Remote Research Intern',
      company: 'Technical University of Munich (Germany)',
      location: '', // Location often implied or less critical for remote
      date: 'Aug 2020 - Oct 2020',
    },
  ];

  return (
    <section className="w-full max-w-xl px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-8 text-center md:text-left">
        Experiences
      </h2>
      <div className="flex flex-col space-y-6 items-center"> {/* Slightly less space for experience cards */}
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  );
};

// Experience Card Component (New)
const ExperienceCard = ({ experience }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 w-full p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-50 mb-1">
        {experience.title}
      </h3>
      <p className="text-base text-gray-300 mb-1">
        {experience.company} {experience.location && `| ${experience.location}`}
      </p>
      <p className="text-sm text-gray-400">{experience.date}</p>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300 w-full">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Error";
        }}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-50 mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{project.subtitle}</p>
        <p className="text-base text-gray-300">{project.description}</p>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ post }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300 w-full">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/4A5568/A0AEC0?text=Image+Error";
        }}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-50 mb-1">
          {post.title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{post.subtitle}</p>
        <p className="text-base text-gray-300">{post.description}</p>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-500 border-t border-gray-700 mt-12">
      <p>&copy; {new Date().getFullYear()} Abdur Rahman. All rights reserved.</p>
    </footer>
  );
};

export default App;
