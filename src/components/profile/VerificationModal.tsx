
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, X, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal = ({ isOpen, onClose }: VerificationModalProps) => {
  const { user, submitVerification } = useAuth();
  const [idImageUrl, setIdImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      // Simulate file upload with a timeout
      setTimeout(() => {
        const file = e.target.files![0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
          setIdImageUrl(reader.result as string);
          setIsUploading(false);
        };
        
        reader.readAsDataURL(file);
      }, 1000);
    }
  };
  
  const handleSubmit = async () => {
    if (!idImageUrl) {
      toast.error("Please upload your ID first");
      return;
    }
    
    try {
      await submitVerification(idImageUrl);
      onClose();
    } catch (error) {
      toast.error("Failed to submit verification request");
    }
  };
  
  const handleRemoveImage = () => {
    setIdImageUrl(null);
  };
  
  if (!user) return null;
  
  // Display status messages based on current verification status
  const renderStatusMessage = () => {
    switch (user.verificationStatus) {
      case "pending":
        return (
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-white font-medium">Verification in progress</p>
              <p className="text-white/70 text-sm">We're reviewing your submitted ID. This usually takes 1-2 business days.</p>
            </div>
          </div>
        );
      case "verified":
        return (
          <div className="bg-mint/10 border border-mint/30 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-mint" />
            <div>
              <p className="text-white font-medium">Account verified</p>
              <p className="text-white/70 text-sm">Your account has been successfully verified. The verified badge is now visible on your profile.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-forest-light border-mint/20 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your identity</DialogTitle>
          <DialogDescription className="text-white/70">
            Verification helps build trust in the community and unlocks additional features.
          </DialogDescription>
        </DialogHeader>
        
        {renderStatusMessage()}
        
        {user.verificationStatus === "unverified" && (
          <>
            <div className="space-y-4">
              <div className="bg-forest border border-mint/10 rounded-lg p-4">
                <h3 className="font-medium mb-2">Requirements</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Government-issued ID card, passport, or driver's license</li>
                  <li>• Clear, unobstructed image of the full document</li>
                  <li>• All information must be clearly legible</li>
                </ul>
              </div>
              
              {idImageUrl ? (
                <div className="relative border border-mint/20 rounded-lg overflow-hidden">
                  <img src={idImageUrl} alt="ID preview" className="w-full h-auto" />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-forest/80 hover:bg-forest text-white"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-mint/20 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="id-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="id-upload" 
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-8 w-8 text-mint/70 mb-2" />
                    <p className="text-white font-medium">Upload your ID</p>
                    <p className="text-white/60 text-sm mt-1">Click to browse files</p>
                  </label>
                </div>
              )}
              
              <div className="text-white/60 text-xs">
                <p>Your ID will be securely stored and only used for verification purposes. We respect your privacy and follow all data protection regulations.</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-mint/20 text-white hover:bg-mint/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="bg-mint hover:bg-mint/90 text-forest"
                disabled={!idImageUrl || isUploading}
              >
                {isUploading ? 'Uploading...' : 'Submit for Verification'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
