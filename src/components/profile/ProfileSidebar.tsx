
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GenderSelection from "./GenderSelection";
import SocialLinksBadges from "./SocialLinksBadges";
import VerificationSection from "./VerificationSection";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, Image } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export interface ProfileSidebarProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  isEditing?: boolean; // Make isEditing optional with a default value
  onProfilePictureChange?: (url: string) => void;
  onCoverPictureChange?: (url: string) => void;
}

const ProfileSidebar = ({ 
  selectedGender, 
  onGenderChange, 
  isEditing = false,
  onProfilePictureChange,
  onCoverPictureChange
}: ProfileSidebarProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    github: "",
    linkedin: "",
    website: ""
  });
  
  const [profilePicture, setProfilePicture] = useState<string>(user?.avatarUrl || "");
  const [coverPicture, setCoverPicture] = useState<string>("");

  const handleSaveChanges = () => {
    // Save profile changes logic here
    
    // Navigate to pricing page after saving
    navigate("/pricing");
  };

  const handleSocialLinkChange = (platform: keyof typeof socialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProfilePicture(imageUrl);
        if (onProfilePictureChange) {
          onProfilePictureChange(imageUrl);
        }
        toast.success("Profile picture updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setCoverPicture(imageUrl);
        if (onCoverPictureChange) {
          onCoverPictureChange(imageUrl);
        }
        toast.success("Cover picture updated");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-forest-light border border-mint/10 rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold text-white">Profile Details</h3>
      
      {isEditing && (
        <div className="space-y-4">
          <h4 className="text-white/80 text-sm font-medium">Profile Picture</h4>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-mint/30">
              <AvatarImage src={profilePicture} alt="Profile Picture" />
              <AvatarFallback className="bg-forest">
                {user?.name?.substring(0, 2) || "UN"}
              </AvatarFallback>
            </Avatar>
            
            <div className="relative">
              <input
                type="file"
                id="profile-picture"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              <label
                htmlFor="profile-picture"
                className="flex items-center gap-2 px-3 py-2 bg-forest hover:bg-forest-dark text-white rounded-lg cursor-pointer"
              >
                <Camera className="h-4 w-4" strokeWidth={3} />
                <span>Change Profile Picture</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="space-y-4">
          <h4 className="text-white/80 text-sm font-medium">Cover Picture</h4>
          <div className="relative w-full h-32 bg-forest rounded-lg overflow-hidden">
            {coverPicture ? (
              <img 
                src={coverPicture} 
                alt="Cover" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Image className="h-12 w-12 text-mint/30" strokeWidth={1.5} />
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center">
              <input
                type="file"
                id="cover-picture"
                className="hidden"
                accept="image/*"
                onChange={handleCoverPictureChange}
              />
              <label
                htmlFor="cover-picture"
                className="flex items-center gap-2 px-3 py-2 bg-forest/80 hover:bg-forest text-white rounded-lg cursor-pointer"
              >
                <Camera className="h-4 w-4" strokeWidth={3} />
                <span>Change Cover Picture</span>
              </label>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <h4 className="text-white/80 text-sm font-medium">Gender</h4>
        <GenderSelection 
          selectedGender={selectedGender} 
          onGenderChange={onGenderChange}
        />
      </div>
      
      <div className="space-y-4">
        <h4 className="text-white/80 text-sm font-medium">Social Links</h4>
        <SocialLinksBadges
          links={socialLinks}
          onChange={handleSocialLinkChange}
          readOnly={!isEditing}
        />
      </div>
      
      {/* Add VerificationSection */}
      {!isEditing && <VerificationSection />}
      
      {isEditing && (
        <Button 
          className="w-full bg-mint hover:bg-mint/90 text-forest"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default ProfileSidebar;
