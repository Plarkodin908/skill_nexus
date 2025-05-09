import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define types for achievements and badges
enum BadgeType {
  Bronze = "bronze",
  Silver = "silver",
  Gold = "gold",
  Platinum = "platinum",
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  badge?: {
    name: string;
    level: BadgeType;
  };
  date?: string;
  detailDescription?: string;
  tasks?: {
    name: string;
    completed: boolean;
  }[];
}

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Mock data for achievements
  const achievementsData: Achievement[] = [
    {
      id: 1,
      title: "First Tutorial Created",
      description: "Create your very first tutorial and share your knowledge.",
      progress: 100,
      total: 100,
      badge: {
        name: "Tutorial Novice",
        level: BadgeType.Bronze,
      },
      date: "2024-07-15",
      detailDescription: "You've taken your first step into sharing your expertise with others! This achievement recognizes your willingness to contribute to the learning community by creating your first tutorial. Continue creating quality content to earn more advanced badges.",
      tasks: [
        { name: "Create a tutorial draft", completed: true },
        { name: "Add content to your tutorial", completed: true },
        { name: "Publish your tutorial", completed: true }
      ]
    },
    {
      id: 2,
      title: "Active Contributor",
      description: "Contribute to the community by creating 5 resources.",
      progress: 60,
      total: 100,
      badge: {
        name: "Resourceful",
        level: BadgeType.Silver,
      },
      date: "2024-07-22",
      detailDescription: "Being an active contributor means consistently providing valuable resources to the community. These can be tutorials, articles, code snippets, or other educational materials. This badge recognizes your ongoing commitment to sharing knowledge.",
      tasks: [
        { name: "Create 3 resources (any type)", completed: true },
        { name: "Receive 10 likes on your content", completed: true },
        { name: "Create 5 resources total", completed: false }
      ]
    },
    {
      id: 3,
      title: "Video Star",
      description: "Create 3 video tutorials to help others learn.",
      progress: 33,
      total: 100,
      badge: {
        name: "Video Vanguard",
        level: BadgeType.Bronze,
      },
      date: "2024-07-29",
      detailDescription: "Video tutorials are an excellent way to visually demonstrate concepts and techniques. This achievement tracks your progress in creating engaging video content that helps visual learners master new skills.",
      tasks: [
        { name: "Create your first video tutorial", completed: true },
        { name: "Create a second video tutorial", completed: false },
        { name: "Create a third video tutorial", completed: false }
      ]
    },
    {
      id: 4,
      title: "Master of Articles",
      description: "Write 10 articles and share your insights.",
      progress: 90,
      total: 100,
      badge: {
        name: "Article Ace",
        level: BadgeType.Gold,
      },
      date: "2024-08-05",
      detailDescription: "Written articles are a cornerstone of knowledge sharing. This achievement recognizes your dedication to crafting thoughtful, informative articles that provide deep insights into your areas of expertise.",
      tasks: [
        { name: "Write 5 articles", completed: true },
        { name: "Receive 25+ comments on your articles", completed: true },
        { name: "Write 10 articles total", completed: false }
      ]
    },
    {
      id: 5,
      title: "Community Influencer",
      description: "Receive 50 upvotes on your tutorials and resources.",
      progress: 100,
      total: 100,
      badge: {
        name: "Influencer",
        level: BadgeType.Platinum,
      },
      date: "2024-08-12",
      detailDescription: "Being recognized by the community is the highest form of validation for your contributions. This achievement celebrates your ability to create content that resonates with learners and makes a significant impact on their educational journey.",
      tasks: [
        { name: "Receive 10 upvotes", completed: true },
        { name: "Receive 25 upvotes", completed: true },
        { name: "Receive 50 upvotes", completed: true }
      ]
    },
    {
      id: 6,
      title: "Tutorial Titan",
      description: "Create 20 tutorials and become a knowledge leader.",
      progress: 40,
      total: 100,
      badge: {
        name: "Tutorial Titan",
        level: BadgeType.Gold,
      },
      date: "2024-08-19",
      detailDescription: "A Tutorial Titan is someone who has demonstrated exceptional dedication to creating comprehensive, high-quality tutorials across various topics. This achievement represents your position as a leader in educational content creation.",
      tasks: [
        { name: "Create 10 tutorials", completed: true },
        { name: "Maintain an average rating of 4.5+", completed: false },
        { name: "Create 20 tutorials total", completed: false }
      ]
    },
    {
      id: 7,
      title: "Resource Guru",
      description: "Contribute 50 resources to help the community.",
      progress: 75,
      total: 100,
      badge: {
        name: "Resource Guru",
        level: BadgeType.Platinum,
      },
      date: "2024-08-26",
      detailDescription: "Contributing 50 resources to the community is a significant achievement. This badge recognizes your commitment to helping others learn and grow through your contributions.",
      tasks: [
        { name: "Contribute 25 resources", completed: true },
        { name: "Contribute 50 resources total", completed: false }
      ]
    },
    {
      id: 8,
      title: "Video Virtuoso",
      description: "Create 10 video tutorials and inspire learners.",
      progress: 100,
      total: 100,
      badge: {
        name: "Video Virtuoso",
        level: BadgeType.Silver,
      },
      date: "2024-09-02",
      detailDescription: "Creating 10 video tutorials is a testament to your ability to create engaging and informative content. This achievement recognizes your dedication to sharing your knowledge through video tutorials.",
      tasks: [
        { name: "Create 5 video tutorials", completed: true },
        { name: "Create 10 video tutorials total", completed: false }
      ]
    },
    {
      id: 9,
      title: "Article Alchemist",
      description: "Write 20 articles and transform knowledge.",
      progress: 25,
      total: 100,
      badge: {
        name: "Article Alchemist",
        level: BadgeType.Bronze,
      },
      date: "2024-09-09",
      detailDescription: "Writing 20 articles is a significant achievement. This badge recognizes your dedication to sharing your knowledge through written content.",
      tasks: [
        { name: "Write 10 articles", completed: true },
        { name: "Write 20 articles total", completed: false }
      ]
    },
    {
      id: 10,
      title: "Community Champion",
      description: "Receive 100 upvotes and become a community favorite.",
      progress: 50,
      total: 100,
      badge: {
        name: "Community Champion",
        level: BadgeType.Gold,
      },
      date: "2024-09-16",
      detailDescription: "Being recognized as a community champion is a significant achievement. This badge recognizes your ability to create content that resonates with learners and makes a significant impact on their educational journey.",
      tasks: [
        { name: "Receive 50 upvotes", completed: true },
        { name: "Receive 100 upvotes total", completed: false }
      ]
    },
  ];

  const getBadgeColorClass = (level: BadgeType) => {
    switch (level) {
      case BadgeType.Bronze:
        return "bg-amber-700";
      case BadgeType.Silver:
        return "bg-slate-400";
      case BadgeType.Gold:
        return "bg-yellow-500";
      case BadgeType.Platinum:
        return "bg-indigo-300";
      default:
        return "bg-forest";
    }
  };

  const handleViewDetails = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
  };

  const handleCloseDetails = () => {
    setSelectedAchievement(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Achievements</h1>

      {selectedAchievement ? (
        <div className="mb-8 animate-fade-in">
          <Button 
            variant="outline" 
            size="sm"
            className="mb-6 border-mint/20 text-mint hover:bg-mint/10 flex items-center gap-2"
            onClick={handleCloseDetails}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Achievements
          </Button>
          
          <Card className="bg-forest-light border-mint/20 text-white">
            <CardHeader className="border-b border-mint/10 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold">{selectedAchievement.title}</CardTitle>
                  <CardDescription className="text-white/70 mt-1">{selectedAchievement.description}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/60 hover:bg-mint/10 hover:text-white"
                  onClick={handleCloseDetails}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-full ${selectedAchievement.badge ? getBadgeColorClass(selectedAchievement.badge.level) : "bg-forest"}`}>
                  <div className="h-12 w-12 flex items-center justify-center text-dark-purple font-bold text-2xl">
                    {selectedAchievement.progress}%
                  </div>
                </div>
                <div>
                  {selectedAchievement.badge && (
                    <Badge className={`${getBadgeColorClass(selectedAchievement.badge.level)} text-dark-purple mb-2`}>
                      {selectedAchievement.badge.name} - {selectedAchievement.badge.level}
                    </Badge>
                  )}
                  <div className="text-sm text-white/70">
                    <Calendar className="mr-2 h-4 w-4 inline-block" />
                    Last updated: {selectedAchievement.date}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About this Achievement</h3>
                  <p className="text-white/80">{selectedAchievement.detailDescription}</p>
                </div>
                
                {selectedAchievement.tasks && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tasks to Complete</h3>
                    <div className="space-y-2">
                      {selectedAchievement.tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-forest rounded-md">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${task.completed ? "bg-mint" : "bg-white/10"}`}>
                            {task.completed && <span className="text-forest text-xs">✓</span>}
                          </div>
                          <span className={task.completed ? "text-white" : "text-white/50"}>{task.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Progress</h3>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-white/70 mb-1">
                      <span>Completion</span>
                      <span>{selectedAchievement.progress}%</span>
                    </div>
                    <Progress value={selectedAchievement.progress} max={100} className="bg-forest border-mint/20 h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-mint/10 pt-6 flex justify-between">
              <Button 
                variant="outline"
                className="border-mint/20 text-mint hover:bg-mint/10"
                onClick={handleCloseDetails}
              >
                Close Details
              </Button>
              
              {selectedAchievement.progress < 100 && (
                <Button 
                  className="bg-mint hover:bg-mint/90 text-forest"
                >
                  Complete Next Task
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((achievement) => (
            <Card key={achievement.id} className="bg-forest-light border-mint/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{achievement.title}</CardTitle>
                <CardDescription className="text-white/70">{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-white/70 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} max={100} className="bg-forest border-mint/20" />
                </div>
                {achievement.badge && (
                  <div className="flex items-center justify-between">
                    <Badge className={`bg-forest border-mint/20 text-mint`}>
                      {achievement.badge.name}
                    </Badge>
                    <Badge className={`bg-forest border-mint/20 text-mint`}>
                      {achievement.badge.level}
                    </Badge>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-white/70">
                  <Calendar className="mr-2 h-4 w-4 inline-block" />
                  {achievement.date}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-mint/20 text-mint hover:bg-mint/10"
                  onClick={() => handleViewDetails(achievement)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;
