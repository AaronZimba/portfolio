import React from 'react';

export default function About({ darkMode }) {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          About <span className="text-blue-600">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`rounded-2xl overflow-hidden shadow-2xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Coding workspace"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
          
          <div className={`space-y-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <h3 className="text-2xl font-bold">Crafting Digital Experiences</h3>
            
            <p>
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              I love creating applications that are not only functional but also provide 
              exceptional user experiences.
            </p>
            
            <p>
              With a strong foundation in both front-end and back-end development, 
              I bring ideas to life through clean, efficient code and thoughtful design.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Frontend</h4>
                <p>React, Vue, JavaScript, TypeScript, Tailwind CSS</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Backend</h4>
                <p>Node.js, Python, Express, MongoDB, PostgreSQL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}