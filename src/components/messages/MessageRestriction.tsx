
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlanType } from "@/components/pricing/types";

interface MessageRestrictionProps {
  membership: PlanType;
  messagesSent: number;
  maxMessages: number;
  onUpgrade: () => void;
}

const MessageRestriction = ({ 
  membership, 
  messagesSent, 
  maxMessages, 
  onUpgrade 
}: MessageRestrictionProps) => {
  const navigate = useNavigate();
  const [messagesRemaining, setMessagesRemaining] = useState(maxMessages - messagesSent);
  const percentUsed = Math.min((messagesSent / maxMessages) * 100, 100);
  const isFree = membership === "Free";
  const isLimitReached = messagesSent >= maxMessages;
  
  useEffect(() => {
    setMessagesRemaining(maxMessages - messagesSent);
  }, [messagesSent, maxMessages]);

  return (
    <div className="bg-forest border border-mint/10 rounded-lg p-4 mb-4">
      {isFree ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Daily Message Limit
            </h3>
            <span className="text-sm text-white/70">
              {messagesSent}/{maxMessages} used
            </span>
          </div>
          
          <div className="h-2 bg-forest-light rounded-full overflow-hidden mb-2">
            <div 
              className={`h-full ${isLimitReached ? 'bg-red-500' : 'bg-mint'}`}
              style={{ width: `${percentUsed}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/70">
              {isLimitReached 
                ? "Message limit reached for today" 
                : `${messagesRemaining} messages remaining today`}
            </p>
            <Button 
              size="sm" 
              className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-1"
              onClick={onUpgrade}
            >
              <CreditCard className="h-3 w-3" />
              <span>Upgrade</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-mint" />
            <h3 className="text-white font-medium">{membership} Plan</h3>
          </div>
          <p className="text-sm text-mint">Unlimited messaging</p>
        </div>
      )}
    </div>
  );
};

export default MessageRestriction;
