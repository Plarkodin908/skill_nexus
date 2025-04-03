
import { Button } from "@/components/ui/button";
import VerifiedBadge from "./VerifiedBadge";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileCardProps {
  name: string;
  role?: string;
  title?: string; // Added this for backward compatibility
  location?: string;
  joinDate?: string;
  avatarUrl: string;
}

const ProfileCard = ({ name, role, title, location, joinDate, avatarUrl }: ProfileCardProps) => {
  // Use role prop first, fall back to title if it exists
  const displayRole = role || title || "Learning Enthusiast";
  const { user } = useAuth();
  const isVerified = user?.verificationStatus === "verified";
  
  return (
    <div className="group relative w-full h-72 overflow-hidden rounded-2xl bg-dark-purple border border-primary-purple/20">
      {/* Animated background with gradient */}
      <div 
        className="absolute w-full h-24 rounded-t-2xl bg-gradient-to-bl from-primary-purple via-secondary-purple to-light-purple 
        transition-all duration-500 group-hover:scale-95 group-hover:h-72 group-hover:rounded-b-2xl"
      ></div>
      
      {/* Profile picture */}
      <div 
        className="relative z-10 w-28 h-28 mt-8 mx-auto rounded-full border-4 border-dark-purple bg-cover bg-center
        transition-all duration-500 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20"
        style={{ backgroundImage: `url(${avatarUrl})` }}
      >
        {isVerified && (
          <div className="absolute -right-1 -bottom-1 bg-dark-purple rounded-full p-1">
            <VerifiedBadge size="md" />
          </div>
        )}
      </div>
      
      {/* User info */}
      <div className="relative z-10 text-center mt-4 transition-all duration-500 group-hover:-translate-y-10">
        <div className="flex items-center justify-center gap-1">
          <h2 className="text-2xl font-semibold text-white">{name}</h2>
          {isVerified && <VerifiedBadge size="sm" className="mt-1" />}
        </div>
        <p className="text-white/70">{displayRole}</p>
        {location && <p className="text-white/60 text-sm">{location}</p>}
        {joinDate && <p className="text-white/60 text-xs mt-1">{joinDate}</p>}
      </div>
      
      {/* Follow button */}
      <div className="relative z-10 flex justify-center mt-4">
        <Button 
          className="bg-primary-purple hover:bg-primary-purple/90 hover:scale-125 transition-all duration-500"
        >
          Follow
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
