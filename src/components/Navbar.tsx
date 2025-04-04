import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, User, Menu, X, CheckCircle2 } from "lucide-react";
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
  const isVerified = user?.verificationStatus === "verified";
  const location = useLocation();

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
  return;
};
export default Navbar;