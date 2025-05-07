
import { Post } from "@/types/post";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Edit, Trash2, Lock, LockOpen } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleDoor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={`post-card group transition-all duration-500 ${isOpen ? 'door-open' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: isHovered ? "0 20px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(37, 99, 235, 0.3)" : "0 10px 20px rgba(0, 0, 0, 0.2)"
      }}
    >
      <div className="door-left"></div>
      <div className="door-right"></div>
      
      <div className="p-6 relative flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{post.title}</h3>
          <div className="post-date">{formatDate(post.createdAt)} • {post.creatorCd || "Unknown"}</div>
        </div>
        
        <div className="lock-button" onClick={toggleDoor}>
          {isOpen ? <LockOpen size={16} /> : <Lock size={16} />}
        </div>
      </div>
      
      <div className="post-content">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">
          {post.title}
        </h2>
        
        <p className="mb-6 text-foreground leading-relaxed">
          {post.content}
        </p>
        
        <div className="flex gap-4 mt-6">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }} 
            className="px-4 py-2 bg-primary/80 text-white rounded-lg hover:bg-primary transition-all duration-300"
          >
            View Details
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(e);
            }} 
            className="px-4 py-2 bg-primary/20 text-white rounded-lg hover:bg-primary/40 transition-all duration-300"
          >
            <Edit size={16} className="inline mr-2" />
            Edit
          </button>
          
          <div onClick={(e) => e.stopPropagation()}>
            <DeletePostButton 
              postId={post.id} 
              onSuccess={onPostDeleted}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6">
          <span className="tag">#{post.creatorCd}</span>
          <span className="tag">#post-{post.id}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
