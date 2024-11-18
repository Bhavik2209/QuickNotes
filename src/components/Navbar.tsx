import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin } from 'lucide-react';

const QuickTubeLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-8 w-8">
    <defs>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#6366F1"}}/>
        <stop offset="100%" style={{stopColor:"#8B5CF6"}}/>
      </linearGradient>
    </defs>
    
    <circle cx="16" cy="16" r="14" fill="url(#brainGradient)"/>
    
    <path d="M16,10 
            C19,10 21,11 21,13
            C21,14.5 19,15 19,16.5
            C19,18 21,18.5 21,20
            C21,22 19,23 16,23
            C13,23 11,22 11,20
            C11,18.5 13,18 13,16.5
            C13,15 11,14.5 11,13
            C11,11 13,10 16,10Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinejoin="round"/>
  </svg>
);

const Navbar = () => {
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <Brain
              className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-200"
              style={{
                filter: 'url(#gradientFilter)',
              }}
            />
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-3xl font-poppins font-black font-bold  tracking-tight font-poppins bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm transform transition-transform duration-200 group-hover:scale-105">
                  Quick
                </span>
                <span className="text-3xl font-black  font-poppins tracking-tight font-poppins text-white ml-0.5 drop-shadow-sm transform transition-transform duration-200 group-hover:scale-105">
                  Notes
                </span>
              </div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Bhavik2209"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-700 rounded-lg"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            
            <a
              href="https://linkedin.com/in/bhavik-rohit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-700 rounded-lg"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;