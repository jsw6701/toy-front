
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder, FolderOpen, ChevronDown, ChevronUp } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden relative perspective-1000">
      <div className="absolute inset-0 grid-bg opacity-20 rotate-3d"></div>
      
      {/* Main Header Area */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="bg-card/80 rounded-xl border border-primary/30 shadow-[0_5px_20px_rgba(0,0,0,0.3)] transform-style-3d p-4 mb-6">
          {/* Folder Tabs */}
          <div className="flex items-center mb-4">
            <button 
              className="text-white opacity-70 hover:opacity-100 transition-opacity mr-3"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => {
                setActiveTab(value);
                if (value === "posts") {
                  navigate("/posts");
                }
              }}
              className="transition-all duration-300"
            >
              <TabsList className="bg-primary/10 border border-primary/20 p-1 h-auto">
                <TabsTrigger 
                  value="posts" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary/30 px-4 py-2 text-sm"
                >
                  {activeTab === "posts" ? 
                    <FolderOpen size={18} className="text-blue-400" /> : 
                    <Folder size={18} />
                  }
                  <span>Posts</span>
                </TabsTrigger>
                
                {/* Additional tabs can be added here for future extensibility */}
              </TabsList>
            </Tabs>
            
            {/* Menu bar for additional options */}
            <div className="ml-auto">
              <Menubar className="bg-transparent border-0 p-0">
                <MenubarMenu>
                  <MenubarTrigger className="font-normal text-white opacity-70 hover:opacity-100 hover:bg-primary/20 data-[state=open]:bg-primary/30">
                    Options
                  </MenubarTrigger>
                  <MenubarContent className="bg-card border-primary/30">
                    <MenubarItem 
                      className="cursor-pointer"
                      onClick={() => navigate("/post/create")}
                    >
                      New Post
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem 
                      className="cursor-pointer"
                      onClick={() => window.location.reload()}
                    >
                      Refresh
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
          
          {/* Navigation Sub-menu */}
          {expanded && (
            <div className="animate-fade-in pt-2 pb-2 border-t border-primary/20">
              <NavigationMenu className="max-w-none justify-start">
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-primary/20 text-white font-normal px-3 py-1.5 h-auto">
                      View
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-card border-primary/30">
                      <ul className="grid w-48 p-2 gap-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <button className="w-full text-left rounded p-2 hover:bg-primary/20 text-sm">
                              Grid View
                            </button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <button className="w-full text-left rounded p-2 hover:bg-primary/20 text-sm">
                              List View
                            </button>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-primary/20 text-white font-normal px-3 py-1.5 h-auto">
                      Sort
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-card border-primary/30">
                      <ul className="grid w-48 p-2 gap-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <button className="w-full text-left rounded p-2 hover:bg-primary/20 text-sm">
                              Newest First
                            </button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <button className="w-full text-left rounded p-2 hover:bg-primary/20 text-sm">
                              Oldest First
                            </button>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
        </div>
        
        {/* Main Content Area */}
        <div className="transform-style-3d">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
