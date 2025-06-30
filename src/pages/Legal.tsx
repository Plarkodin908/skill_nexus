
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ShieldCheck, FileText, Lock, HelpCircle } from "lucide-react";

const Legal = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Legal Information</h1>
          <p className="text-xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            We're committed to transparency and protecting your rights. Review our legal documentation below.
          </p>
        </div>
      </section>
      
      {/* Legal Tabs */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <Card className="bg-forest-light border border-mint/10 p-6">
            <Tabs defaultValue="terms" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="terms" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>Terms of Service</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="h-5 w-5" />
                    <span>Privacy Policy</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="cookies" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Cookie Policy</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="faq" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
                  <div className="flex flex-col items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    <span>FAQ</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="terms" className="mt-0">
                <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                <div className="space-y-4 text-white/80">
                  <p>Last updated: June 1, 2023</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h3>
                  <p>
                    By accessing or using SKILL SWAP, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h3>
                  <p>
                    When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">3. Content and Conduct</h3>
                  <p>
                    You may post, upload, or share content on SKILL SWAP, provided that you have the necessary rights to do so. You retain ownership of your content, but grant SKILL SWAP a license to use, reproduce, and display it in connection with the service.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">4. Educational Content</h3>
                  <p>
                    SKILL SWAP provides a platform for sharing educational content. We do not guarantee the accuracy, completeness, or usefulness of any information provided by users or content creators.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">5. Termination</h3>
                  <p>
                    We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0">
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                <div className="space-y-4 text-white/80">
                  <p>Last updated: June 1, 2023</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h3>
                  <p>
                    We collect information you provide directly to us when you create an account, update your profile, or communicate with us. This may include your name, email address, and other contact information.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h3>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services, to process transactions, send communications, and for authentication and security purposes.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">3. Information Sharing</h3>
                  <p>
                    We may share your information with third-party service providers who perform services on our behalf, such as payment processing or data analysis. We may also share information if required by law.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h3>
                  <p>
                    We take measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable, and we cannot guarantee the security of your information.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">5. Your Choices</h3>
                  <p>
                    You may update, correct, or delete your account information at any time by logging into your account settings. You may also opt out of receiving promotional communications from us.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="cookies" className="mt-0">
                <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
                <div className="space-y-4 text-white/80">
                  <p>Last updated: June 1, 2023</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">1. What Are Cookies</h3>
                  <p>
                    Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">2. How We Use Cookies</h3>
                  <p>
                    We use cookies to understand how you interact with our website, to remember your preferences, and to improve your overall experience. We also use cookies to help display relevant advertisements and track the performance of our marketing efforts.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">3. Types of Cookies We Use</h3>
                  <p>
                    Essential cookies: These are necessary for the website to function properly.
                    Analytical/performance cookies: These help us understand how visitors interact with our website.
                    Functionality cookies: These allow the website to remember choices you make and provide enhanced features.
                    Targeting cookies: These record your visit to our website, the pages you visit, and the links you follow.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-2">4. Managing Cookies</h3>
                  <p>
                    Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of the website and services we are able to offer.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-0">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {[
                    {
                      question: "How can I delete my account?",
                      answer: "You can delete your account by going to your account settings and selecting the 'Delete Account' option. Please note that this action is irreversible and all your data will be permanently removed."
                    },
                    {
                      question: "What happens to my courses if I cancel my subscription?",
                      answer: "If you cancel your educator subscription, your courses will remain on the platform but will be set to 'draft' mode after 30 days. Learners who have already enrolled will maintain access to the content."
                    },
                    {
                      question: "How do I report inappropriate content?",
                      answer: "You can report inappropriate content by clicking the 'Report' button on any course, comment, or message. Our moderation team reviews all reports within 24 hours."
                    },
                    {
                      question: "Can I transfer my subscription to someone else?",
                      answer: "Subscriptions are non-transferable between accounts. Each user must maintain their own subscription for access to premium features."
                    },
                    {
                      question: "How are disputes between users handled?",
                      answer: "We have a dedicated team to mediate disputes between users. Please contact support@skillswap.com with details of the issue, and we'll work to find a fair resolution."
                    }
                  ].map((faq, index) => (
                    <Card key={index} className="bg-forest border border-mint/10 p-6">
                      <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                      <p className="text-white/70">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 px-4 bg-forest/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Need Further Assistance?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Our legal team is available to answer any questions you may have regarding our terms, privacy practices, or other legal concerns.
          </p>
          <Link to="/company" className="inline-block">
            <button className="bg-mint hover:bg-mint/90 text-forest px-8 py-3 rounded-lg font-medium hover-scale">
              Contact Legal Team
            </button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Legal;
