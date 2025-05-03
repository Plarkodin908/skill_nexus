
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const DashboardDemo = () => {
  const dashboardScreenshots = [
    {
      title: "Track Your Progress",
      description: "Monitor your learning journey with detailed analytics and interactive charts",
      image: "/lovable-uploads/43cf2307-26cc-408d-b7ec-b67811205dab.png"
    },
    {
      title: "Earn Achievements",
      description: "Collect badges and certificates as you master new skills and complete courses",
      image: "/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png"
    },
    {
      title: "Connect with Experts",
      description: "Find and collaborate with mentors who can help accelerate your learning",
      image: "/lovable-uploads/7fa67612-a8dd-4f50-bb04-411ef3855c5c.png"
    }
  ];

  return (
    <section className="dashboard-gradient py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful Dashboard Experience</h2>
            <p className="text-white/80 mb-6">See your progress, track achievements, and engage with the community</p>
          </ScrollReveal>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {dashboardScreenshots.map((item, index) => (
            <ScrollReveal 
              key={index} 
              delay={index * 200}
              direction={index % 3 === 0 ? 'left' : index % 3 === 2 ? 'right' : 'up'}
            >
              <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full aspect-video object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <p className="text-white font-medium">{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{item.description}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-2">
              <span>Explore Dashboard</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardDemo;
