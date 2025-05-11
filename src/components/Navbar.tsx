
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Bell, User as UserIcon, Menu, X, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import VerifiedBadge from "./profile/VerifiedBadge";
import { toast } from "sonner";
import UserSearch from "./UserSearch";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [secureNavigation, setSecureNavigation] = useState(true);
  const isVerified = user?.verificationStatus === "verified";
  const location = useLocation();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNotificationsClick = () => {
    if (user) {
      // Use Link component navigation instead of direct manipulation
      window.location.href = "/notifications";
    } else {
      toast.info("Please sign in to view notifications");
    }
  };

  const toggleSecureNavigation = () => {
    setSecureNavigation(!secureNavigation);
    toast.success(secureNavigation ? "Standard navigation mode enabled" : "Secure navigation mode enabled");
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900/90 backdrop-blur-lg shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-2 md:py-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <div className="flex items-center gap-3">
                <h1 className="text-lg md:text-xl font-bold text-gray-400 text-gray-100">SKILL <span className="text-white">NEXUS</span></h1>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {/* Navigation items */}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleSecureNavigation} 
              className="p-2 rounded-full hover:bg-white/5 transition-colors relative hidden md:flex" 
              aria-label={secureNavigation ? "Disable secure navigation" : "Enable secure navigation"} 
              title={secureNavigation ? "Secure navigation active" : "Standard navigation"}
            >
              <Shield className={`h-5 w-5 ${secureNavigation ? "text-green-400" : "text-gray-400"}`} />
            </button>

            {/* User Search Component */}
            <UserSearch />
            
            {user ? (
              <>
                <button 
                  onClick={handleNotificationsClick} 
                  className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors relative"
                >
                  <Bell className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <Link to="/profile" className="flex items-center p-1 rounded-full hover:bg-white/5 transition-colors">
                  <div className="relative">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-800/30 flex items-center justify-center text-lg font-semibold">
                      {user.name?.[0] || user.email?.[0] || <UserIcon className="h-4 w-4 md:h-5 md:w-5" />}
                    </div>
                    {isVerified && <VerifiedBadge className="absolute -bottom-1 -right-1" />}
                  </div>
                </Link>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/auth/sign-in">
                  <Button variant="outline" className="border-gray-600/30 text-gray-400 hover:bg-gray-700/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/sign-up">
                  <Button className="bg-gray-700 hover:bg-gray-800/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-1 md:p-2 rounded-full hover:bg-white/5 transition-colors md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/10 mt-2 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/marketplace" className="text-white hover:text-gray-400 transition-colors">
                Marketplace
              </Link>
              <Link to="/tutorials" className="text-white hover:text-gray-400 transition-colors">
                Tutorials
              </Link>
              <Link to="/community" className="text-white hover:text-gray-400 transition-colors">
                Community
              </Link>
              
              <div className="flex items-center justify-between">
                <span className="text-white/80">Secure Navigation</span>
                <button 
                  onClick={toggleSecureNavigation} 
                  className="p-2 rounded-full hover:bg-white/5 transition-colors relative"
                >
                  <Shield className={`h-5 w-5 ${secureNavigation ? "text-green-400" : "text-gray-400"}`} />
                </button>
              </div>
              
              <form className="relative mt-2">
                <div className="w-full bg-white/5 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-full">
                  <UserSearch />
                </div>
              </form>
              
              {!user && (
                <div className="flex space-x-2 mt-2">
                  <Link to="/auth/sign-in" className="flex-1">
                    <Button variant="outline" className="w-full border-gray-600/30 hover:bg-gray-700/10 text-base text-gray-200">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth/sign-up" className="flex-1">
                    <Button className="w-full bg-gray-700 hover:bg-gray-800/90 text-stone-200 text-justify">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
