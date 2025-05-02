import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, primary, outline, small, to, className = "", ...props }) => {
  const buttonClasses = `
    ${small ? 'px-4 py-2 text-sm' : 'px-6 py-3'} 
    rounded-lg font-medium transition-all flex items-center justify-center gap-2
    ${primary 
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/20' 
      : outline
        ? 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300'
        : 'bg-white/10 backdrop-blur-md hover:bg-white/15 text-white shadow-lg shadow-black/5'
    }
    no-underline
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 