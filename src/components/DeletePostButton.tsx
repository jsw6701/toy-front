
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePost, PostDeleteRequestDto } from "@/services/postService";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Trash2 } from "lucide-react";

interface DeletePostButtonProps {
  postId: number;
  onSuccess?: () => void;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const deleteData: PostDeleteRequestDto = {
        postId,
        updaterCd: "USER", // You might want to get this from user context or authentication
      };
      
      await deletePost(deleteData);
      
      toast.success("게시글이 성공적으로 삭제되었습니다.", {
        position: "bottom-right",
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/posts");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("게시글 삭제에 실패했습니다.", {
        position: "bottom-right",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          className="h-10 relative overflow-hidden border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] z-10 before:content-[''] before:absolute before:-z-10 before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:to-red-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity flex items-center"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card border-primary/30 shadow-[0_0_25px_rgba(37,99,235,0.3)] transform transition-all">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete the post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-primary/30 text-white hover:bg-secondary transform transition-all hover:shadow-[0_0_10px_rgba(37,99,235,0.3)]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 h-10 text-white hover:bg-red-600 transform transition-all hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostButton;
