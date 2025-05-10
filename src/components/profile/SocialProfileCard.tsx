
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";

interface SocialProfileCardProps {
  name: string;
  bio: string;
  profileImageUrl?: string;
  socials: {
    github?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  onResumeClick?: () => void;
}

const SocialProfileCard = ({
  name = "About Me",
  bio = "I'm a multidisciplinary designer who focuses on telling my clients' stories visually, through enjoyable and meaningful experiences. I specialize in responsive websites and functional user interfaces.",
  profileImageUrl,
  socials,
  onResumeClick
}: SocialProfileCardProps) => {
  return (
    <div className="w-[17em] h-[22.5em] bg-[#171717] transition-all duration-1000 relative
      flex flex-col
      [clip-path:polygon(30px_0%,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0%_30px)]
      rounded-tr-[20px] rounded-bl-[20px]">
      
      <div className="w-[4.8em] h-[4.8em] bg-white rounded-[15px] mx-auto mt-6 mb-4">
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover rounded-[15px]"
          />
        )}
      </div>
      
      <span className="font-bold text-white text-center text-base">{name}</span>
      
      <p className="font-normal text-white text-center text-[0.72em] m-4">
        {bio}
      </p>
      
      <div className="mt-4 flex justify-center gap-4">
        {socials.github && (
          <a 
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 transition-colors duration-400"
          >
            <Github size={16} />
          </a>
        )}
        
        {socials.twitter && (
          <a 
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 transition-colors duration-400"
          >
            <Twitter size={16} />
          </a>
        )}
        
        {socials.instagram && (
          <a 
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 transition-colors duration-400"
          >
            <Instagram size={16} />
          </a>
        )}
        
        {socials.youtube && (
          <a 
            href={socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 transition-colors duration-400"
          >
            <Youtube size={16} />
          </a>
        )}
      </div>
      
      <Button 
        onClick={onResumeClick}
        className="py-2 px-7 mx-auto mt-auto mb-4 rounded-full border-none font-bold bg-white text-black hover:bg-red-500 hover:text-white transition-colors duration-400"
      >
        Resume
      </Button>
    </div>
  );
};

export default SocialProfileCard;
