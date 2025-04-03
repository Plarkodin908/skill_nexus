
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GenderSelection from "./GenderSelection";
import SocialLinksBadges from "./SocialLinksBadges";
import VerificationSection from "./VerificationSection";
import { useAuth } from "@/contexts/AuthContext";

export interface ProfileSidebarProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  isEditing?: boolean; // Make isEditing optional with a default value
}

const ProfileSidebar = ({ selectedGender, onGenderChange, isEditing = false }: ProfileSidebarProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    github: "",
    linkedin: "",
    website: ""
  });

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

  return (
    <div className="bg-forest-light border border-mint/10 rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold text-white">Profile Details</h3>
      
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
