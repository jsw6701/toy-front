
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-10 mb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-post flex items-center justify-center shadow-lg mb-4 animate-float">
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
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-post-violet to-post-blue bg-clip-text text-transparent">
              Vibrant Post Gallery
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover and explore the latest posts, curated and presented in a beautiful
            design-forward experience.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
