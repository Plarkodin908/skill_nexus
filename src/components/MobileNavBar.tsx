
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, BookOpen, ShoppingBag, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {isOpen && (
        <div className="bg-black/80 border-t border-white/10 p-3 rounded-t-2xl shadow-lg animate-slide-in-up">
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-white">Navigation</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={toggleMenu}
            >
              <X className="h-5 w-5" strokeWidth={3} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/tutorials"
              className="flex items-center gap-2 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white"
              onClick={toggleMenu}
            >
              <BookOpen className="h-4 w-4 text-white" strokeWidth={3} />
              <span>Tutorials</span>
            </Link>
            <Link
              to="/messages"
              className="flex items-center gap-2 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white"
              onClick={toggleMenu}
            >
              <MessageSquare className="h-4 w-4 text-white" strokeWidth={3} />
              <span>Messages</span>
            </Link>
          </div>
        </div>
      )}
      
      <div className="flex justify-around items-center bg-black/80 border-t border-white/10 p-1 px-[12px] py-[2px]">
        <Link 
          to="/" 
          className={`p-1 flex flex-col items-center ${location.pathname === '/' ? 'text-primary-purple' : 'text-white hover:text-white/80'}`}
        >
          <Home className="h-4 w-4" strokeWidth={3} />
          <span className="text-xs">Home</span>
        </Link>
        <Link 
          to="/marketplace" 
          className={`p-1 flex flex-col items-center ${location.pathname === '/marketplace' ? 'text-primary-purple' : 'text-white hover:text-white/80'}`}
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={3} />
          <span className="text-xs">Market</span>
        </Link>
        <Button
          onClick={toggleMenu}
          className="rounded-full bg-black text-white p-2 -mt-4 shadow-lg hover:bg-black/90 my-0 py-[18px]"
        >
          <Menu strokeWidth={3} className="h-4 w-4 my-[3px] mx-[3px]" />
        </Button>
        <Link 
          to="/profile" 
          className={`p-1 flex flex-col items-center ${location.pathname.includes('/profile') ? 'text-primary-purple' : 'text-white hover:text-white/80'}`}
        >
          <User className="h-4 w-4" strokeWidth={3} />
          <span className="text-xs">Profile</span>
        </Link>
        <Link 
          to="/tutorials" 
          className={`p-1 flex flex-col items-center ${location.pathname === '/tutorials' ? 'text-primary-purple' : 'text-white hover:text-white/80'}`}
        >
          <BookOpen className="h-4 w-4" strokeWidth={3} />
          <span className="text-xs">Learn</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavBar;
