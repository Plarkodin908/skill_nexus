
import { useState, useEffect } from "react";
import ChatList from "@/components/messages/ChatList";
import ChatContainer from "@/components/messages/ChatContainer";
import { Message } from "@/services/messageService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, MessageSquare, CreditCard } from "lucide-react";
import { toast } from "sonner";
import RequiresMembership from "@/components/membership/RequiresMembership";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export interface ChatUser {
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface Chat {
  id: number;
  user: ChatUser;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const Messages = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const selectedChat = selectedChatId ? chats.find(chat => chat.id === selectedChatId) : undefined;
  
  const handleSendMessage = (text: string) => {
    if (!selectedChatId) return;
    
    // Add the message to the state
    const newMessage: Message = {
      id: messages.length + 1,
      chatId: selectedChatId,
      senderId: "current",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    
    // Update the last message in the chat
    setChats(prevChats => prevChats.map(chat => 
      chat.id === selectedChatId 
        ? { 
            ...chat, 
            lastMessage: text,
            timestamp: "Just now" 
          } 
        : chat
    ));
    
    // In a real app, this would send the message to a backend service
    toast.success("Message sent!");
  };

  const handleAddContact = () => {
    if (newContactName.trim() === "") {
      toast.error("Please enter a name");
      return;
    }

    const newContact: Chat = {
      id: Date.now(), // Use timestamp as a unique ID
      user: {
        name: newContactName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newContactName)}&background=0D8ABC&color=fff`,
        isOnline: false
      },
      lastMessage: "No messages yet",
      timestamp: "Just now",
      unread: 0
    };

    setChats([...chats, newContact]);
    setNewContactName("");
    setShowAddContact(false);
    toast.success("Contact added successfully");
  };

  const filteredChats = chats.filter(chat => 
    chat.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // This would be replaced with actual subscription check logic in a real app
  const requiredMembership = "Pro Learner";
  
  return (
    <div className="container mx-auto h-full px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Messages</h1>
      
      <RequiresMembership 
        requiredMembership={requiredMembership}
        fallbackText="Messaging features are available exclusively to Pro Learner and Educator subscribers. Upgrade your plan to unlock unlimited messaging with our community of experts and learners."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          <div className="flex flex-col">
            <div className="bg-forest-light border border-mint/10 p-4 rounded-t-lg">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                  <Input
                    className="pl-10 bg-forest border-mint/20 text-white w-full"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="border-mint/20 text-mint hover:bg-mint/10"
                  onClick={() => setShowAddContact(!showAddContact)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>

              {showAddContact && (
                <div className="mb-4 p-3 bg-forest rounded-lg border border-mint/10">
                  <h3 className="text-sm font-medium text-white mb-2">Add New Contact</h3>
                  <Input 
                    placeholder="Contact name"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="bg-forest-light border-mint/20 text-white w-full mb-2"
                  />
                  <Button 
                    className="bg-mint hover:bg-mint/90 text-forest w-full"
                    onClick={handleAddContact}
                  >
                    Add Contact
                  </Button>
                </div>
              )}
            </div>

            <div className="flex-grow overflow-hidden rounded-b-lg">
              <ChatList 
                chats={filteredChats} 
                selectedChat={selectedChatId} 
                onSelectChat={setSelectedChatId} 
              />
            </div>
          </div>
          
          <ChatContainer 
            selectedChat={selectedChat} 
            messages={selectedChatId ? messages.filter(msg => msg.chatId === selectedChatId) : []} 
            onSendMessage={handleSendMessage} 
          />
        </div>
      </RequiresMembership>
    </div>
  );
};

export default Messages;
