
import { useState } from "react";
import SearchBar from "@/components/marketplace/SearchBar";
import FilterToggle from "@/components/marketplace/FilterToggle";
import FilterPanel from "@/components/marketplace/FilterPanel";
import CourseTabsSection from "@/components/marketplace/CourseTabsSection";
import EmptyCoursesState from "@/components/marketplace/EmptyCoursesState";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Import } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const searchSuggestions = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Mobile App Development",
    "Machine Learning",
    "JavaScript",
    "Python",
    "React",
  ];
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleImportContent = () => {
    if (user && ["Pro Learner", "Educator"].includes(user.membership)) {
      navigate("/import-content");
    } else {
      toast.info("Importing content requires a Pro Learner membership", {
        description: "Upgrade your plan to unlock this feature",
        action: {
          label: "View Plans",
          onClick: () => navigate("/pricing"),
        },
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <MarketplaceHeader />
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-mint/20 text-white hover:bg-mint/10 flex items-center gap-2"
            onClick={handleImportContent}
          >
            <Import className="h-4 w-4" />
            Import Content
          </Button>
          <Link to="/">
            <Button variant="outline" className="border-mint/20 text-white hover:bg-mint/10 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchSuggestions={searchSuggestions}
        />
        <FilterToggle 
          showFilters={showFilters}
          toggleFilters={toggleFilters}
        />
      </div>
      
      <FilterPanel showFilters={showFilters} />
      
      <CourseTabsSection />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <EmptyCoursesState />
      </div>
    </div>
  );
};

export default Marketplace;
