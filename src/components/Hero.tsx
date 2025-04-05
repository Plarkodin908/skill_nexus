import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, GraduationCap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
const Hero = () => {
  const {
    user
  } = useAuth();
  return <section className="container mx-auto pt-32 pb-16 px-4 relative py-0 my-0 bg-purple-950">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Unlock Your <span className="text-primary-purple">Potential</span> Through <span className="text-primary-purple">Knowledge</span> Exchange
          </h1>
          
          <p className="text-lg text-white/80 max-w-lg">
            Connect with experts, share your skills, and grow together in our community-driven learning platform.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            {user ? <>
                <Link to="/profile">
                  <Button className="bg-primary-purple hover:bg-primary-purple/90 text-white px-6 py-6">
                    <span>Manage Profile</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button variant="outline" className="border-primary-purple text-primary-purple hover:bg-primary-purple/10 px-6 py-6">
                    <span>Explore Marketplace</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </> : <Link to="/auth/sign-up">
                <Button className="bg-primary-purple hover:bg-primary-purple/90 text-white px-6 py-6">
                  <span>Take the First Step</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>}
          </div>
          
          <div className="flex items-center gap-4 pt-6">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary-purple h-5 w-5" />
              <span>500+ Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-primary-purple h-5 w-5" />
              <span>10k+ Members</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="text-primary-purple h-5 w-5" />
              <span>Expert Instructors</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center animate-fade-in">
          <div className="relative">
            <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-primary-purple/30 to-pink-accent/30 rounded-full blur-3xl"></div>
            <img src="/lovable-uploads/61f28fcb-86e8-4209-8a5c-9863e40384ae.png" alt="Person learning online" className="w-full max-w-md mx-auto relative z-10" />
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex justify-center">
        <a href="#features" className="flex flex-col items-center text-white/60 hover:text-primary-purple transition-colors">
          <span className="text-sm mb-2">Explore More</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>;
};
export default Hero;