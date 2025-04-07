
import React from "react";
import { Star, Award, ShieldCheck } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 px-4" id="features">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            How SkillSwap Works
          </h2>
          <p className="text-white/80">Our platform simplifies tech learning and knowledge sharing</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Star,
              title: "Discover Expert Content",
              description: "Explore high-quality courses and resources created by industry professionals and passionate educators."
            },
            {
              icon: Award,
              title: "Learn At Your Own Pace",
              description: "Access structured learning paths and bite-sized lessons that fit into your busy schedule."
            },
            {
              icon: ShieldCheck,
              title: "Share Your Knowledge",
              description: "Create your own courses and tutorials to help others while establishing yourself as an expert."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-900/30 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-800/30">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gray-800">
                {React.createElement(feature.icon, {
                  className: "w-6 h-6 text-gray-400",
                  "aria-hidden": "true"
                })}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-300">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
