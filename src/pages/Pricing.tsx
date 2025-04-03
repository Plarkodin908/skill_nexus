
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { PlanFeature, PlanType } from "@/components/pricing/types";
import PricingHeader from "@/components/pricing/PricingHeader";
import PlansGrid from "@/components/pricing/PlansGrid";
import FeatureComparison from "@/components/pricing/FeatureComparison";
import FaqSection from "@/components/pricing/FaqSection";
import ContactCta from "@/components/pricing/ContactCta";

const Pricing = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("Free"); // In real app, this would come from user context
  
  // Define all features with their availability for each plan
  const allFeatures: PlanFeature[] = [
    { name: "Access to free courses created by Educators", free: true, lite: true, pro: true, educator: true },
    { name: "Basic community features (forums, discussions)", free: true, lite: true, pro: true, educator: true },
    { name: "Limited messaging (5 messages per day)", free: true, lite: false, pro: false, educator: false, description: "Send up to 5 messages per day to other users" },
    { name: "Unlimited messaging", free: false, lite: true, pro: true, educator: true, description: "Connect freely with other users" },
    { name: "View public tutorials and resources", free: true, lite: true, pro: true, educator: true },
    { name: "Access to select premium courses", free: false, lite: true, pro: false, educator: false, description: "A curated selection of paid courses" },
    { name: "Unlimited course access", free: false, lite: false, pro: true, educator: true, description: "Full access to all courses, including premium content" },
    { name: "Basic dashboard", free: true, lite: false, pro: false, educator: false, description: "Overview of enrolled courses, progress tracking, and weekly activity summaries" },
    { name: "Enhanced dashboard", free: false, lite: true, pro: false, educator: false, description: "Basic progress tracking with visual indicators and goal setting" },
    { name: "Advanced dashboard", free: false, lite: false, pro: true, educator: false, description: "Detailed analytics, custom learning paths, and exportable reports" },
    { name: "Educator dashboard", free: false, lite: false, pro: false, educator: true, description: "Course performance analytics, revenue tracking, and promotional tools" },
    { name: "Ad-free experience", free: false, lite: true, pro: true, educator: true },
    { name: "Social channels", free: true, lite: true, pro: true, educator: true, description: "Free: join up to 10 communities. Paid: unlimited" },
    { name: "Skill badges", free: true, lite: true, pro: true, educator: true, description: "Earn badges for completing courses and participating in the community" },
    { name: "Priority support", free: false, lite: false, pro: true, educator: false, description: "Faster responses and 24/7 assistance" },
    { name: "Premium support", free: false, lite: false, pro: false, educator: true, description: "Dedicated assistance for educators, available 24/7" },
    { name: "Certifications", free: false, lite: false, pro: true, educator: true, description: "Earn certificates for completed courses" },
    { name: "Gamification", free: false, lite: false, pro: true, educator: true, description: "Earn exclusive badges, points, and leaderboard rankings" },
    { name: "Teaching tools", free: false, lite: false, pro: false, educator: true, description: "Create and publish your own courses, set pricing, and earn 100% revenue" },
    { name: "Custom branding", free: false, lite: false, pro: false, educator: true, description: "Add your logo and branding to your courses" },
  ];

  const plans = [
    {
      name: "Free" as PlanType,
      price: billingPeriod === "monthly" ? "$0" : "$0",
      period: "per month",
      description: "Perfect for beginners who want to explore Skill Nexus.",
      features: allFeatures.filter(feature => feature.free),
      limitations: allFeatures.filter(feature => !feature.free),
      cta: currentPlan === "Free" ? "Current Plan" : "Get Started",
      highlighted: false,
      disabled: currentPlan === "Free",
      tagline: "Start learning today with access to free courses, community support, and tools to track your progress—all at no cost."
    },
    {
      name: "Lite" as PlanType,
      price: billingPeriod === "monthly" ? "$5" : "$55",
      period: billingPeriod === "monthly" ? "per month" : "per year",
      description: "Ideal for casual learners who want more flexibility without committing to a full subscription.",
      features: allFeatures.filter(feature => feature.lite),
      limitations: allFeatures.filter(feature => !feature.lite),
      cta: currentPlan === "Lite" ? "Current Plan" : "Subscribe Now",
      highlighted: false,
      disabled: currentPlan === "Lite",
      tagline: "Get more out of Skill Nexus with unlimited messaging, access to select premium courses, and an enhanced dashboard for just $5/month."
    },
    {
      name: "Pro Learner" as PlanType,
      price: billingPeriod === "monthly" ? "$15" : "$165",
      period: billingPeriod === "monthly" ? "per month" : "per year",
      description: "Ideal for dedicated students who want premium access and advanced tools.",
      features: allFeatures.filter(feature => feature.pro),
      limitations: allFeatures.filter(feature => !feature.pro),
      cta: currentPlan === "Pro Learner" ? "Current Plan" : "Subscribe Now",
      highlighted: true,
      disabled: currentPlan === "Pro Learner",
      tagline: "Take your learning to the next level with unlimited access, personalized tools, and 24/7 support—all for just $15/month."
    },
    {
      name: "Educator" as PlanType,
      price: billingPeriod === "monthly" ? "$39" : "$420",
      period: billingPeriod === "monthly" ? "per month" : "per year",
      description: "For teachers and content creators who want to share their expertise and grow their audience.",
      features: allFeatures.filter(feature => feature.educator),
      limitations: [],
      cta: currentPlan === "Educator" ? "Current Plan" : "Become an Educator",
      highlighted: false,
      disabled: currentPlan === "Educator",
      tagline: "Empower others by creating your own courses and setting your own rules. Build your brand, grow your audience, and earn from your expertise—all with the tools you need to succeed."
    }
  ];

  const faqs = [
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 14-day money-back guarantee if you're not satisfied with your subscription."
    },
    {
      question: "Are there any discounts for students or educators?",
      answer: "Yes, we offer special educational discounts. Contact our support team with your academic credentials to learn more."
    },
    {
      question: "Can I try the paid features before subscribing?",
      answer: "Yes, we offer a 7-day free trial of all our paid plans. No credit card required to start."
    },
    {
      question: "How does revenue sharing work for educators?",
      answer: "Educators receive 100% of the revenue generated from their courses with the Educator plan."
    }
  ];

  const handleSubscribe = (plan: PlanType) => {
    if (plan === currentPlan) {
      toast.info(`You are already subscribed to the ${plan} plan.`);
      return;
    }
    
    if (plan === "Free") {
      toast.success(`You've switched to the ${plan} plan!`);
      setCurrentPlan(plan);
      // In a real app, this would call an API to downgrade the plan
    } else {
      // In a real app, this would redirect to a payment page
      toast.success(`You selected the ${plan} plan!`, {
        description: "Redirecting to payment processing...",
      });
      
      // Simulate payment processing and then update the plan
      setTimeout(() => {
        setCurrentPlan(plan);
        toast.success(`You've successfully subscribed to ${plan}!`);
        navigate("/dashboard");
      }, 2000);
    }
  };

  const getAnnualDiscount = (monthlyPrice: string) => {
    const price = parseInt(monthlyPrice.replace("$", ""));
    if (price === 5) return "5"; // $5 * 12 = $60, annual is $55, save $5
    if (price === 15) return "15"; // $15 * 12 = $180, annual is $165, save $15
    if (price === 39) return "48"; // $39 * 12 = $468, annual is $420, save $48
    return "0";
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <PricingHeader 
        billingPeriod={billingPeriod}
        setBillingPeriod={setBillingPeriod}
        currentPlan={currentPlan}
      />
      
      {/* Pricing Cards */}
      <PlansGrid 
        plans={plans}
        getAnnualDiscount={getAnnualDiscount}
        billingPeriod={billingPeriod}
        currentPlan={currentPlan}
        onSubscribe={handleSubscribe}
      />
      
      {/* Compare Plans Section */}
      <FeatureComparison features={allFeatures} />
      
      {/* FAQ Section */}
      <FaqSection faqs={faqs} />
      
      {/* CTA Section */}
      <ContactCta />
      
      <Footer />
    </main>
  );
};

export default Pricing;
