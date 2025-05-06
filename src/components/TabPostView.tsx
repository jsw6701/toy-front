
import React from "react";
import { Post } from "@/types/post";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PostDetail from "@/components/PostDetailContent";
import { X } from "lucide-react";

interface TabPostViewProps {
  openPosts: Post[];
  activePostId: number | null;
  onTabChange: (postId: number | null) => void;
  onCloseTab: (postId: number) => void;
  onPostDeleted: () => void;
}

const TabPostView: React.FC<TabPostViewProps> = ({
  openPosts,
  activePostId,
  onTabChange,
  onCloseTab,
  onPostDeleted,
}) => {
  if (openPosts.length === 0) return null;

  return (
    <Tabs
      value={activePostId ? activePostId.toString() : "home"}
      onValueChange={(value) => onTabChange(value === "home" ? null : parseInt(value))}
      className="w-full mt-6 perspective-1000"
    >
      <TabsList className="mb-4 bg-post-darker/50 border border-post-blue/20 overflow-x-auto flex-nowrap whitespace-nowrap max-w-full pr-2 transform-style-3d shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
        <TabsTrigger
          value="home"
          className="data-[state=active]:bg-post-blue/20 data-[state=active]:text-post-yellow data-[state=active]:neon-text gap-2 transform-style-3d transition-transform hover:translate-z-2"
        >
          Home
        </TabsTrigger>
        
        {openPosts.map((post) => (
          <TabsTrigger
            key={post.id}
            value={post.id.toString()}
            className="data-[state=active]:bg-post-blue/20 data-[state=active]:text-post-yellow data-[state=active]:neon-text relative group transform-style-3d transition-transform hover:translate-z-2"
          >
            <span className="truncate max-w-[150px] block">{post.title}</span>
            <button
              className="ml-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/20 p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(post.id);
              }}
            >
              <X size={14} />
            </button>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="home" className="mt-0"></TabsContent>
      
      {openPosts.map((post) => (
        <TabsContent
          key={post.id}
          value={post.id.toString()}
          className="mt-0 animate-scale-in"
        >
          <PostDetail post={post} onPostDeleted={onPostDeleted} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabPostView;
