
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import LearningFacts from "@/components/LearningFacts";
import MobilePreview from "@/components/MobilePreview";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Skill Nexus - Community-Driven Learning Platform</title>
        <meta name="description" content="Share knowledge, build skills, and grow together on our community-driven learning platform. Connect with experts and learn new skills today." />
        <meta name="keywords" content="learning platform, skill sharing, online courses, education, community learning, skill development, online education, mentorship" />
        <link rel="canonical" href="https://skillnexus.example.com" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="Skill Nexus Team" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Skill Nexus - Learn and Share Skills" />
        <meta property="og:description" content="Community-driven learning platform where you can share knowledge and build skills." />
        <meta property="og:image" content="https://skillnexus.example.com/og-image.svg" />
        <meta property="og:url" content="https://skillnexus.example.com" />
        <meta property="og:site_name" content="Skill Nexus" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Skill Nexus - Learn and Share Skills" />
        <meta name="twitter:description" content="Community-driven learning platform for skill development and knowledge sharing." />
        <meta name="twitter:image" content="https://skillnexus.example.com/og-image.svg" />
        
        {/* Mobile Specifics */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#052e16" />
      </Helmet>
      
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <LearningFacts />
      <MobilePreview />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;
