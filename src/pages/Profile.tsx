
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import VerificationModal from '@/components/profile/VerificationModal';
import SocialProfileCard from '@/components/profile/SocialProfileCard';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');
  const [isEditing, setIsEditing] = useState(!user?.completedProfile);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(user?.avatar || '');
  const [coverPicture, setCoverPicture] = useState<string>('');
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    twitter: '',
    instagram: '',
    youtube: ''
  });
  const [bio, setBio] = useState('I\'m a learning enthusiast who loves to share knowledge and connect with others in the community.');

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

  const handleSocialLinkChange = (platform: keyof typeof socialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleResumeClick = () => {
    if (user?.verificationStatus === "verified") {
      navigate('/resume');
    } else {
      toast.info("You need to verify your account to upload your resume");
      setIsVerificationModalOpen(true);
    }
  };

  return (
    <div className="bg-dark-purple min-h-screen">
      <Navbar />
      <div className="container mx-auto py-20 pb-32 px-4">
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
                <div className="space-y-6">
                  <div>
                    <label htmlFor="bio" className="block text-white/80 text-sm font-medium mb-2">Bio</label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full bg-forest border border-mint/20 rounded-md p-2 text-white"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-white/80 text-sm font-medium mb-2">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="github" className="block text-white/70 text-xs mb-1">GitHub</label>
                        <input
                          id="github"
                          type="text"
                          value={socialLinks.github}
                          onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                          className="w-full bg-forest border border-mint/20 rounded-md p-2 text-white text-sm"
                          placeholder="https://github.com/username"
                        />
                      </div>
                      <div>
                        <label htmlFor="twitter" className="block text-white/70 text-xs mb-1">Twitter</label>
                        <input
                          id="twitter"
                          type="text"
                          value={socialLinks.twitter}
                          onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                          className="w-full bg-forest border border-mint/20 rounded-md p-2 text-white text-sm"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                      <div>
                        <label htmlFor="instagram" className="block text-white/70 text-xs mb-1">Instagram</label>
                        <input
                          id="instagram"
                          type="text"
                          value={socialLinks.instagram}
                          onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                          className="w-full bg-forest border border-mint/20 rounded-md p-2 text-white text-sm"
                          placeholder="https://instagram.com/username"
                        />
                      </div>
                      <div>
                        <label htmlFor="youtube" className="block text-white/70 text-xs mb-1">YouTube</label>
                        <input
                          id="youtube"
                          type="text"
                          value={socialLinks.youtube}
                          onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                          className="w-full bg-forest border border-mint/20 rounded-md p-2 text-white text-sm"
                          placeholder="https://youtube.com/channel/id"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="bg-mint hover:bg-mint/90 text-forest mt-6"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-6">
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

                <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                  <SocialProfileCard 
                    name={user?.name || "Your Name"}
                    bio={bio}
                    profileImageUrl={profilePicture}
                    socials={socialLinks}
                    onResumeClick={handleResumeClick}
                  />
                </div>
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
