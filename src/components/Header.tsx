
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="py-10 md:py-16 mb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="w-[120px] h-[120px] rounded-full bg-primary flex items-center justify-center shadow-lg mb-6 animate-float mx-auto border border-primary relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] bg-white rounded-full z-[1]"></div>
              <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-background rounded-full z-[2]"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Post <span className="text-blue-400">Gallery</span>
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
