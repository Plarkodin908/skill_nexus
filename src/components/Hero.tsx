
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, GraduationCap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/loading";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-2 bg-primary-purple/10 w-fit px-4 py-2 rounded-full border border-primary-purple/20 animate-fade-in">
            <GraduationCap className="w-4 h-4 text-primary-purple" aria-hidden="true" />
            <span className="text-primary-purple text-sm font-medium">Learn. Teach. Grow.</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div>Share knowledge</div>
            <div className="words-wrapper h-[1.25em] mt-2 mb-2">
              <div className="word">build skills</div>
              <div className="word">create impact</div>
              <div className="word">expand minds</div>
              <div className="word">inspire others</div>
              <div className="word">build skills</div>
            </div>
            <div>grow together</div>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-md animate-fade-in" style={{ animationDelay: "400ms" }}>
            Connect with experts, learn new skills, and share your knowledge on our community-driven learning platform.
          </p>
          <div className="flex flex-wrap items-center gap-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <Link to="/marketplace">
              <div className="animated-border">
                <Button className="bg-primary-purple hover:bg-primary-purple/90 text-white font-medium px-6 md:px-8 py-5 md:py-6 text-base md:text-lg hover-scale btn-pulse">
                  Explore Courses <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </Link>
            <Link to="/features">
              <Button variant="outline" className="border-primary-purple/20 text-primary-purple hover:bg-primary-purple/10 hover-scale btn-glow">
                How It Works
              </Button>
            </Link>
            <div className="hidden md:block">
              <Loading size="small" />
            </div>
          </div>
        </div>
        <div className="relative animate-fade-in" style={{ animationDelay: "800ms" }}>
          <div className="absolute -inset-0.5 bg-primary-purple/20 rounded-2xl blur opacity-30" aria-hidden="true" />
          <div className="animated-border">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Person working on laptop during online learning session"
              className="relative rounded-2xl shadow-2xl w-full h-auto hover-scale transition-all duration-500"
              width="800"
              height="600"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-dark-purple p-4 md:p-6 rounded-xl shadow-xl border border-primary-purple/10 animate-fade-in hover-scale" style={{ animationDelay: "1000ms" }}>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary-purple" aria-hidden="true" />
              <div>
                <p className="text-primary-purple text-xl md:text-3xl font-bold">500+</p>
                <p className="text-white/80 text-sm md:text-base">Learning resources</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 bg-dark-purple p-4 md:p-6 rounded-xl shadow-xl border border-primary-purple/10 animate-fade-in hover-scale" style={{ animationDelay: "1200ms" }}>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-primary-purple" aria-hidden="true" />
              <div>
                <p className="text-primary-purple text-xl md:text-3xl font-bold">10k+</p>
                <p className="text-white/80 text-sm md:text-base">Active learners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span className="text-white/50 text-sm mb-1">Scroll Down</span>
        <ChevronDown className="h-5 w-5 text-primary-purple" />
      </div>
    </section>
  );
};

export default Hero;
