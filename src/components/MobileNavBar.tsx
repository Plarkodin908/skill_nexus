
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, BookOpen, ShoppingBag, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {isOpen && (
        <div className="bg-black/80 border-t border-white/10 p-4 rounded-t-2xl shadow-lg animate-slide-in-up">
          <div className="flex justify-between items-center mb-4">
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
              <BookOpen className="h-4 w-4 text-primary-purple" strokeWidth={3} />
              <span>Tutorials</span>
            </Link>
          </div>
        </div>
      )}
      
      <div className="flex justify-around items-center bg-black/80 border-t border-white/10 p-2 px-[15px] py-[4px]">
        <Link to="/" className="p-2 text-white hover:text-primary-purple flex flex-col items-center">
          <Home className="h-5 w-5" strokeWidth={3} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/marketplace" className="p-2 text-white hover:text-primary-purple flex flex-col items-center">
          <ShoppingBag className="h-5 w-5" strokeWidth={3} />
          <span className="text-xs mt-1">Market</span>
        </Link>
        <Button
          onClick={toggleMenu}
          className="rounded-full bg-primary-purple text-white p-3 -mt-5 shadow-lg hover:bg-primary-purple/90 my-0 py-[22px]"
        >
          <Menu strokeWidth={3} className="h-5 w-5 my-[5px] px-[2px] mx-[5px] py-0" />
        </Button>
        <Link to="/profile" className="p-2 text-white hover:text-primary-purple flex flex-col items-center">
          <User className="h-5 w-5" strokeWidth={3} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        <Link to="/pricing" className="p-2 text-white hover:text-primary-purple flex flex-col items-center">
          <CreditCard className="h-5 w-5" strokeWidth={3} />
          <span className="text-xs mt-1">Pricing</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavBar;
