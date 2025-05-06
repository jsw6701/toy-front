
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Clock, User, Power, Edit } from "lucide-react";
import { fetchPostDetail } from "@/services/postService";
import { Post } from "@/types/post";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import DeletePostButton from "@/components/DeletePostButton";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPostDetail = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const postId = parseInt(id, 10);
        const data = await fetchPostDetail(postId);
        setPost(data);
        toast("포스트 로드 완료", {
          description: "포스트 상세 내용을 불러왔습니다.",
          position: "bottom-right"
        });
      } catch (error) {
        console.error("Failed to load post detail:", error);
        uiToast({
          title: "Error",
          description: "Failed to load post details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPostDetail();
  }, [id, uiToast]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM dd, yyyy");
    } catch (error) {
      return "Unknown date";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-post-dark relative perspective-1000">
        <div className="absolute inset-0 grid-bg opacity-20 rotate-3d"></div>
        <div className="animate-pulse space-y-8 max-w-3xl w-full transform-style-3d">
          <div className="h-10 bg-post-darker rounded-full w-3/6 mx-auto transform translate-z-10"></div>
          <div className="h-64 bg-post-darker rounded-xl w-full transform translate-z-20 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"></div>
          <div className="space-y-4 transform translate-z-5">
            <div className="h-4 bg-post-darker rounded-full w-full"></div>
            <div className="h-4 bg-post-darker rounded-full w-5/6"></div>
            <div className="h-4 bg-post-darker rounded-full w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-post-dark relative perspective-1000">
        <div className="absolute inset-0 grid-bg opacity-20 rotate-3d"></div>
        <h2 className="text-2xl font-bold text-white">Post not found</h2>
        <p className="text-muted-foreground">The post you're looking for doesn't exist or has been removed.</p>
        <Button 
          className="mt-6 flex items-center gap-2 bg-post-yellow text-post-dark hover:bg-post-yellow/90 shadow-[0_0_15px_rgba(255,185,33,0.3)] hover:shadow-[0_0_20px_rgba(255,185,33,0.5)] transform transition-all duration-300"
          onClick={() => navigate("/posts")}
        >
          <ArrowLeft size={16} />
          Back to posts
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-post-dark relative perspective-1000">
      <div className="absolute inset-0 grid-bg opacity-20 rotate-3d"></div>
      
      <div className="absolute top-5 right-5 md:top-10 md:right-10">
        <button 
          className="animated-button w-10 h-10 md:w-12 md:h-12 z-10 transform hover:rotate-12 transition-all duration-300"
          onClick={() => navigate("/posts")}
        >
          <Power className="w-5 h-5 md:w-6 md:h-6 text-post-dark" />
        </button>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4 py-12 relative z-10 transform-style-3d">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-8 hover:bg-post-darker/80 text-white transform transition-all duration-300 hover:-translate-y-1"
          onClick={() => navigate("/posts")}
        >
          <ArrowLeft size={16} />
          Back to posts
        </Button>
        
        <div className="animate-fade-in space-y-8 transform-style-3d">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white transform translate-z-10">
            <span className="text-post-yellow neon-text">{post.title}</span>
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground transform translate-z-5">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{post.creatorCd || "Unknown"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.createdAt ? formatDate(post.createdAt) : "Unknown date"}</span>
            </div>
          </div>
          
          <div className="flex gap-4 transform translate-z-15">
            <Button 
              onClick={() => navigate(`/post/edit/${post.id}`)}
              className="bg-post-blue text-white hover:bg-post-blue/80 shadow-[0_0_15px_rgba(30,174,219,0.3)] hover:shadow-[0_0_20px_rgba(30,174,219,0.5)] transform transition-all duration-300 hover:scale-105"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Post
            </Button>
            
            <DeletePostButton postId={post.id} />
          </div>
          
          <div className="w-full h-[2px] bg-gradient-post opacity-50 my-8 transform translate-z-3 hover:opacity-80 transition-opacity duration-300"></div>
          
          <article className="card-border p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2),_0_0_30px_rgba(30,174,219,0.2)] animate-scale-in transform translate-z-20 hover:translate-z-25 transition-transform duration-500">
            <p className="text-foreground leading-relaxed">
              {post.content}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
