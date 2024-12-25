import React, { useState, useEffect } from 'react';
import { Github, X } from 'lucide-react';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to QuickNotes!
          </h2>
          <p className="text-gray-300 mb-6">
            Explore our open-source project and contribute to make it even better.
          </p>
          
          <a
            href="https://github.com/Bhavik2209/quicknotes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all duration-200 shadow-lg shadow-indigo-500/20"
          >
            <Github className="h-5 w-5" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;