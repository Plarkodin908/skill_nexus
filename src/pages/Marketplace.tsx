
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
import CourseCard from "@/components/profile/CourseCard";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Meeting your Colleagues",
      author: "Sarah Johnson",
      likes: 156,
      comments: 6,
      views: 40,
      imagePath: "linear-gradient(#e66465, #9198e5)"
    },
    {
      id: 2,
      title: "React Fundamentals",
      author: "Michael Chen",
      likes: 213,
      comments: 8,
      views: 55,
      imagePath: "linear-gradient(#7eb0e6, #91e5e1)"
    },
    {
      id: 3,
      title: "UX Design Principles",
      author: "Alex Morgan",
      likes: 98,
      comments: 4,
      views: 32,
      imagePath: "linear-gradient(#e6da7e, #91e59c)"
    }
  ];
  
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
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <MarketplaceHeader />
        <div className="flex gap-2 mt-4 md:mt-0">
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="flex justify-center">
              <CourseCard 
                id={course.id}
                title={course.title}
                author={course.author}
                likes={course.likes}
                comments={course.comments}
                views={course.views}
                imagePath={course.imagePath}
              />
            </div>
          ))
        ) : (
          <EmptyCoursesState />
        )}
      </div>
    </div>
  );
};

export default Marketplace;
