
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');
  const [isEditing, setIsEditing] = useState(!user?.completedProfile);

  const courses = [
    {
      id: 1,
      title: "JavaScript Basics",
      author: "Sarah Johnson",
      likes: 156,
      comments: 42,
      views: 2540
    },
    {
      id: 2,
      title: "React Fundamentals",
      author: "Michael Chen",
      likes: 231,
      comments: 78,
      views: 3620
    },
    {
      id: 3,
      title: "CSS Animations",
      author: "Emily Parker",
      likes: 98,
      comments: 25,
      views: 1785
    }
  ];

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

  return (
    <>
      <EnhancedNavbar />
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <ProfileSidebar 
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
            isEditing={isEditing}
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
              <div className="flex justify-end mb-6">
                <Button 
                  variant="outline" 
                  className="border-mint/20 text-white hover:bg-mint/10"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </div>
            )}
            <ProfileTabs courses={courses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
