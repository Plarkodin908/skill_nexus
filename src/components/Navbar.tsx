import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, User as UserIcon, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import VerifiedBadge from "./profile/VerifiedBadge";
import { toast } from "sonner";
const Navbar = () => {
  const {
    user,
    signOut
  } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchResults(false);
    toast.info("Search functionality coming soon!");
  };
  const handleNotificationsClick = () => {
    toast.info("Notification center coming soon!");
  };
  return <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-dark-purple/90 backdrop-blur-lg shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <div className="flex items-center gap-3">
                
                <h1 className="text-xl font-bold text-primary-purple text-fuchsia-100">SKILL <span className="text-white">NEXUS</span></h1>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/marketplace" className="text-white hover:text-primary-purple transition-colors">Marketplace</Link>
              <Link to="/tutorials" className="text-white hover:text-primary-purple transition-colors">Tutorials</Link>
              <Link to="/community" className="text-white hover:text-primary-purple transition-colors">Community</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <input type="text" placeholder="Search..." className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-full focus:outline-none focus:border-primary-purple w-[200px]" />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-white/50" />
              </button>
            </form>
            
            {user ? <>
                <button onClick={handleNotificationsClick} className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
                  <Bell className="h-5 w-5 text-white" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <Link to="/profile" className="flex items-center p-1 rounded-full hover:bg-white/5 transition-colors">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary-purple/30 flex items-center justify-center text-lg font-semibold">
                      {user.name?.[0] || user.email?.[0] || <UserIcon className="h-5 w-5" />}
                    </div>
                    {isVerified && <VerifiedBadge className="absolute -bottom-1 -right-1" />}
                  </div>
                </Link>
              </> : <div className="hidden md:flex items-center space-x-3">
                <Link to="/auth/sign-in">
                  <Button variant="outline" className="border-primary-purple/30 text-primary-purple hover:bg-primary-purple/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/sign-up">
                  <Button className="bg-primary-purple hover:bg-primary-purple/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>}
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full hover:bg-white/5 transition-colors md:hidden">
              {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden py-4 border-t border-white/10 mt-3 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/marketplace" className="text-white hover:text-primary-purple transition-colors">
                Marketplace
              </Link>
              <Link to="/tutorials" className="text-white hover:text-primary-purple transition-colors">
                Tutorials
              </Link>
              <Link to="/community" className="text-white hover:text-primary-purple transition-colors">
                Community
              </Link>
              
              <form onSubmit={handleSearch} className="relative mt-2">
                <input type="text" placeholder="Search..." className="w-full bg-white/5 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-full focus:outline-none focus:border-primary-purple" />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="h-5 w-5 text-white/50" />
                </button>
              </form>
              
              {!user && <div className="flex space-x-2 mt-2">
                  <Link to="/auth/sign-in" className="flex-1">
                    <Button variant="outline" className="w-full border-primary-purple/30 text-primary-purple hover:bg-primary-purple/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth/sign-up" className="flex-1">
                    <Button className="w-full bg-primary-purple hover:bg-primary-purple/90 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;