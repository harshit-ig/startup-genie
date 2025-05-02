import React from 'react';

const PageContainer = ({ children, className = "" }) => {
  return (
    <div className={`pt-24 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer; 