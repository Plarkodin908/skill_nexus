
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [messageText, setMessageText] = useState("");
  
  const handleSendMessage = () => {
    if (messageText.trim() === "" || disabled) return;
    onSendMessage(messageText);
    setMessageText("");
  };
  
  return (
    <div className="p-4 border-t border-mint/10">
      <div className="flex gap-2">
        <Input
          className={`bg-forest border-mint/20 text-white ${disabled ? 'opacity-70' : ''}`}
          placeholder={disabled ? "Message limit reached" : "Type a message..."}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          disabled={disabled}
        />
        <Button 
          className={`${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-mint hover:bg-mint/90'} text-forest`}
          onClick={handleSendMessage}
          disabled={disabled}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
