import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin, Menu, X } from 'lucide-react';
import LoginButton from './LoginButton';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - always visible */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Brain
              className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-200"
              style={{
                filter: 'url(#gradientFilter)',
              }}
            />
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl md:text-3xl font-poppins font-black font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm transform transition-transform duration-200 group-hover:scale-105">
                  Quick
                </span>
                <span className="text-2xl md:text-3xl font-black font-poppins tracking-tight text-white ml-0.5 drop-shadow-sm transform transition-transform duration-200 group-hover:scale-105">
                  Notes
                </span>
              </div>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="text-gray-300 mr-4">
                Welcome, {user.displayName}
              </div>
            )}
            <LoginButton />
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

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden absolute left-0 right-0 top-16 bg-gray-900 border-t border-gray-800 shadow-lg z-50`}
        >
          <div className="px-4 py-4 space-y-4">
            {user && (
              <div className="text-gray-300 pb-2 border-b border-gray-800">
                Welcome, {user.displayName}
              </div>
            )}
            <div className="flex justify-center py-2">
              <LoginButton />
            </div>
            <div className="flex justify-center space-x-4 py-2 border-t border-gray-800">
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
      </div>
    </nav>
  );
};

export default Navbar;  