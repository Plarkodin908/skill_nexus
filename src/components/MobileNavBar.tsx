import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, BookOpen, ShoppingBag, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {isOpen && <div className="bg-forest-light border-t border-mint/10 p-4 rounded-t-2xl shadow-lg animate-slide-in-up">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-white">Navigation</p>
            <Button variant="ghost" size="icon" className="text-white hover:bg-mint/10" onClick={toggleMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link to="/" className="flex items-center gap-2 p-3 rounded-lg bg-forest hover:bg-mint/10 text-white" onClick={toggleMenu}>
              <Home className="h-4 w-4 text-mint" />
              <span>Home</span>
            </Link>
            <Link to="/marketplace" className="flex items-center gap-2 p-3 rounded-lg bg-forest hover:bg-mint/10 text-white" onClick={toggleMenu}>
              <ShoppingBag className="h-4 w-4 text-mint" />
              <span>Marketplace</span>
            </Link>
            <Link to="/tutorials" className="flex items-center gap-2 p-3 rounded-lg bg-forest hover:bg-mint/10 text-white" onClick={toggleMenu}>
              <BookOpen className="h-4 w-4 text-mint" />
              <span>Tutorials</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-2 p-3 rounded-lg bg-forest hover:bg-mint/10 text-white" onClick={toggleMenu}>
              <User className="h-4 w-4 text-mint" />
              <span>Profile</span>
            </Link>
            <Link to="/pricing" className="flex items-center gap-2 p-3 rounded-lg bg-forest hover:bg-mint/10 text-white col-span-2" onClick={toggleMenu}>
              <CreditCard className="h-4 w-4 text-mint" />
              <span>Pricing Plans</span>
            </Link>
          </div>
        </div>}
      
      <div className="flex justify-around items-center bg-forest-light border-t border-mint/10 p-2 px-[15px] py-[4px] bg-stone-950">
        <Link to="/" className="p-2 text-white hover:text-mint flex flex-col items-center">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/marketplace" className="p-2 text-white hover:text-mint flex flex-col items-center">
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs mt-1">Market</span>
        </Link>
        <Button className="rounded-full bg-mint text-forest p-3 -mt-5 shadow-lg hover:bg-mint/90" onClick={toggleMenu}>
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/profile" className="p-2 text-white hover:text-mint flex flex-col items-center">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        <Link to="/pricing" className="p-2 text-white hover:text-mint flex flex-col items-center">
          <CreditCard className="h-5 w-5" />
          <span className="text-xs mt-1">Pricing</span>
        </Link>
      </div>
    </div>;
};
export default MobileNavBar;