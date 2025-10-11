import React from 'react';
import profileImage from '../assets/profile.jpg';

export default function Hero({ darkMode }) {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Add a subtle overlay for better text readability */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        darkMode ? 'bg-black/20' : 'bg-white/30'
      }`}></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="relative">
          {/* Profile Picture with glow effect */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-2xl">
            <img 
              src={profileImage} 
              alt="Profile Picture"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative z-10">
              Aaron
            </span>
            {/* Text shadow for better readability */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent blur-sm opacity-50">
              Aaron
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-medium ${
            darkMode ? 'text-gray-100' : 'text-gray-700'
          }`}>
            Full-Stack Developer & UI/UX Enthusiast
          </p>
          
          <p className={`text-lg mb-12 max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            I create beautiful, functional, and user-centered digital experiences. 
            Passionate about modern web technologies and clean code.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#projects"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className={`border-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                darkMode 
                  ? 'border-blue-400 text-white hover:bg-blue-400' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}