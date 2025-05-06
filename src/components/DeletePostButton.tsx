
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
import { trash2 as TrashIcon } from "lucide-react";

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
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/posts");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete Post
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-post-darker border-post-blue/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete the post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-post-blue/30 text-white hover:bg-post-dark">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostButton;
