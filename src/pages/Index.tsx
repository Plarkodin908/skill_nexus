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
  const {
    user
  } = useAuth();
  return <div className="skill-exchange-theme min-h-screen">
      <SEOHead title="Skill Nexus - Community-Driven Learning Platform" description="Exchange skills that match your coding success with ease using our innovative learning marketplace." />
      <SchemaMarkup type="website" data={{
      "name": "Skill Nexus",
      "url": "https://skillnexus.example.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://skillnexus.example.com/marketplace?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }} />
      <Navbar />
      
      <main>
        {/* Hero Banner Section */}
        <section className="bg-dark-purple py-12 px-4 rounded-3xl">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  
                  
                </div>
                
                <p className="text-white/80 text-lg">
                  The ultimate platform for exchanging skills and knowledge.
                  Connect with experts, learn from peers, and grow your abilities.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {user ? <Link to="/dashboard">
                      <Button className="bg-primary-purple hover:bg-primary-purple/90 text-white font-medium px-6 py-2.5 text-base">
                        Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link> : <Link to="/auth/sign-up">
                      <Button className="bg-primary-purple hover:bg-primary-purple/90 text-white font-medium px-6 py-2.5 text-base">
                        Start Free <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>}
                  <Link to="/features">
                    <Button variant="outline" className="border-primary-purple/20 text-primary-purple hover:bg-primary-purple/10 font-medium px-6 py-2.5 text-base">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="relative bg-gray-300/20 rounded-xl p-2 shadow-lg">
                  
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature Highlights */}
        <section className="py-12 px-4 bg-dark-purple/90">
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
                    <span className="w-2 h-2 bg-primary-purple rounded-full"></span>
                    Access to high-quality courses and resources
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-purple rounded-full"></span>
                    Connect with industry professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-purple rounded-full"></span>
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
        <section className="py-10 px-4 bg-dark-purple">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/marketplace">
                <Button className="bg-primary-purple/80 hover:bg-primary-purple text-white px-6 py-2.5 rounded-full">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/tutorials">
                <Button className="bg-primary-purple/80 hover:bg-primary-purple text-white px-6 py-2.5 rounded-full">
                  View Tutorials
                </Button>
              </Link>
              <Link to="/community">
                <Button className="bg-primary-purple/80 hover:bg-primary-purple text-white px-6 py-2.5 rounded-full">
                  Join Community
                </Button>
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
    </div>;
};
export default Index;