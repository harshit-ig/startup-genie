import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-slate-400">{subtitle}</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 