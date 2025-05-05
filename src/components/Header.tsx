
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="py-10 md:py-16 mb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-full bg-post-blue flex items-center justify-center shadow-lg mb-6 animate-float mx-auto border border-[#324da0]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Post <span className="text-post-yellow neon-text">Gallery</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-2">
            A beautiful collection of posts designed with modern animations and UI. 
            Explore the gallery to discover more.
          </p>
          <div className="w-20 h-1 bg-gradient-post rounded-full mt-8 mb-4 opacity-70"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
