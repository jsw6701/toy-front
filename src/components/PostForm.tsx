
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost, updatePost, PostCreateRequestDto, PostUpdateRequestDto } from "@/services/postService";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft } from "lucide-react";
import { Post } from "@/types/post";

interface PostFormProps {
  mode: "create" | "edit";
  existingPost?: Post;
  onSuccess?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ mode, existingPost, onSuccess }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(existingPost?.title || "");
  const [content, setContent] = useState(existingPost?.content || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    
    if (!content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (mode === "create") {
        const postData: PostCreateRequestDto = {
          title,
          content,
          creatorCd: "USER", // You might want to get this from user context or authentication
        };
        
        await createPost(postData);
        setTitle("");
        setContent("");
      } else if (mode === "edit" && existingPost) {
        const postData: PostUpdateRequestDto = {
          postId: existingPost.id,
          title,
          content,
          updaterCd: "USER", // You might want to get this from user context or authentication
        };
        
        await updatePost(postData);
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/posts");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 relative z-10">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 mb-8 hover:bg-post-darker/80 text-white"
        onClick={() => navigate("/posts")}
      >
        <ArrowLeft size={16} />
        Back to posts
      </Button>

      <form onSubmit={handleSubmit} className="space-y-6 card-border p-8 rounded-xl shadow-md animate-scale-in">
        <h2 className="text-2xl font-bold mb-6 text-post-yellow neon-text">
          {mode === "create" ? "Create New Post" : "Edit Post"}
        </h2>
        
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-white">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-post-darker border-post-blue/30 text-white placeholder:text-gray-500"
            placeholder="Enter post title"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-white">
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] bg-post-darker border-post-blue/30 text-white placeholder:text-gray-500"
            placeholder="Enter post content"
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/posts")}
            className="border-post-blue/50 text-white hover:bg-post-darker/80"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-post-yellow text-post-dark hover:bg-post-yellow/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Processing..."
            ) : mode === "create" ? (
              "Create Post"
            ) : (
              "Update Post"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
