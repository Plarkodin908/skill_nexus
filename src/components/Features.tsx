import React from "react";
import { Star, Award, ShieldCheck, BookOpen, Users, GraduationCap, BarChart, MessageSquare } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
const Features = () => {
  const features = [{
    icon: BookOpen,
    title: "Expert Courses",
    description: "Access high-quality courses created by industry professionals with proven expertise."
  }, {
    icon: Users,
    title: "Community Learning",
    description: "Join a supportive community of learners and mentors who help each other grow."
  }, {
    icon: Award,
    title: "Skill Certification",
    description: "Earn verifiable certificates that showcase your expertise to employers."
  }, {
    icon: GraduationCap,
    title: "Personalized Paths",
    description: "Follow learning paths tailored to your specific career goals and interests."
  }, {
    icon: BarChart,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and achievement badges."
  }, {
    icon: MessageSquare,
    title: "Direct Mentorship",
    description: "Connect directly with experts for personalized guidance and feedback."
  }];
  return <section className="gradient-rain-background py-20 px-4" id="features">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How Skill Nexus Works</h2>
          <p className="text-white/80">Our platform simplifies tech learning and knowledge sharing</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => <ScrollReveal key={index} delay={(index + 1) * 100} direction={index % 3 === 0 ? 'left' : index % 3 === 2 ? 'right' : 'up'}>
              <div className="backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-700/30 h-full transition-all duration-300 hover:transform hover:scale-105 group py-[20px] bg-gray-800">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-gray-700 to-gray-800 group-hover:from-gray-600 group-hover:to-gray-700 transition-all duration-300">
                  {React.createElement(feature.icon, {
                className: "w-6 h-6 text-gray-300 group-hover:text-white transition-all duration-300",
                "aria-hidden": "true"
              })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-300 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">{feature.description}</p>
              </div>
            </ScrollReveal>)}
        </div>
      </div>
    </section>;
};
export default Features;