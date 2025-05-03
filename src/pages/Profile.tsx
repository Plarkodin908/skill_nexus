
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import Navbar from '@/components/Navbar';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import VerificationModal from '@/components/profile/VerificationModal';
import ProgressTracker from '@/components/gamification/ProgressTracker';
import AchievementsCard from '@/components/dashboard/AchievementsCard';
import UserStatsCard from '@/components/dashboard/UserStatsCard';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');
  const [isEditing, setIsEditing] = useState(!user?.completedProfile);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(user?.avatar || '');
  const [coverPicture, setCoverPicture] = useState<string>('');

  // Sample progress data
  const progressItems = [
    { id: 1, label: "Courses Completed", currentValue: 3, targetValue: 10 },
    { id: 2, label: "Skills Acquired", currentValue: 8, targetValue: 12 },
    { id: 3, label: "Community Points", currentValue: 520, targetValue: 1000 },
    { id: 4, label: "Tutorial Contributions", currentValue: 2, targetValue: 5 }
  ];

  // Sample stats data
  const statsData = [
    { value: "85%", label: "Learning Score" },
    { value: "18", label: "Days Streak" },
    { value: "3", label: "Courses" },
    { value: "8", label: "Skills" }
  ];

  // Sample achievements data
  const achievements = [
    { type: "beginner", title: "First Course", description: "Complete your first course", earned: true },
    { type: "intermediate", title: "Streak Master", description: "Maintain a 14-day learning streak", earned: true },
    { type: "advanced", title: "Community Guide", description: "Help 5 other members", earned: false },
    { type: "expert", title: "Content Creator", description: "Create your first tutorial", earned: true },
    { type: "master", title: "Skill Expert", description: "Master 5 skills", earned: false },
    { type: "legend", title: "Pioneer", description: "Be among the first 100 users", earned: true }
  ];

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
            
            {/* Progress Dashboard - Only visible when not editing */}
            {!isEditing && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <ProgressTracker 
                    items={progressItems} 
                    className="bg-forest-light p-6 rounded-lg border border-mint/20"
                    animated={true}
                  />
                </div>
                <UserStatsCard stats={statsData} />
                <AchievementsCard achievements={achievements} />
              </div>
            )}
            
            <ProfileTabs courses={courses} />
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
