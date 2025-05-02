import React from 'react';

const Card = ({ children, hover = true, className = "" }) => {
  return (
    <div className={`
      bg-gradient-to-br from-slate-800/80 to-slate-900/80
      backdrop-blur-xl rounded-lg p-6 
      ${hover ? 'hover:translate-y-[-5px] hover:shadow-xl' : ''} 
      transition-all duration-300 ease-in-out 
      border border-white/10 shadow-lg shadow-black/20
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card; 