import React, { useState, useEffect } from 'react';

const phrases = [
  "Control Plane for Agentic Software Development",
  "The Intelligent Project Manager for AI Agents",
  "Knowledge-Driven Orchestration Platform",
  "Automated Technical Architect"
];

const RotatingText: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Start fade out
      
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsVisible(true); // Start fade in
      }, 500); // Wait for transition duration
      
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 mb-12 flex items-center justify-center">
      <p 
        className={`text-lg text-neutral-500 font-light transition-all duration-500 transform ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
        }`}
      >
        {phrases[index]}
      </p>
    </div>
  );
};

export default RotatingText;