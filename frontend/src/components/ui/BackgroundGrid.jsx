import React from 'react';

/**
 * A reusable background grid component with the pointer-events-none class 
 * to ensure it doesn't block interactions with elements behind it
 */
const BackgroundGrid = () => {
  return (
    <div 
      className="absolute inset-0 bg-[url('/src/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"
      aria-hidden="true"
    ></div>
  );
};

export default BackgroundGrid; 