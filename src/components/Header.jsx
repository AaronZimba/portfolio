import React, { useState } from 'react';

export default function Header({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className={`fixed w-full z-50 transition-colors duration-300 ${
      darkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Aaron Zimba
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`block h-0.5 w-full transition-all duration-300 ${
                  darkMode ? 'bg-white' : 'bg-gray-800'
                } ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block h-0.5 w-full transition-all duration-300 ${
                  darkMode ? 'bg-white' : 'bg-gray-800'
                } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-full transition-all duration-300 ${
                  darkMode ? 'bg-white' : 'bg-gray-800'
                } ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  darkMode 
                    ? 'text-white hover:bg-gray-700' 
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}