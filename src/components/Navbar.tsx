
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav bg-dark-purple/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img 
            src="/lovable-uploads/aaa9c8ad-47c0-4ec1-b299-8b47f30da290.png" 
            alt="SKILL NEXUS Logo" 
            className="h-10 w-auto animate-fade-in"
          />
          <span className="text-2xl font-bold text-white">SKILL NEXUS</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-white/90 hover:text-primary-purple transition-colors story-link">
            Features
          </Link>
          <Link to="/pricing" className="text-white/90 hover:text-primary-purple transition-colors story-link">
            Pricing
          </Link>
          <Link to="/company" className="text-white/90 hover:text-primary-purple transition-colors story-link">
            Company
          </Link>
          <Link to="/legal" className="text-white/90 hover:text-primary-purple transition-colors story-link">
            Legal
          </Link>
        </div>
        <Link to="/marketplace">
          <Button className="bg-primary-purple hover:bg-primary-purple/90 text-white font-medium hover-scale">
            Explore Courses
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
