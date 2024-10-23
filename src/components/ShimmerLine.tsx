import React from 'react';

interface ShimmerLineProps {
  className?: string; 
}

const ShimmerLine: React.FC<ShimmerLineProps> = ({ className = '' }) => {
  return (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`}></div>
  );
};

export default ShimmerLine;
