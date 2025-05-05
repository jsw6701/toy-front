
import { Post } from "@/types/post";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";
import ExpandingCard from "./ExpandingCard";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <div 
        className="post-card group cursor-pointer glow-effect" 
        onClick={handleClick}
      >
        <div className="post-card-content relative overflow-hidden">
          <div className="mb-4 opacity-80 text-xs font-medium tracking-wider uppercase text-post-blue">
            {post.creatorCd}
          </div>
          <h3 className="post-title text-xl font-medium transition-all duration-300 group-hover:text-post-yellow group-hover:neon-text text-white">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 line-clamp-3 transition-all duration-300">
            {post.content}
          </p>
          <div className="flex justify-between items-center">
            <span className="post-date">{formatDate(post.createdAt)}</span>
            <span className="text-post-yellow opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 neon-text">
              <ArrowRight size={18} />
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-post-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>

      <ExpandingCard 
        post={post} 
        isOpen={isExpanded} 
        onClose={handleClose} 
      />
    </>
  );
};

export default PostCard;
