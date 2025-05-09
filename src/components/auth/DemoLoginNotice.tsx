
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Mail, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DemoLoginNoticeProps {
  onClose: () => void;
}

const DemoLoginNotice = ({ onClose }: DemoLoginNoticeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Show the notice after 5 minutes of demo account usage
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  const handleCreateAccount = () => {
    navigate('/auth/sign-up');
    onClose();
  };
  
  const handleSignIn = () => {
    navigate('/auth/sign-in');
    onClose();
  };
  
  const handleRemindLater = () => {
    toast.info("We'll remind you later to create your account");
    onClose();
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-forest-light border border-mint/20 animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Enjoying Skill Nexus?</h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-white/80 mb-6">
            You're currently using a demo account. Create your own account to save your progress, connect with experts, and unlock personalized features.
          </p>
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-mint hover:bg-mint/90 text-forest flex items-center justify-center gap-2"
              onClick={handleCreateAccount}
            >
              <UserPlus className="h-4 w-4" />
              Create My Account
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-mint/20 text-mint hover:bg-mint/10 flex items-center justify-center gap-2"
              onClick={handleSignIn}
            >
              <Mail className="h-4 w-4" />
              Sign In with Existing Account
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-white/70 hover:text-white hover:bg-white/5"
              onClick={handleRemindLater}
            >
              Remind Me Later
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DemoLoginNotice;
