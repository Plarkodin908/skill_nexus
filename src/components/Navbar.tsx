import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="skill-exchange-navbar fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png" 
            alt="SKILL NEXUS Logo" 
            className="h-12 w-auto"
          />
          <span className="skill-exchange-logo">SKILL NEXUS</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-white/90 hover:text-light-purple px-3 py-2">
            Home
          </Link>
          <Link to="/marketplace" className="text-white/90 hover:text-light-purple px-3 py-2">
            Market
          </Link>
          <Link to="/dashboard" className="text-white/90 hover:text-light-purple px-3 py-2">
            Dashboard
          </Link>
          <Link to="/tutorials" className="text-white/90 hover:text-light-purple px-3 py-2">
            Community
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="bg-primary-purple/20 p-2 rounded-full hover:bg-primary-purple/30 transition-colors">
              <Search className="h-5 w-5 text-white" />
            </button>
          </div>
          
          <div className="relative">
            <button className="bg-primary-purple/20 p-2 rounded-full hover:bg-primary-purple/30 transition-colors">
              <Bell className="h-5 w-5 text-white" />
            </button>
          </div>
          
          <Link to="/profile">
            <button className="bg-primary-purple/20 p-2 rounded-full hover:bg-primary-purple/30 transition-colors">
              <User className="h-5 w-5 text-white" />
            </button>
          </Link>
          
          <Button className="primary-button ml-2">
            SignUp Free
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
