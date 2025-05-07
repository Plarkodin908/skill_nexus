
import React from "react";
import { Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Skill Nexus transformed my learning experience. The personalized learning paths and expert feedback helped me land my dream job in tech.",
      author: "Sarah Chen",
      role: "Full Stack Developer",
      image: "/lovable-uploads/6a919366-1f11-4890-a656-15f1262cac03.jpg"
    },
    {
      quote: "The community aspect is what sets Skill Nexus apart. I've found mentors and peers who genuinely care about my growth and success.",
      author: "Michael Rodriguez",
      role: "UX/UI Designer",
      image: "/lovable-uploads/44320338-928a-4f87-80c5-b108d09edc5e.png"
    },
    {
      quote: "As both a learner and instructor, I've seen firsthand how Skill Nexus creates meaningful connections between experts and students.",
      author: "Emily Watson",
      role: "Data Science Mentor",
      image: "/lovable-uploads/54ffc2eb-8b8d-4893-beca-68661a996ce4.png"
    }
  ];

  return (
    <section className="gradient-rain-background py-20 px-4">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Community Says</h2>
            <p className="text-white/80">Join thousands of satisfied learners on their journey to success</p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl relative border border-gray-700/30 h-full transition-all duration-300 hover:transform hover:translate-y-[-5px]">
                <Quote className="text-gray-500 w-8 h-8 mb-6" />
                <p className="text-white/90 mb-8 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
