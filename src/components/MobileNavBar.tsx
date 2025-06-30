
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, BookOpen, ShoppingBag, User, CreditCard, Bell, Settings, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import GeminiChat from "@/components/chat/GeminiChat";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Hide navigation on scroll down for better experience
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  // Only show on mobile devices
  if (window.innerWidth > 768) {
    return null;
  }

  return (
    <>
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
        {isOpen && (
          <div className="bg-black/90 backdrop-blur-md border-t border-white/10 p-3 rounded-t-2xl shadow-lg animate-slide-in-up">
            <div className="flex justify-between items-center mb-3">
              <p className="font-bold text-white">Navigation</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleMenu}
                aria-label="Close menu"
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
                to="/notifications"
                className="flex items-center gap-2 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white"
                onClick={toggleMenu}
              >
                <Bell className="h-4 w-4 text-white" strokeWidth={3} />
                <span>Notifications</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white"
                onClick={toggleMenu}
              >
                <Settings className="h-4 w-4 text-white" strokeWidth={3} />
                <span>Settings</span>
              </Link>
              <Link
                to="/pricing"
                className="flex items-center gap-2 p-3 rounded-lg bg-black/40 hover:bg-white/10 text-white"
                onClick={toggleMenu}
              >
                <CreditCard className="h-4 w-4 text-white" strokeWidth={3} />
                <span>Pricing</span>
              </Link>
            </div>
            
            <div className="mt-3 pt-2 border-t border-white/10">
              <p className="text-xs text-white/60 mb-2">Your Account</p>
              {user ? (
                <div className="flex items-center gap-3 p-2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                    {user.name?.[0] || user.email?.[0] || <User className="h-4 w-4" />}
                  </div>
                  <div className="text-sm">
                    <p className="text-white font-medium">{user.name || "User"}</p>
                    <p className="text-white/60 text-xs">{user.membership || "Free"}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/auth/sign-in" className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/auth/sign-up" className="flex-1">
                    <Button className="w-full" size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-around items-center bg-black/90 backdrop-blur-md border-t border-white/10 p-1 px-[12px] py-[2px]">
          <Link to="/" className="p-1 text-white hover:text-white flex flex-col items-center">
            <Home className="h-4 w-4" strokeWidth={3} />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/marketplace" className="p-1 text-white hover:text-white flex flex-col items-center">
            <ShoppingBag className="h-4 w-4" strokeWidth={3} />
            <span className="text-xs">Market</span>
          </Link>
          <Button
            onClick={toggleMenu}
            className="rounded-full bg-black text-white p-2 -mt-4 shadow-lg hover:bg-black/90 my-0 py-[18px]"
            aria-label="Open menu"
          >
            <Menu strokeWidth={3} className="h-4 w-4 my-[3px] mx-[3px]" />
          </Button>
          <Button
            onClick={toggleChat}
            className="p-1 text-white hover:text-white flex flex-col items-center bg-transparent hover:bg-transparent"
            aria-label="Open AI chat"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={3} />
            <span className="text-xs">AI Chat</span>
          </Button>
          <Link to="/profile" className="p-1 text-white hover:text-white flex flex-col items-center">
            <User className="h-4 w-4" strokeWidth={3} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>

      {/* AI Chat Component */}
      {isChatOpen && <GeminiChat />}
    </>
  );
};

export default MobileNavBar;
