
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import VerifiedBadge from './VerifiedBadge';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileThemeProps {
  name: string;
  role?: string;
  avatarUrl?: string;
  customStyles?: {
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
    buttonColor?: string;
    buttonHoverColor?: string;
  };
  className?: string;
}

const ProfileTheme = ({
  name,
  role = "Learning Enthusiast",
  avatarUrl,
  customStyles = {
    gradientFrom: "primary-purple",
    gradientVia: "secondary-purple",
    gradientTo: "tertiary-purple",
    buttonColor: "primary-purple",
    buttonHoverColor: "secondary-purple"
  },
  className
}: ProfileThemeProps) => {
  const { user } = useAuth();
  const isVerified = user?.verificationStatus === "verified";
  const defaultGradient = `from-${customStyles.gradientFrom} via-${customStyles.gradientVia} to-${customStyles.gradientTo}`;
  const gradientClasses = `before:bg-gradient-to-bl ${defaultGradient}`;
  
  return (
    <div className={cn(
      "group before:hover:scale-95 before:hover:h-72 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:absolute before:top-0 w-80 h-72 relative bg-dark-purple flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden",
      gradientClasses,
      className
    )}>
      <div className="relative">
        <div 
          className="w-28 h-28 mt-8 rounded-full border-4 border-dark-purple z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 bg-cover bg-center"
          style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : `url('/lovable-uploads/aaa9c8ad-47c0-4ec1-b299-8b47f30da290.png')` }}
        ></div>
        {isVerified && (
          <div className="absolute -right-1 -bottom-1 bg-dark-purple rounded-full p-1 z-20">
            <VerifiedBadge size="md" />
          </div>
        )}
      </div>
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl font-semibold text-white">{name}</span>
          {isVerified && <VerifiedBadge size="sm" className="mt-1" />}
        </div>
        <p className="text-white/80">{role}</p>
      </div>
      <Link 
        to="#" 
        className={`bg-${customStyles.buttonColor} px-4 py-1 text-white rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-${customStyles.buttonHoverColor}`}
      >
        Follow
      </Link>
    </div>
  );
};

export default ProfileTheme;
