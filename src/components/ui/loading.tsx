
import React from "react";
import { cn } from "@/lib/utils";

export interface LoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
  className?: string;
  variant?: "lava-lamp" | "words" | "spinner";
}

const Loading = ({ 
  size = "medium", 
  text, 
  className = "", 
  variant = "lava-lamp" 
}: LoadingProps) => {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-8 h-16";
      case "large":
        return "w-16 h-32";
      default:
        return "w-12 h-24";
    }
  };

  return (
    <div className={cn("loading-wrapper", className)}>
      <div className="flex flex-col items-center">
        {variant === "lava-lamp" && (
          <div className={`lava-lamp ${getSizeClass()}`}>
            <div className="bubble"></div>
            <div className="bubble1"></div>
            <div className="bubble2"></div>
            <div className="bubble3"></div>
          </div>
        )}
        
        {variant === "words" && (
          <div className="card">
            <div className="loader">
              <p>loading</p>
              <div className="words">
                <span className="word">buttons</span>
                <span className="word">forms</span>
                <span className="word">switches</span>
                <span className="word">cards</span>
                <span className="word">buttons</span>
              </div>
            </div>
          </div>
        )}
        
        {variant === "spinner" && (
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        
        {text && <p className="mt-4 text-white/70 text-sm">{text}</p>}
      </div>
    </div>
  );
};

export default Loading;
