import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import VerificationModal from '@/components/profile/VerificationModal';
import VerifiedBadge from '@/components/profile/VerifiedBadge';
import { Calendar, MapPin, ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, Trophy } from 'lucide-react';
const Profile = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');
  const [isEditing, setIsEditing] = useState(!user?.completedProfile);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>(user?.avatar || '');
  const [coverPicture, setCoverPicture] = useState<string>('');
  const handleProfilePictureChange = (url: string) => {
    setProfilePicture(url);
  };
  const handleCoverPictureChange = (url: string) => {
    setCoverPicture(url);
  };
  const handleSaveChanges = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
    if (!user?.completedProfile) {
      setTimeout(() => {
        navigate('/pricing');
      }, 1500);
    }
  };
  const handleVerifyAccount = () => {
    setIsVerificationModalOpen(true);
  };

  // Mock user stats - Reddit style
  const userStats = {
    karma: 2847,
    posts: 43,
    comments: 158,
    followers: 312,
    following: 127
  };

  // Mock user data
  const userInfo = {
    name: user?.name || "Anonymous User",
    role: "Learning Enthusiast",
    location: "Learning Community",
    memberSince: "May 2023",
    bio: "Passionate learner exploring new skills and connecting with the community. Always eager to share knowledge and learn from others.",
    skills: ["JavaScript", "React", "UI/UX Design", "Problem Solving", "Communication"],
    experience: [{
      title: "Active Community Member",
      duration: "2023 - Present"
    }, {
      title: "Skill Learner",
      duration: "2022 - Present"
    }]
  };

  // Mock recent activity
  const recentPosts = [{
    id: 1,
    title: "Just completed my first React project!",
    content: "After weeks of learning, I finally built my first React application. The journey was challenging but incredibly rewarding...",
    upvotes: 42,
    comments: 8,
    timeAgo: "2 hours ago",
    category: "Achievement"
  }, {
    id: 2,
    title: "Looking for study partners for JavaScript",
    content: "Anyone interested in forming a study group for advanced JavaScript concepts?",
    upvotes: 23,
    comments: 12,
    timeAgo: "1 day ago",
    category: "Study Group"
  }];
  return <div className="bg-dark-purple min-h-screen relative">
      <div className="grid-pattern-container"></div>
      <div className="grid-pattern-overlay"></div>
      
      <Navbar />
      
      {/* LinkedIn-style cover section */}
      <div className="relative pt-16">
        <div className="h-48 bg-gradient-to-r from-mint/20 to-forest/40 relative">
          {coverPicture && <img src={coverPicture} alt="Cover" className="w-full h-full object-cover" />}
        </div>
        
        {/* Profile header with LinkedIn layout */}
        <div className="container mx-auto px-4 relative">
          <div className="bg-forest-light border border-mint/10 rounded-lg -mt-20 relative z-10 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile picture and basic info */}
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <Avatar className="h-32 w-32 border-4 border-mint/30">
                  {profilePicture ? <AvatarImage src={profilePicture} alt={userInfo.name} /> : <AvatarFallback className="bg-forest text-3xl">
                      {userInfo.name.substring(0, 2)}
                    </AvatarFallback>}
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-white">{userInfo.name}</h1>
                    {user?.verificationStatus === "verified" && <VerifiedBadge size="md" />}
                  </div>
                  
                  <p className="text-mint text-lg mb-2">{userInfo.role}</p>
                  
                  <div className="flex flex-wrap gap-4 text-white/60 text-sm mb-3 my-[15px]">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userInfo.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since {userInfo.memberSince}
                    </div>
                  </div>
                  
                  {/* Reddit-style stats */}
                  <div className="flex flex-wrap gap-6 mb-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{userStats.karma.toLocaleString()}</p>
                      <p className="text-white/60 text-sm">Karma</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{userStats.followers}</p>
                      <p className="text-white/60 text-sm">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{userStats.following}</p>
                      <p className="text-white/60 text-sm">Following</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{userStats.posts}</p>
                      <p className="text-white/60 text-sm">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{userStats.comments}</p>
                      <p className="text-white/60 text-sm">Comments</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col gap-3 min-w-[200px]">
                {!isEditing ? <Button variant="outline" className="border-mint/20 text-white hover:bg-mint/10" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button> : <Button className="bg-mint hover:bg-mint/90 text-forest" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>}
                
                {user?.verificationStatus === "unverified" && <Button className="bg-mint hover:bg-mint/90 text-forest" onClick={handleVerifyAccount}>
                    Verify Account
                  </Button>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - LinkedIn style */}
          <div className="space-y-6">
            {/* Profile sidebar for editing */}
            {isEditing && <ProfileSidebar selectedGender={selectedGender} onGenderChange={setSelectedGender} isEditing={isEditing} onProfilePictureChange={handleProfilePictureChange} onCoverPictureChange={handleCoverPictureChange} />}
            
            {/* About section */}
            <Card className="bg-forest-light border border-mint/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">About</h3>
              <p className="text-white/70 text-sm leading-relaxed">{userInfo.bio}</p>
            </Card>
            
            {/* Skills section */}
            <Card className="bg-forest-light border border-mint/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userInfo.skills.map((skill, index) => <Badge key={index} variant="secondary" className="bg-mint/20 text-mint hover:bg-mint/30">
                    {skill}
                  </Badge>)}
              </div>
            </Card>
            
            {/* Experience section */}
            <Card className="bg-forest-light border border-mint/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Experience</h3>
              <div className="space-y-4">
                {userInfo.experience.map((exp, index) => <div key={index} className="border-l-2 border-mint/30 pl-4">
                    <h4 className="font-medium text-white">{exp.title}</h4>
                    <p className="text-white/60 text-xs">{exp.duration}</p>
                  </div>)}
              </div>
            </Card>

            {/* Privacy Notice */}
            <Card className="bg-forest-light border border-mint/10 p-4">
              <h4 className="text-sm font-medium text-white/80 mb-2">Privacy & Content</h4>
              <p className="text-white/60 text-xs mb-2">
                All content and personal information shared on this profile is subject to our privacy policy.
              </p>
              <p className="text-white/60 text-xs">
                © {new Date().getFullYear()} SKILL NEXUS. User-generated content remains property of respective creators.
              </p>
              <div className="mt-2">
                <Link to="/legal" className="text-mint text-xs hover:underline">
                  Privacy Policy & Terms
                </Link>
              </div>
            </Card>
          </div>
          
          {/* Main content - Reddit style posts */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            
            {recentPosts.map(post => {})}
          </div>
        </div>
      </div>
      
      <VerificationModal isOpen={isVerificationModalOpen} onClose={() => setIsVerificationModalOpen(false)} />
    </div>;
};
export default Profile;