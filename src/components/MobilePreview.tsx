
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const MobilePreview = () => {
  return (
    <section className="py-20 px-4" id="mobile-app">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-full">
            <Clock className="h-4 w-4 text-gray-400 animate-pulse" aria-hidden="true" />
            <span className="text-gray-300 text-sm font-medium">Coming Soon</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Mobile App Available Soon</h2>
          <p className="text-white/80 max-w-md text-base md:text-lg">
            We're working hard on our mobile app to take your learning experience to the next level. 
            Stay tuned for updates on the launch date. Join our waitlist to be notified first!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gray-700 hover:bg-gray-800 text-white font-medium">
              Join Waitlist
            </Button>
            <Button className="bg-transparent border border-gray-600/20 text-white hover:bg-gray-800/10">
              Get Early Access
            </Button>
          </div>
        </div>
        <div className="relative mt-8 lg:mt-0">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-800 opacity-30 blur-lg" aria-hidden="true"></div>
          <img
            src="/lovable-uploads/43cf2307-26cc-408d-b7ec-b67811205dab.png"
            alt="Person working on laptop with illustrated design"
            className="rounded-2xl shadow-2xl mx-auto w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
