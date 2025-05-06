
import React from "react";
import PostForm from "@/components/PostForm";
import { Power } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pb-16 bg-post-dark overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      <div className="absolute top-5 right-5 md:top-10 md:right-10">
        <button 
          className="animated-button w-10 h-10 md:w-12 md:h-12"
          onClick={() => navigate("/posts")}
        >
          <Power className="w-5 h-5 md:w-6 md:h-6 text-post-dark" />
        </button>
      </div>
      
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          <span className="text-post-yellow neon-text">Create New Post</span>
        </h1>
        
        <PostForm mode="create" />
      </div>
    </div>
  );
};

export default CreatePost;
