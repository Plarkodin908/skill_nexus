
import { CheckCheck, Check } from "lucide-react";

interface MessageProps {
  id: number;
  senderId: number | string;
  text: string;
  timestamp: string;
  isRead?: boolean;
  isDelivered?: boolean;
}

const MessageBubble = ({ message }: { message: MessageProps }) => {
  const isCurrentUser = message.senderId === "current";
  
  return (
    <div 
      className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`
          max-w-[80%] rounded-lg px-4 py-2
          ${isCurrentUser 
            ? 'bg-mint text-forest' 
            : 'bg-forest border border-mint/10 text-white'}
        `}
      >
        <p>{message.text}</p>
        <div className={`flex items-center justify-between text-xs mt-1 ${isCurrentUser ? 'text-forest/70' : 'text-white/60'}`}>
          <span>{message.timestamp}</span>
          {isCurrentUser && (
            <div className="flex items-center ml-2">
              {message.isRead ? (
                <CheckCheck className="h-3 w-3 text-blue-400" />
              ) : message.isDelivered ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
