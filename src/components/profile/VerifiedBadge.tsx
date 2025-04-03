
import { CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VerifiedBadge = ({ size = "md", className }: VerifiedBadgeProps) => {
  const sizeMap = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("inline-flex", className)}>
            <CheckCircle2 
              className={cn(
                sizeMap[size],
                "text-mint fill-mint/30"
              )} 
              strokeWidth={3} 
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Verified Account</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerifiedBadge;
