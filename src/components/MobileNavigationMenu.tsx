
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  User, 
  Settings, 
  Palette, 
  Accessibility, 
  Bell,
  Menu,
  X,
  Home,
  BookOpen,
  ShoppingBag,
  CreditCard,
  Users
} from "lucide-react";

const MobileNavigationMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };
  
  const getActiveState = (path: string) => {
    return location.pathname === path ? "active" : undefined;
  };

  return (
    <div className="mobile-nav-menu bg-black/80 backdrop-blur-md">
      {isExpanded && (
        <div className="px-4 py-3 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-medium">Menu</h3>
            <button 
              onClick={toggleMenu}
              className="p-1 rounded-full hover:bg-gray-700/30"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
          
          <div className="input w-full bg-transparent">
            <Link to="/profile" className="value" data-state={getActiveState("/profile")}>
              <User className="text-[#7D8590]" size={15} />
              Public profile
            </Link>
            <Link to="/settings" className="value" data-state={getActiveState("/settings")}>
              <Settings className="text-[#7D8590]" size={15} />
              Account
            </Link>
            <Link to="/settings/appearance" className="value" data-state={getActiveState("/settings/appearance")}>
              <Palette className="text-[#7D8590]" size={15} />
              Appearance
            </Link>
            <Link to="/settings/accessibility" className="value" data-state={getActiveState("/settings/accessibility")}>
              <Accessibility className="text-[#7D8590]" size={15} />
              Accessibility
            </Link>
            <Link to="/notifications" className="value" data-state={getActiveState("/notifications")}>
              <Bell className="text-[#7D8590]" size={15} />
              Notifications
            </Link>
          </div>
        </div>
      )}
      
      <div className="flex justify-around items-center bg-black/80 py-2">
        <Link to="/" className="flex flex-col items-center text-white/70 hover:text-white">
          <Home className="h-5 w-5" strokeWidth={2} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/marketplace" className="flex flex-col items-center text-white/70 hover:text-white">
          <ShoppingBag className="h-5 w-5" strokeWidth={2} />
          <span className="text-xs mt-1">Market</span>
        </Link>
        <button 
          onClick={toggleMenu}
          className="flex flex-col items-center text-white/70 hover:text-white"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
          <span className="text-xs mt-1">Menu</span>
        </button>
        <Link to="/tutorials" className="flex flex-col items-center text-white/70 hover:text-white">
          <BookOpen className="h-5 w-5" strokeWidth={2} />
          <span className="text-xs mt-1">Learn</span>
        </Link>
        <Link to="/community" className="flex flex-col items-center text-white/70 hover:text-white">
          <Users className="h-5 w-5" strokeWidth={2} />
          <span className="text-xs mt-1">Social</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigationMenu;
