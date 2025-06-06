
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AchievementBadge from "@/components/gamification/AchievementBadge";
import { Link } from 'react-router-dom';

interface Achievement {
  type: "beginner" | "intermediate" | "advanced" | "expert" | "master" | "legend";
  title: string;
  description: string;
  earned: boolean;
}

interface AchievementsCardProps {
  achievements: Achievement[];
}

const AchievementsCard = ({ achievements }: AchievementsCardProps) => {
  const earnedAchievements = achievements.filter(achievement => achievement.earned);
  const totalAchievements = achievements.length;

  return (
    <Card className="bg-forest-light border border-mint/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Achievements</h3>
        <span className="text-mint text-sm">
          {earnedAchievements.length}/{totalAchievements}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {achievements.slice(0, 4).map((achievement, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <AchievementBadge 
              type={achievement.type} 
              title={achievement.title}
              description={achievement.description}
              earned={achievement.earned}
            />
          </div>
        ))}
      </div>
      
      <Link to="/achievements">
        <Button variant="outline" className="w-full border-mint/20 text-mint hover:bg-mint/10">
          View All Achievements
        </Button>
      </Link>
    </Card>
  );
};

export default AchievementsCard;
