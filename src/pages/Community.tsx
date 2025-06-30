import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/community/SocialLinks";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Join Our <span className="text-mint">Learning Community</span></h1>
          <p className="text-xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Connect with fellow learners, share your journey, and grow together.
          </p>
        </div>
      </section>
      
      {/* Community Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-forest-light border border-mint/10 card-hover">
              <CardHeader>
                <CardTitle>Connect Your Profiles</CardTitle>
                <CardDescription className="text-white/70">Link your social media accounts for others to find you</CardDescription>
              </CardHeader>
              <CardContent>
                <SocialLinks showAddButton={true} isPremium={true} maxLinks={10} />
                <p className="text-white/60 text-sm mt-4">
                  Free users can add up to 3 social channels. Pro and Educator users get unlimited social links.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-forest-light border border-mint/10 card-hover">
              <CardHeader>
                <CardTitle>Forums & Study Groups</CardTitle>
                <CardDescription className="text-white/70">Discuss topics and form study groups</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Join subject-specific forums, create or join study groups to collaborate with other learners.
                </p>
                <Button 
                  className="w-full bg-mint text-forest hover:bg-mint/90"
                  onClick={() => navigate("/marketplace")}
                >
                  Browse Forums
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-forest-light border border-mint/10 card-hover">
              <CardHeader>
                <CardTitle>Community Events</CardTitle>
                <CardDescription className="text-white/70">Participate in virtual meetups and webinars</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Join live events, workshops, and challenges with our community of learners and educators.
                </p>
                <Button 
                  className="w-full bg-forest border border-mint/20 text-mint hover:bg-forest/80"
                  onClick={() => navigate("/calendar")}
                >
                  See Upcoming Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Activity Section */}
      <section className="py-16 px-4 bg-forest/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Activities</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Track your participation, earn rewards, and contribute to our learning community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-forest-light border border-mint/10 card-hover">
              <CardHeader>
                <CardTitle>Track Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  See your learning journey, courses completed, and community contributions.
                </p>
                <Button 
                  className="w-full bg-forest border border-mint/20 text-mint hover:bg-forest/80"
                  onClick={() => navigate("/activity")}
                >
                  View My Activity
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-forest-light border border-mint/10 card-hover">
              <CardHeader>
                <CardTitle>Earn Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Unlock badges and achievements as you learn and contribute to the community.
                </p>
                <Button 
                  className="w-full bg-forest border border-mint/20 text-mint hover:bg-forest/80"
                  onClick={() => navigate("/achievements")}
                >
                  My Achievements
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-forest-light border border-mint/10 card-hover">
              <CardHeader>
                <CardTitle>Find Study Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Get matched with other learners based on your interests and learning goals.
                </p>
                <Button 
                  className="w-full bg-forest border border-mint/20 text-mint hover:bg-forest/80"
                  onClick={() => navigate("/matches")}
                >
                  Find Matches
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Unlock More Community Features</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Upgrade to Pro Learner or Educator plans to access all premium community features.
          </p>
          <Button 
            className="bg-mint hover:bg-mint/90 text-forest px-8 py-6 text-lg hover-scale"
            onClick={() => navigate("/pricing")}
          >
            View Pricing Plans
          </Button>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Community;
