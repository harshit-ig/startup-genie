import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="max-w-xl mx-auto text-center py-20">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden p-8 border border-white/10">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-white mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-slate-300 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button primary>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 