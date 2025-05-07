
import React from "react";
import { Post } from "@/types/post";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PostDetail from "@/components/PostDetailContent";
import { X, FolderOpen, Folder } from "lucide-react";

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
      <TabsList className="mb-4 bg-card/50 border border-primary/20 overflow-x-auto flex-nowrap whitespace-nowrap max-w-full pr-2 transform-style-3d shadow-[0_5px_15px_rgba(0,0,0,0.3)] header-dots">
        <TabsTrigger
          value="home"
          className="data-[state=active]:bg-primary/20 data-[state=active]:text-blue-400 gap-2 transform-style-3d transition-transform hover:translate-z-2"
        >
          {activePostId === null ? (
            <FolderOpen size={16} className="text-blue-400" />
          ) : (
            <Folder size={16} />
          )}
          <span>Home</span>
        </TabsTrigger>
        
        {openPosts.map((post) => (
          <TabsTrigger
            key={post.id}
            value={post.id.toString()}
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-blue-400 relative group transform-style-3d transition-transform hover:translate-z-2"
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
