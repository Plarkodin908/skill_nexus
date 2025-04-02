
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Star, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="skill-exchange-theme min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 animate-fade-up">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              Skill Exchange <br/>
              <span className="text-pink-accent">Printage</span> 3.0
            </h1>
            <p className="text-lg text-white/80">
              Exchange skills that match your coding success <br/>
              with ease using Printage technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="primary-button flex items-center gap-2 py-6">
                <span>Start Free</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link to="/tutorials">
                <Button variant="outline" className="outline-button py-6">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="skill-card p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">Project Speed</h3>
                  <div className="text-xs text-white/70">01.3</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-pink-accent">4.1</div>
                  <div className="bg-primary-purple/20 p-1 px-2 rounded">
                    <span className="text-xs">Design flow</span>
                  </div>
                </div>
              </div>
              
              <div className="skill-card p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">Match Rate</h3>
                  <div className="text-xs text-white/70">03.67</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-pink-accent">2.2</div>
                  <div className="bg-primary-purple/20 p-1 px-2 rounded">
                    <span className="text-xs">Average</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side cards */}
          <div className="relative">
            {/* Main feature card */}
            <div className="skill-card p-5 rounded-2xl max-w-md mx-auto">
              <div className="absolute -top-6 -left-6 bg-pink-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">+</div>
              
              <div className="flex gap-3 mb-4">
                <img src="/lovable-uploads/971a0525-9509-4c96-9f90-66e481b188bc.png" alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold">Designer</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-2">Skill <br/>Print Expert</h2>
              <p className="text-sm text-white/70 mb-3">Professional UI/UX Designer with 5+ years experience creating intuitive interfaces</p>
              
              <div className="flex items-start gap-2">
                <img src="/lovable-uploads/971a0525-9509-4c96-9f90-66e481b188bc.png" alt="User" className="w-8 h-8 rounded-full object-cover" />
                <div className="bg-primary-purple/20 rounded-lg p-2 text-xs">
                  <p className="font-medium">Sophie Lee</p>
                  <p className="text-white/70">Senior Designer</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between gap-3">
                <button className="w-1/2 bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-lg text-white font-medium text-sm">Message</button>
                <button className="w-1/2 bg-pink-accent hover:bg-pink-accent/90 transition-colors py-2 rounded-lg text-white font-medium text-sm">Join Guide</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service hubs section */}
        <section className="mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Service Hubs</h2>
            <Link to="/marketplace" className="text-light-purple hover:underline">
              Explore
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Figma Wizz', 'Code Coach', 'Data Pro Analyst', 'Dev', 'Expert Team Coach'].map((name, index) => (
              <div key={index} className="skill-card p-4 flex flex-col items-center text-center">
                <div className="profile-bubble mb-3">
                  {name.slice(0, 1)}
                </div>
                <h3 className="font-medium text-sm">{name}</h3>
                <p className="text-xs text-white/70 mt-1">Professional {index % 2 === 0 ? 'Designer' : 'Developer'}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
