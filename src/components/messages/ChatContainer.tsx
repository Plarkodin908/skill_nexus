
import { Card } from "@/components/ui/card";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { Chat } from "./ChatList";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlanType } from "@/components/pricing/types";

interface Message {
  id: number;
  senderId: number | string;
  text: string;
  timestamp: string;
  isRead?: boolean;
  isDelivered?: boolean;
}

interface ChatContainerProps {
  selectedChat: Chat | undefined;
  messages: Message[];
  onSendMessage: (text: string) => void;
  canSendMessage?: boolean;
  membership: PlanType;
  isTyping?: boolean;
}

const ChatContainer = ({ 
  selectedChat, 
  messages, 
  onSendMessage,
  canSendMessage = true,
  membership,
  isTyping = false
}: ChatContainerProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-forest-light border border-mint/10 p-0 overflow-hidden lg:col-span-2 flex flex-col">
      {selectedChat ? (
        <>
          <ChatHeader selectedChat={selectedChat} />
          <MessageList messages={messages} />
          <TypingIndicator isTyping={isTyping} userName={selectedChat?.user.name} />
          
          {membership === "Free" && !canSendMessage ? (
            <div className="p-4 border-t border-mint/10 bg-forest">
              <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3 mb-3">
                <p className="text-white text-sm mb-2">
                  You've reached your daily message limit. Upgrade to a paid plan to send unlimited messages.
                </p>
                <Button 
                  className="bg-mint hover:bg-mint/90 text-forest w-full flex items-center justify-center gap-2"
                  onClick={() => navigate('/pricing')}
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          ) : (
            <MessageInput onSendMessage={onSendMessage} disabled={!canSendMessage} />
          )}
        </>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <MessageSquare className="h-16 w-16 text-mint/40 mb-4" />
          <p className="text-white/60 text-lg mb-2">No conversation selected</p>
          <p className="text-white/40 text-center max-w-md">
            Select a contact from the list or add a new contact to start messaging
          </p>
        </div>
      )}
    </Card>
  );
};

export default ChatContainer;
