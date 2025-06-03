import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Star, Zap, Trophy, Crown } from "lucide-react";

// Define the allowed badge types
export type BadgeType = "beginner" | "intermediate" | "advanced" | "expert" | "master" | "legend";
interface AchievementBadgeProps {
  type: BadgeType;
  title: string;
  description: string;
  earned: boolean;
}
const AchievementBadge = ({
  type,
  title,
  description,
  earned
}: AchievementBadgeProps) => {
  // Badge configuration based on type
  const config = {
    beginner: {
      icon: Zap,
      color: "bg-blue-800/20 text-blue-300",
      earnedColor: "bg-blue-800/20 text-blue-300"
    },
    intermediate: {
      icon: Star,
      color: "bg-green-800/20 text-green-300",
      earnedColor: "bg-green-800/20 text-green-300"
    },
    advanced: {
      icon: Award,
      color: "bg-yellow-800/20 text-yellow-300",
      earnedColor: "bg-yellow-800/20 text-yellow-300"
    },
    expert: {
      icon: Trophy,
      color: "bg-purple-800/20 text-purple-300",
      earnedColor: "bg-purple-800/20 text-purple-300"
    },
    master: {
      icon: Crown,
      color: "bg-orange-800/20 text-orange-300",
      earnedColor: "bg-orange-800/20 text-orange-300"
    },
    legend: {
      icon: Crown,
      color: "bg-gray-700/20 text-gray-300",
      earnedColor: "bg-gray-700/20 text-gray-300"
    }
  };
  const BadgeIcon = config[type].icon;
  return <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`
              flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer
              ${earned ? config[type].earnedColor : 'bg-white/10 text-white/40'}
              transition-all duration-300
              ${earned ? 'hover:scale-110' : 'opacity-50'}
            `}>
            <BadgeIcon className="h-6 w-6 mb-1" />
            <span className="text-xs text-center font-medium">{title}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-900">
          <div className="text-sm">
            <p className="font-bold">{title}</p>
            <p>{description}</p>
            {!earned && <p className="text-white/60 italic mt-1">Not yet earned</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>;
};
export default AchievementBadge;