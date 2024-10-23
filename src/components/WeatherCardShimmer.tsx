import React from 'react';
import ShimmerLine from './ShimmerLine';

const WeatherCardShimmer: React.FC = () => {
  return (
    <div className="flex flex-col bg-white border shadow-md rounded-lg p-4 md:p-8 gap-4 animate-pulse">
      <div className="flex gap-2 w-full">
        <div className="flex flex-col w-3/6">
          {/* Shimmer for city and date */}
          <ShimmerLine className="w-3/5 h-6" />
          <ShimmerLine className="w-2/5 h-4 mt-2" />

          {/* Shimmer for temperature */}
          <ShimmerLine className="w-4/5 h-8 mt-3" />

          {/* Shimmer for 'Feels like' */}
          <ShimmerLine className="w-3/5 h-4 mt-2" />

          {/* Shimmer for humidity, wind, and pressure */}
          <div className="flex gap-1 mt-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <ShimmerLine className="w-3/5 h-4" />
          </div>
          <div className="flex gap-1 mt-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <ShimmerLine className="w-3/5 h-4" />
          </div>
          <div className="flex gap-1 mt-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <ShimmerLine className="w-3/5 h-4" />
          </div>
        </div>

        {/* Shimmer for right side (image and button) */}
        <div className="flex flex-col items-end w-3/6">
          {/* Shimmer for button */}
          <ShimmerLine className="w-24 h-8 mb-4" />

          {/* Shimmer for image */}
          <div className="w-28 h-28 bg-gray-200 rounded-full"></div>

          {/* Shimmer for condition text */}
          <ShimmerLine className="w-1/2 h-4 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default WeatherCardShimmer;
