
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { PlanType } from "@/components/pricing/types";

const PlanDetails = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");
  
  // Plan data - in a real app, this would come from an API or context
  const plans: Record<string, {
    title: PlanType;
    description: string;
    price: { monthly: number; annually: number };
    features: string[];
    bestFor: string;
    tagline: string;
    color: string;
  }> = {
    free: {
      title: "Free",
      description: "Perfect for beginners who want to explore Skill Nexus.",
      price: { monthly: 0, annually: 0 },
      features: [
        "Access to free courses created by Educators",
        "Basic community features (forums, discussions)",
        "Limited messaging (5 messages per day)",
        "View public tutorials and resources",
        "Social channels (up to 10 communities)",
        "Basic dashboard",
        "Skill badges"
      ],
      bestFor: "Beginners who want to explore Skill Nexus",
      tagline: "Start learning today with access to free courses, community support, and tools to track your progress—all at no cost.",
      color: "blue"
    },
    lite: {
      title: "Lite",
      description: "Ideal for casual learners who want more flexibility without committing to a full subscription.",
      price: { monthly: 5, annually: 55 },
      features: [
        "Everything in Free Plan",
        "Unlimited messaging",
        "Access to select premium courses",
        "Enhanced dashboard",
        "Ad-free experience",
        "Unlimited social channels"
      ],
      bestFor: "Casual learners who want more flexibility",
      tagline: "Get more out of Skill Nexus with unlimited messaging, access to select premium courses, and an enhanced dashboard for just $5/month.",
      color: "cyan"
    },
    pro: {
      title: "Pro Learner",
      description: "Ideal for dedicated students who want premium access and advanced tools.",
      price: { monthly: 15, annually: 165 },
      features: [
        "Everything in Lite Plan",
        "Unlimited course access",
        "Priority Support",
        "Advanced dashboard",
        "Certifications",
        "Gamification features"
      ],
      bestFor: "Dedicated students looking to maximize learning",
      tagline: "Take your learning to the next level with unlimited access, personalized tools, and 24/7 support—all for just $15/month.",
      color: "mint"
    },
    educator: {
      title: "Educator",
      description: "For teachers and content creators who want to share their expertise and grow their audience.",
      price: { monthly: 39, annually: 420 },
      features: [
        "Everything in Pro Learner Plan",
        "Teaching Tools",
        "Advanced dashboard for Educators",
        "Custom branding",
        "Premium Support",
        "100% revenue from your courses"
      ],
      bestFor: "Teachers and content creators",
      tagline: "Empower others by creating your own courses and setting your own rules. Build your brand, grow your audience, and earn from your expertise—all with the tools you need to succeed.",
      color: "purple"
    }
  };
  
  const plan = plans[planId as string] || plans.free;
  const discount = Math.round(((plan.price.monthly * 12) - plan.price.annually) / (plan.price.monthly * 12) * 100);
  
  const handleProceedToPayment = () => {
    const price = billingPeriod === "monthly" 
      ? `$${plan.price.monthly}` 
      : `$${plan.price.annually}`;
      
    navigate(`/payment?plan=${plan.title}&price=${price}&period=${billingPeriod}`);
  };
  
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <button 
            onClick={() => navigate("/pricing")} 
            className="flex items-center text-mint hover:text-mint/80 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Plans
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{plan.title} Plan</h1>
          <p className="text-xl text-white/80 mb-6">{plan.description}</p>
          
          <div className="bg-mint/5 border border-mint/10 p-6 rounded-lg mb-12">
            <p className="text-white/90 italic">"{plan.tagline}"</p>
          </div>
          
          <Card className="bg-forest-light border border-mint/10 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Choose Billing Period</CardTitle>
              <CardDescription className="text-white/70">Save with annual billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div 
                  className={`flex-1 p-6 rounded-lg cursor-pointer transition-all border ${
                    billingPeriod === "monthly" 
                      ? "bg-mint/10 border-mint" 
                      : "bg-forest border-mint/20"
                  }`}
                  onClick={() => setBillingPeriod("monthly")}
                >
                  <h3 className="text-xl font-bold mb-2">Monthly</h3>
                  <p className="text-white/70 mb-4">Pay month-to-month</p>
                  <p className="text-3xl font-bold">
                    ${plan.price.monthly}
                    <span className="text-base font-normal text-white/60">/month</span>
                  </p>
                </div>
                
                <div 
                  className={`flex-1 p-6 rounded-lg cursor-pointer transition-all border ${
                    billingPeriod === "annually" 
                      ? "bg-mint/10 border-mint" 
                      : "bg-forest border-mint/20"
                  }`}
                  onClick={() => setBillingPeriod("annually")}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold mb-2">Annual</h3>
                    {discount > 0 && (
                      <span className="bg-mint text-forest text-xs font-bold px-2 py-1 rounded">
                        Save {discount}%
                      </span>
                    )}
                  </div>
                  <p className="text-white/70 mb-4">Pay yearly (best value)</p>
                  <p className="text-3xl font-bold">
                    ${plan.price.annually}
                    <span className="text-base font-normal text-white/60">/year</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Plan Features</h2>
            <div className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-mint/10 p-1 rounded-full">
                    <Check className="h-5 w-5 text-mint" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-forest-light border border-mint/10 p-6 rounded-lg mb-12">
            <h3 className="text-xl font-bold mb-3">Best For</h3>
            <p className="text-white/80">{plan.bestFor}</p>
          </div>
          
          <Button 
            onClick={handleProceedToPayment}
            className="bg-mint hover:bg-mint/90 text-forest text-lg px-8 py-6 w-full md:w-auto hover-scale"
            disabled={plan.title === "Free"}
          >
            {plan.title === "Free" ? (
              "Free Plan - No Payment Required"
            ) : (
              <>
                Proceed to Payment <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default PlanDetails;
