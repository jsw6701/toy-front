
import { Post } from "@/types/post";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Edit, Trash2 } from "lucide-react";
import ExpandingCard from "./ExpandingCard";
import { useNavigate } from "react-router-dom";
import DeletePostButton from "./DeletePostButton";

interface PostCardProps {
  post: Post;
  onPostDeleted?: () => void;
  onPostClick: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostDeleted, onPostClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Unknown date";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPostClick(post);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/post/edit/${post.id}`);
  };

  return (
    <>
      <div 
        className="post-card group cursor-pointer glow-effect transform transition-all duration-500 hover:-translate-y-2 hover:rotate-y-3 relative"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? "0 20px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(30, 174, 219, 0.3)" : "0 10px 20px rgba(0, 0, 0, 0.2)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#324da0]/10 to-[#1EAEDB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl transform -translate-z-1"></div>
        
        <div className="post-card-content relative overflow-hidden">
          <div className="mb-4 opacity-80 text-xs font-medium tracking-wider uppercase text-post-blue">
            {post.creatorCd}
          </div>
          <h3 className="post-title text-xl font-medium transition-all duration-300 group-hover:text-post-yellow group-hover:neon-text text-white transform group-hover:translate-z-2">
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
          
          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-z-2">
            <button 
              onClick={handleEdit} 
              className="p-1.5 rounded-full bg-post-blue/20 text-post-blue hover:bg-post-blue/30 transition-colors"
            >
              <Edit size={16} />
            </button>
            
            <div onClick={(e) => e.stopPropagation()}>
              <DeletePostButton 
                postId={post.id} 
                onSuccess={onPostDeleted}
              />
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-post-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
