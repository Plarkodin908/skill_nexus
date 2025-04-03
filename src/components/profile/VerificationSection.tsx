
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lock, Clock } from "lucide-react";
import VerificationModal from "./VerificationModal";

const VerificationSection = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (!user) return null;
  
  const verificationStatus = user.verificationStatus;
  
  const getStatusBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <Badge className="bg-mint/20 text-mint border-mint/30 hover:bg-mint/30">
            <CheckCircle2 className="h-3 w-3 mr-1" strokeWidth={3} /> Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 hover:bg-amber-500/30">
            <Clock className="h-3 w-3 mr-1" strokeWidth={3} /> Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-forest border-mint/10 text-white/70 hover:bg-forest/90">
            <Lock className="h-3 w-3 mr-1" strokeWidth={3} /> Unverified
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white text-lg font-medium">Account Verification</h3>
          <p className="text-white/70 text-sm">Verify your identity to unlock exclusive features</p>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="bg-forest p-4 rounded-lg border border-mint/10">
        <div className="space-y-4">
          <div>
            <p className="text-white/90">Benefits of verification:</p>
            <ul className="text-white/70 text-sm mt-2 space-y-1">
              <li>• Verified badge on your profile</li>
              <li>• Higher trust from other community members</li>
              <li>• Priority access to new features</li>
              <li>• Additional security for your account</li>
            </ul>
          </div>
          
          {verificationStatus === "unverified" && (
            <Button 
              className="bg-mint hover:bg-mint/90 text-forest w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Verify My Account
            </Button>
          )}
          
          {verificationStatus === "pending" && (
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-sm text-white/80">
              Your verification is in progress. We'll notify you once it's complete.
            </div>
          )}
          
          {verificationStatus === "verified" && (
            <div className="bg-mint/10 border border-mint/30 p-3 rounded-lg text-sm text-white/80">
              Your account is verified! The verified badge is now visible on your profile.
            </div>
          )}
        </div>
      </div>
      
      <VerificationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default VerificationSection;
