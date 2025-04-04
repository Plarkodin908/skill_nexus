import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Import components
import UserStatsCard from "@/components/dashboard/UserStatsCard";
import AchievementsCard from "@/components/dashboard/AchievementsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UserPlanCard from "@/components/dashboard/UserPlanCard";
import StatCard from "@/components/dashboard/StatCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { PlanType } from "@/components/pricing/types";

// Define types for our data structures
type UserStat = {
  value: number | string;
  label: string;
};

type Activity = {
  id: number;
  type: string;
  title: string;
  time: string;
};

type Achievement = {
  type: "beginner" | "intermediate" | "advanced" | "expert" | "master" | "legend";
  title: string;
  description: string;
  earned: boolean;
};

// Updated to use PlanType instead of string
type UserPlan = {
  name: PlanType;
  expires: string;
  features: string[];
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample user stats data
  const stats: UserStat[] = [
    { value: 18, label: "Courses" },
    { value: "25h", label: "Learning" },
    { value: 12, label: "Connections" },
    { value: 4, label: "Completed" }
  ];

  // Sample activity data
  const activities: Activity[] = [
    {
      id: 1,
      type: "course",
      title: "Completed JavaScript Fundamentals",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "connection",
      title: "Connected with Sarah Johnson",
      time: "Yesterday"
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned 'Coding Streak' badge",
      time: "3 days ago"
    },
    {
      id: 4,
      type: "course",
      title: "Started React for Beginners",
      time: "1 week ago"
    }
  ];

  // Sample achievements data with correct type values
  const achievements: Achievement[] = [
    {
      type: "beginner", 
      title: "First Steps",
      description: "Complete your first course",
      earned: true
    },
    {
      type: "intermediate", 
      title: "Knowledge Seeker",
      description: "Complete 5 different courses",
      earned: true
    },
    {
      type: "advanced", 
      title: "Skill Master",
      description: "Reach proficiency in any skill",
      earned: false
    },
    {
      type: "expert", 
      title: "Dedicated Learner",
      description: "Spend 50+ hours learning",
      earned: false
    }
  ];

  // Update user plan data with correct PlanType
  const userPlan: UserPlan = {
    name: "Pro Learner",
    expires: "October 15, 2023",
    features: [
      "Unlimited course access",
      "Priority matching",
      "Advanced analytics",
      "Community events"
    ]
  };

  const handleShareProgress = () => {
    toast.success("Progress shared to your network!");
  };

  return (
    <DashboardLayout
      sidebar={
        <>
          <UserStatsCard stats={stats} />
          <UserPlanCard plan={userPlan} />
          <AchievementsCard achievements={achievements} />
        </>
      }
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            icon={BookOpen}
            title="Learning Path"
            description="Continue your personalized learning journey."
            buttonText="Resume Learning"
            href="/tutorials"
          />
          <StatCard
            icon={Users}
            title="Skill Exchange"
            description="Connect with others to share your knowledge."
            buttonText="Find Matches"
            href="/matches"
          />
        </div>

        <div className="card-container">
          <h2 className="text-xl text-white mb-4">Recent Activity</h2>
          <ActivityFeed activities={activities} />
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              className="text-mint border-mint/20 hover:bg-mint/10"
              onClick={handleShareProgress}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Share Progress
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <Link to="/achievements">
            <Button
              variant="outline"
              className="text-mint border-mint/20 hover:bg-mint/10"
            >
              <Award className="w-4 h-4 mr-2" />
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`border border-mint/10 bg-forest-light p-4 text-center rounded-lg ${
                achievement.earned ? "border-mint/30" : "opacity-60"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center badge-${achievement.type}`}
              >
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white">{achievement.title}</h3>
              <p className="text-sm text-white/60">{achievement.description}</p>
              {achievement.earned && (
                <span className="inline-block mt-2 px-2 py-1 bg-mint/10 text-mint text-xs rounded-full">
                  Earned
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
