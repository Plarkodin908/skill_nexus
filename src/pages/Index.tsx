
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEO/SEOHead";
import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import { useAuth } from "@/contexts/AuthContext";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 -z-10">
        <img 
          src="/lovable-uploads/7fa67612-a8dd-4f50-bb04-411ef3855c5c.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-black/95"></div>
      </div>
      
      <SEOHead 
        title="Skill Nexus - Community-Driven Learning Platform" 
        description="Exchange skills that match your coding success with ease using our innovative learning marketplace." 
      />
      
      <SchemaMarkup 
        type="website" 
        data={{
          "name": "Skill Nexus",
          "url": "https://skillnexus.example.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://skillnexus.example.com/marketplace?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }} 
      />
      
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* Feature Highlights */}
        <section className="py-12 px-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Learn, Share, and Grow Together</h2>
                <p className="text-white/70">
                  Our platform facilitates knowledge exchange and skill development through
                  a community-driven approach, connecting learners with expert educators.
                </p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Access to high-quality courses and resources
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Connect with industry professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Track your progress with innovative tools
                  </li>
                </ul>
              </div>
              
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                
              </div>
            </div>
          </div>
        </section>
        
        {/* Action Buttons */}
        <section className="py-10 px-4 bg-gray-900/70 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/marketplace">
                <button className="animated-button">
                  <span className="text">Explore Courses</span>
                  <span className="circle"></span>
                  <ArrowRight className="arr-1 h-5 w-5" aria-hidden="true" />
                  <ArrowRight className="arr-2 h-5 w-5" aria-hidden="true" />
                </button>
              </Link>
              <Link to="/tutorials">
                <button className="glow-button">
                  View Tutorials
                </button>
              </Link>
              <Link to="/community">
                <button className="animated-button">
                  <span className="text">Join Community</span>
                  <span className="circle"></span>
                  <ArrowRight className="arr-1 h-5 w-5" aria-hidden="true" />
                  <ArrowRight className="arr-2 h-5 w-5" aria-hidden="true" />
                </button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <Stats />
        
        {/* Features Section */}
        <Features />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
