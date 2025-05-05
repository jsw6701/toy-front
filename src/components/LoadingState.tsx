
import React from "react";

const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="post-card animate-pulse-soft">
          <div className="post-card-content">
            <div className="h-4 bg-secondary rounded-full w-3/4 mb-4"></div>
            <div className="h-4 bg-secondary rounded-full w-full mb-2"></div>
            <div className="h-4 bg-secondary rounded-full w-5/6 mb-6"></div>
            <div className="h-3 bg-secondary rounded-full w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
