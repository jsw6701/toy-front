
import React, { useState, useRef, useEffect } from "react";
import { Post } from "@/types/post";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { format } from "date-fns";

interface ExpandingCardProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

const ExpandingCard: React.FC<ExpandingCardProps> = ({ post, isOpen, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Start expanding after a brief delay to allow for DOM positioning
      const timer = setTimeout(() => {
        setExpanded(true);
      }, 50);

      // Set animation complete to show content with fade-in effect
      const contentTimer = setTimeout(() => {
        setAnimationComplete(true);
      }, 500);

      return () => {
        clearTimeout(timer);
        clearTimeout(contentTimer);
      };
    } else {
      setAnimationComplete(false);
      setExpanded(false);
    }
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM dd, yyyy");
    } catch (error) {
      return "Unknown date";
    }
  };

  const handleViewFullPost = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
      }`}
    >
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-500 ${
          expanded ? "opacity-80" : "opacity-0"
        }`} 
        onClick={onClose}
      />

      <div
        ref={cardRef}
        className={`card-border bg-post-darker fixed z-50 overflow-hidden transition-all duration-500 ease-out ${
          expanded 
            ? "w-[90%] max-w-3xl h-[80vh] rounded-xl shadow-2xl" 
            : "w-[300px] h-[200px] rounded-xl"
        }`}
        style={{
          transformOrigin: "center"
        }}
      >
        {/* Close button */}
        <button 
          className={`absolute top-4 right-4 z-10 rounded-full bg-post-blue p-2 hover:bg-post-blue/80 transition-all duration-300 ${
            animationComplete ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        >
          <X size={18} className="text-white" />
        </button>

        {/* Content */}
        <div 
          className={`p-8 h-full overflow-y-auto transition-opacity duration-300 ${
            animationComplete ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-4 opacity-80 text-xs font-medium tracking-wider uppercase text-post-blue">
            {post.creatorCd}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            <span className="text-post-yellow neon-text">{post.title}</span>
          </h2>
          
          <div className="w-full h-[2px] bg-gradient-post opacity-50 my-6"></div>
          
          <div className="text-foreground leading-relaxed mb-8 max-h-[40vh] overflow-y-auto pr-2">
            {post.content}
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-post-blue/20">
            <span className="text-sm text-muted-foreground">
              {formatDate(post.createdAt)}
            </span>
            
            <button 
              onClick={handleViewFullPost}
              className="flex items-center gap-2 text-post-yellow hover:text-white neon-text transition-colors group"
            >
              <span>View full post</span>
              <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandingCard;
