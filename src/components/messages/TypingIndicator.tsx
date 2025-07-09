import { useState, useEffect } from "react";

interface TypingIndicatorProps {
  isTyping: boolean;
  userName?: string;
}

const TypingIndicator = ({ isTyping, userName = "Someone" }: TypingIndicatorProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isTyping) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isTyping]);

  if (!isTyping) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-white/60 text-sm">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-mint rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-mint rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-mint rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span>{userName} is typing{dots}</span>
    </div>
  );
};

export default TypingIndicator;