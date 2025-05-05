
import React from "react";

const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div 
          key={index} 
          className="post-card shimmer opacity-70"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="post-card-content">
            <div className="h-5 bg-post-darker rounded-full w-3/4 mb-4"></div>
            <div className="h-4 bg-post-darker rounded-full w-full mb-2"></div>
            <div className="h-4 bg-post-darker rounded-full w-5/6 mb-2"></div>
            <div className="h-4 bg-post-darker rounded-full w-3/4 mb-6"></div>
            <div className="flex justify-between items-center">
              <div className="h-3 bg-post-darker rounded-full w-1/4"></div>
              <div className="h-3 bg-post-darker rounded-full w-1/6 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
