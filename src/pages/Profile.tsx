
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import VerificationModal from '@/components/profile/VerificationModal';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');
  const [isEditing, setIsEditing] = useState(!user?.completedProfile);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(user?.avatar || '');
  const [coverPicture, setCoverPicture] = useState<string>('');

  const handleProfilePictureChange = (url: string) => {
    setProfilePicture(url);
    // In a real app, you would update the user's profile picture in the backend
  };

  const handleCoverPictureChange = (url: string) => {
    setCoverPicture(url);
    // In a real app, you would update the user's cover picture in the backend
  };

  const handleSaveChanges = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
    
    // If this is the first time completing the profile, redirect to pricing
    if (!user?.completedProfile) {
      setTimeout(() => {
        navigate('/pricing');
      }, 1500);
    }
  };

  const handleVerifyAccount = () => {
    setIsVerificationModalOpen(true);
  };

  return (
    <div className="bg-dark-purple min-h-screen">
      <Navbar />
      <div className="container mx-auto py-20 px-4">
        {/* Cover Image (only visible when not editing) */}
        {!isEditing && coverPicture && (
          <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src={coverPicture} 
              alt="Cover" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <ProfileSidebar 
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
            isEditing={isEditing}
            onProfilePictureChange={handleProfilePictureChange}
            onCoverPictureChange={handleCoverPictureChange}
          />
          <div className="w-full md:w-2/3">
            {isEditing ? (
              <div className="bg-forest-light p-6 rounded-lg border border-mint/20 mb-6">
                <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
                <p className="text-white/70 mb-6">
                  Personalize your profile to get the most out of Skill Nexus. This helps us match you with relevant courses and community members.
                </p>
                <Button 
                  className="bg-mint hover:bg-mint/90 text-forest"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-6">
                <Button 
                  variant="outline" 
                  className="border-mint/20 text-white hover:bg-mint/10"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
                
                {user?.verificationStatus === "unverified" && (
                  <Button 
                    className="bg-mint hover:bg-mint/90 text-forest"
                    onClick={handleVerifyAccount}
                  >
                    Verify Account
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <VerificationModal 
        isOpen={isVerificationModalOpen} 
        onClose={() => setIsVerificationModalOpen(false)} 
      />
    </div>
  );
};

export default Profile;
