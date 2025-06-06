
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookText, FileText, Video } from "lucide-react";
import { useState, useRef } from "react";
import EmptyState from "./EmptyState";
import { toast } from "sonner";
import BackpackIcon from "../icons/BackpackIcon";

interface TabsSectionProps {
  onResourceAdd: (type: string) => void;
}

interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  date: string;
  bookmarked: boolean;
}

const TabsSection = ({ onResourceAdd }: TabsSectionProps) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [bookmarkedResources, setBookmarkedResources] = useState<Resource[]>([]);
  const bookmarkRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Toggle bookmark status for a resource
  const toggleBookmark = (id: string, type: string) => {
    // Update the resource in the original arrays
    setResources(prevResources => 
      prevResources.map(resource => 
        resource.id === id 
          ? { ...resource, bookmarked: !resource.bookmarked } 
          : resource
      )
    );
    
    // Get the resource that was toggled
    const resource = resources.find(r => r.id === id);
    
    if (resource) {
      // Add animation to the button when clicked
      const buttonRef = bookmarkRefs.current[id];
      if (buttonRef) {
        buttonRef.classList.add("bookmark-animate");
        setTimeout(() => {
          buttonRef.classList.remove("bookmark-animate");
        }, 300);
      }

      if (!resource.bookmarked) {
        // If it wasn't bookmarked before, add to bookmarks
        setBookmarkedResources(prev => [...prev, { ...resource, bookmarked: true }]);
        toast.success(`Added to backpack!`);
      } else {
        // If it was already bookmarked, remove from bookmarks
        setBookmarkedResources(prev => prev.filter(r => r.id !== id));
        toast.info(`Removed from backpack`);
      }
    }
  };

  // Empty states for different resource types
  const emptyStates = {
    posts: {
      icon: <BookText className="h-16 w-16 text-mint mx-auto mb-4 opacity-80" />,
      title: "No Posts Available Yet",
      description: "Be the first to share your knowledge with step-by-step posts."
    },
    articles: {
      icon: <FileText className="h-16 w-16 text-mint mx-auto mb-4 opacity-80" />,
      title: "No Articles Available Yet",
      description: "Share your expertise by writing insightful articles on your favorite topics."
    },
    videos: {
      icon: <Video className="h-16 w-16 text-mint mx-auto mb-4 opacity-80" />,
      title: "No Video Posts Yet",
      description: "Create engaging video content to help others learn more effectively."
    },
    bookmarks: {
      icon: <BackpackIcon className="h-16 w-16 text-mint mx-auto mb-4 opacity-80" />,
      title: "Your Backpack is Empty",
      description: "Save posts, articles, and videos here for quick access later."
    }
  };

  // Check if there are any bookmarked resources
  const hasBookmarks = bookmarkedResources.length > 0;

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="bg-forest border border-mint/10 mb-6">
        <TabsTrigger value="posts" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
          Posts
        </TabsTrigger>
        <TabsTrigger value="articles" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
          Articles
        </TabsTrigger>
        <TabsTrigger value="videos" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
          Video Posts
        </TabsTrigger>
        <TabsTrigger value="bookmarks" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
          Backpack
        </TabsTrigger>
      </TabsList>
      
      {['posts', 'articles', 'videos'].map(tab => (
        <TabsContent key={tab} value={tab} className="mt-0">
          {resources.filter(r => r.type === tab).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.filter(r => r.type === tab).map(resource => (
                <div key={resource.id} className="bg-forest-light rounded-lg p-4 border border-mint/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{resource.title}</h3>
                    <button 
                      ref={el => bookmarkRefs.current[resource.id] = el}
                      onClick={() => toggleBookmark(resource.id, tab)}
                      className="text-mint hover:text-mint/80 transition-colors p-1 rounded-full hover:bg-mint/10"
                    >
                      <BackpackIcon 
                        className="h-5 w-5 transition-transform" 
                        fill={resource.bookmarked}
                      />
                    </button>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{resource.description}</p>
                  <div className="text-xs text-white/50">{resource.date}</div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={emptyStates[tab as keyof typeof emptyStates].icon}
              title={emptyStates[tab as keyof typeof emptyStates].title}
              description={emptyStates[tab as keyof typeof emptyStates].description}
              actionLabel={`Add ${tab.slice(0, -1)}`}
              onAction={() => onResourceAdd(tab)}
            />
          )}
        </TabsContent>
      ))}
      
      <TabsContent value="bookmarks">
        {hasBookmarks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedResources.map(resource => (
              <div key={resource.id} className="bg-forest-light rounded-lg p-4 border border-mint/20">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">{resource.title}</h3>
                  <button 
                    ref={el => bookmarkRefs.current[resource.id] = el}
                    onClick={() => toggleBookmark(resource.id, resource.type)}
                    className="text-mint hover:text-mint/80 transition-colors p-1 rounded-full hover:bg-mint/10"
                  >
                    <BackpackIcon 
                      className="h-5 w-5 transition-transform" 
                      fill={true}
                    />
                  </button>
                </div>
                <p className="text-white/70 text-sm mb-3">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-white/50">{resource.date}</div>
                  <div className="text-xs bg-mint/10 text-mint px-2 py-1 rounded">
                    {resource.type.slice(0, -1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={emptyStates.bookmarks.icon}
            title="Your Backpack is Empty"
            description="Save posts, articles, and videos here for quick access later."
            actionLabel="Browse Content"
            onAction={() => {}} // No specific action for now
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TabsSection;
