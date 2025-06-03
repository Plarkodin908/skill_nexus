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
const AchievementsCard = ({
  achievements
}: AchievementsCardProps) => {
  return;
};
export default AchievementsCard;