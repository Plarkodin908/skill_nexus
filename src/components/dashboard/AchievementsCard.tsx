
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
  return (
    <Card className="bg-forest-light border border-mint/10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Achievements</h3>
        <Link to="/achievements">
          <Button 
            variant="ghost" 
            className="text-mint hover:text-mint/80 hover:bg-mint/10 p-1 h-auto"
          >
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {achievements.map((achievement, index) => (
          <AchievementBadge
            key={index}
            type={achievement.type}
            title={achievement.title}
            description={achievement.description}
            earned={achievement.earned}
          />
        ))}
      </div>
    </Card>
  );
};

export default AchievementsCard;
