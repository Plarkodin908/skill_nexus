
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Bell, User, Menu, X, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import VerifiedBadge from "./profile/VerifiedBadge";

const Navbar = () => {
  const {
    user,
    signOut
  } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isVerified = user?.verificationStatus === "verified";
  
  return <nav className="skill-exchange-navbar fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img alt="SKILL NEXUS Logo" src="/lovable-uploads/fc36b4c8-69b6-42c9-a569-c1ecaf82ed35.png" className="h-12 w-auto object-scale-down" />
          </Link>
          <span className="skill-exchange-logo text-xl font-bold text-purple-900">SKILL NEXUS</span>
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
          <Link to="/pricing" className="text-white/90 hover:text-light-purple px-3 py-2">
            Pricing
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
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
            
            {user ? <div className="relative group">
                <button className="bg-primary-purple/20 p-2 rounded-full hover:bg-primary-purple/30 transition-colors relative">
                  <User className="h-5 w-5 text-white" />
                  {isVerified && (
                    <div className="absolute -right-1 -bottom-1 bg-forest-light rounded-full p-0.5">
                      <VerifiedBadge size="sm" />
                    </div>
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-forest-light border border-mint/10 hidden group-hover:block">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm border-b border-mint/10 text-white flex items-center">
                      <span>{user.name}</span>
                      {isVerified && <VerifiedBadge size="sm" className="ml-1" />}
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-mint/10">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-white hover:bg-mint/10">Settings</Link>
                    <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-mint/10" onClick={signOut}>
                      Sign out
                    </button>
                  </div>
                </div>
              </div> : <Link to="/auth/sign-in">
                <Button className="primary-button ml-2">
                  Sign In
                </Button>
              </Link>}
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden bg-primary-purple/20 p-2 rounded-full hover:bg-primary-purple/30 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-forest-light border-t border-mint/10 mt-4 animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <div className="space-y-2">
              <Link to="/" className="block p-2 text-white hover:bg-mint/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/marketplace" className="block p-2 text-white hover:bg-mint/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                Market
              </Link>
              <Link to="/dashboard" className="block p-2 text-white hover:bg-mint/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/tutorials" className="block p-2 text-white hover:bg-mint/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                Community
              </Link>
              <Link to="/pricing" className="block p-2 text-white hover:bg-mint/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </Link>
              
              <div className="border-t border-mint/10 pt-2 mt-2">
                {user ? <>
                    <div className="p-2 text-white/70 text-sm flex items-center">
                      Signed in as <span className="font-medium text-white ml-1">{user.name}</span>
                      {isVerified && <VerifiedBadge size="sm" className="ml-1" />}
                    </div>
                    <Link to="/profile" className="block p-2 text-white hover:bg-mint/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/settings" className="block p-2 text-white hover:bg-mint/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Settings
                    </Link>
                    <button className="block w-full text-left p-2 text-white hover:bg-mint/10 rounded-lg" onClick={() => {
                signOut();
                setIsMobileMenuOpen(false);
              }}>
                      Sign out
                    </button>
                  </> : <div className="flex flex-col gap-2">
                    <Link to="/auth/sign-in" className="block p-2 text-center bg-mint text-forest font-medium rounded-lg hover:bg-mint/90" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                    <Link to="/auth/sign-up" className="block p-2 text-center border border-mint/20 text-white rounded-lg hover:bg-mint/10" onClick={() => setIsMobileMenuOpen(false)}>
                      Create Account
                    </Link>
                  </div>}
              </div>
            </div>
          </div>
        </div>}
    </nav>;
};
export default Navbar;
