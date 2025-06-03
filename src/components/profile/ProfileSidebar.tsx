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
  const {
    user
  } = useAuth();
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    github: "",
    linkedin: "",
    website: ""
  });
  const [profilePicture, setProfilePicture] = useState<string>(user?.avatar || "");
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
      reader.onload = event => {
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
      reader.onload = event => {
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
  return;
};
export default ProfileSidebar;