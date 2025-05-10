
import React from "react";
import { Button } from "@/components/ui/button";

interface PublisherProfileCardProps {
  name: string;
  subtitle: string;
  avatarSvg?: React.ReactNode;
  backgroundSvg?: React.ReactNode;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const PublisherProfileCard = ({
  name = "Cameron Williamson",
  subtitle = "Web Development",
  avatarSvg,
  backgroundSvg,
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonText = "Follow",
  secondaryButtonText = "Message"
}: PublisherProfileCardProps) => {
  return (
    <div className="relative w-[300px] h-[384px] flex flex-col items-center rounded-[20px] bg-white">
      {/* Background image */}
      <div className="h-[192px] w-full">
        {backgroundSvg || (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
            <rect fill="#ffffff" width="540" height="450"></rect>
            <defs>
              <linearGradient id="publisher-grad" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
                <stop offset="0" stopColor="#ffffff"></stop>
                <stop offset="1" stopColor="#FC726E"></stop>
              </linearGradient>
            </defs>
            <rect x="0" y="0" fill="url(#publisher-grad)" width="100%" height="100%"></rect>
          </svg>
        )}
      </div>
      
      {/* Avatar */}
      <div className="absolute w-[114px] h-[114px] bg-white rounded-full flex justify-center items-center top-[calc(50%-57px)]">
        {avatarSvg || (
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-primary-purple to-light-purple"></div>
        )}
      </div>
      
      {/* Content */}
      <div className="mt-[60px] font-medium text-[18px] text-black">
        {name}
      </div>
      
      <div className="mt-[10px] font-normal text-[15px] text-[#78858F]">
        {subtitle}
      </div>
      
      <div className="mt-[15px] flex gap-4">
        <Button 
          onClick={onPrimaryAction} 
          className="h-[31px] w-[76px] border-2 border-black rounded-[4px] font-bold text-[11px] text-black bg-white uppercase transition-all duration-300 hover:bg-black hover:text-white"
        >
          {primaryButtonText}
        </Button>
        
        <Button 
          onClick={onSecondaryAction}
          className="h-[31px] w-[76px] border-2 border-black rounded-[4px] font-bold text-[11px] text-white bg-black uppercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          {secondaryButtonText}
        </Button>
      </div>
    </div>
  );
};

export default PublisherProfileCard;
