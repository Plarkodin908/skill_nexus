
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
import { Upload, X, Clock, CheckCircle2, Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal = ({ isOpen, onClose }: VerificationModalProps) => {
  const { user, submitVerification } = useAuth();
  const [idImageUrl, setIdImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<"id" | "social">("id");
  const [socialConnected, setSocialConnected] = useState({
    facebook: false,
    twitter: false,
    linkedin: false,
    github: false,
  });
  
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
  
  const handleConnectSocial = (platform: keyof typeof socialConnected) => {
    // Simulate connecting to social media
    toast.info(`Connecting to ${platform}...`);
    setTimeout(() => {
      setSocialConnected(prev => ({
        ...prev,
        [platform]: true
      }));
      toast.success(`Connected to ${platform} successfully!`);
    }, 1500);
  };
  
  const handleSubmit = async () => {
    if (verificationMethod === "id" && !idImageUrl) {
      toast.error("Please upload your ID first");
      return;
    }
    
    if (verificationMethod === "social" && !Object.values(socialConnected).some(Boolean)) {
      toast.error("Please connect at least one social account");
      return;
    }
    
    try {
      // Pass verification method and necessary data
      await submitVerification(idImageUrl || JSON.stringify(socialConnected));
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
              <p className="text-white/70 text-sm">We're reviewing your submission. This usually takes 1-2 business days.</p>
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
            <Tabs defaultValue="id" onValueChange={(value) => setVerificationMethod(value as "id" | "social")}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="id">ID Verification</TabsTrigger>
                <TabsTrigger value="social">Social Accounts</TabsTrigger>
              </TabsList>
              <TabsContent value="id">
                <div className="space-y-4 mt-4">
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
                </div>
              </TabsContent>
              <TabsContent value="social">
                <div className="space-y-4 mt-4">
                  <div className="bg-forest border border-mint/10 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Social Account Verification</h3>
                    <p className="text-white/70 text-sm">Connect at least two social accounts to verify your identity. We'll check your account age and activity.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => handleConnectSocial('facebook')} 
                      disabled={socialConnected.facebook}
                      className={`flex items-center justify-between p-3 rounded-lg border ${socialConnected.facebook ? 'bg-mint/10 border-mint/30' : 'border-white/10 hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Facebook className="h-5 w-5 text-blue-500" />
                        <span>Facebook</span>
                      </div>
                      {socialConnected.facebook ? 
                        <span className="text-mint flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Connected</span> : 
                        <span className="text-white/50">Connect</span>
                      }
                    </button>
                    
                    <button 
                      onClick={() => handleConnectSocial('twitter')} 
                      disabled={socialConnected.twitter}
                      className={`flex items-center justify-between p-3 rounded-lg border ${socialConnected.twitter ? 'bg-mint/10 border-mint/30' : 'border-white/10 hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <span>Twitter</span>
                      </div>
                      {socialConnected.twitter ? 
                        <span className="text-mint flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Connected</span> : 
                        <span className="text-white/50">Connect</span>
                      }
                    </button>
                    
                    <button 
                      onClick={() => handleConnectSocial('linkedin')} 
                      disabled={socialConnected.linkedin}
                      className={`flex items-center justify-between p-3 rounded-lg border ${socialConnected.linkedin ? 'bg-mint/10 border-mint/30' : 'border-white/10 hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                        <span>LinkedIn</span>
                      </div>
                      {socialConnected.linkedin ? 
                        <span className="text-mint flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Connected</span> : 
                        <span className="text-white/50">Connect</span>
                      }
                    </button>
                    
                    <button 
                      onClick={() => handleConnectSocial('github')} 
                      disabled={socialConnected.github}
                      className={`flex items-center justify-between p-3 rounded-lg border ${socialConnected.github ? 'bg-mint/10 border-mint/30' : 'border-white/10 hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Github className="h-5 w-5 text-white" />
                        <span>GitHub</span>
                      </div>
                      {socialConnected.github ? 
                        <span className="text-mint flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Connected</span> : 
                        <span className="text-white/50">Connect</span>
                      }
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-white/60 text-xs mt-4">
              <p>Your information will be securely stored and only used for verification purposes. We respect your privacy and follow all data protection regulations.</p>
            </div>
            
            <DialogFooter className="mt-4">
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
                disabled={(verificationMethod === "id" && !idImageUrl) || 
                  (verificationMethod === "social" && !Object.values(socialConnected).some(Boolean)) || 
                  isUploading}
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
