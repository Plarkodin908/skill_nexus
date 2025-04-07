
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
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
            alt="Mobile app preview showing learning dashboard on smartphone"
            className="rounded-2xl shadow-2xl mx-auto max-w-xs md:max-w-sm relative w-full h-auto"
            width="500"
            height="700"
            loading="lazy"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 rounded-2xl flex items-center justify-center">
            <div className="bg-gray-800/90 px-6 py-3 rounded-full text-gray-300 font-bold">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
