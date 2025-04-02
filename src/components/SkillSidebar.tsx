
import { Link, useLocation } from "react-router-dom";
import { Home, Search, MessageSquare, BookOpen, User, Settings } from "lucide-react";

const SkillSidebar = () => {
  const location = useLocation();
  
  const sidebarItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      path: "/"
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: "Explore",
      path: "/marketplace"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Courses",
      path: "/tutorials"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
      path: "/messages"
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      path: "/profile"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/settings"
    }
  ];
  
  return (
    <div className="skill-sidebar">
      <div className="flex flex-col">
        {sidebarItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SkillSidebar;
