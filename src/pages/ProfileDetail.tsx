
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import VerifiedBadge from '@/components/profile/VerifiedBadge';
import { Mail, UserPlus, UserMinus, Flag } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  coverImage?: string;
  role: string;
  bio: string;
  verificationStatus: "unverified" | "pending" | "verified";
  memberSince: string;
  following: number;
  followers: number;
}

// Mock user data
const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Web Designer",
    bio: "Creative designer with 5+ years of experience in UI/UX and web design. Passionate about creating intuitive and beautiful user experiences.",
    verificationStatus: "verified",
    memberSince: "May 2023",
    following: 127,
    followers: 312
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Front-end Developer",
    bio: "Front-end developer specializing in React and modern JavaScript frameworks. Building responsive and accessible web applications.",
    verificationStatus: "verified",
    memberSince: "January 2024",
    following: 85,
    followers: 143
  }
];

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundUser = mockUsers.find(u => u.id === id);
    if (foundUser) {
      setProfile(foundUser);
    }
  }, [id]);
  
  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto pt-24 pb-16 px-4">
          <div className="text-center">
            <h2 className="text-xl text-white">User not found</h2>
            <Link to="/marketplace" className="mt-4 inline-block">
              <Button>Back to Marketplace</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? `Unfollowed ${profile.name}` : `Now following ${profile.name}`);
  };
  
  const handleMessage = () => {
    toast.success(`Message sent to ${profile.name}`);
  };
  
  const handleReport = () => {
    toast.info("Report submitted. We'll review this profile.");
  };
  
  const courses = [
    {
      id: 1,
      title: "JavaScript Basics",
      author: profile.name,
      likes: 156,
      comments: 42,
      views: 2540
    },
    {
      id: 2,
      title: "React Fundamentals",
      author: profile.name,
      likes: 231,
      comments: 78,
      views: 3620
    }
  ];
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-20 px-4">
        {/* Cover Image */}
        {profile.coverImage && (
          <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src={profile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-forest-light border border-mint/10 rounded-lg p-6 space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-2 border-mint/30 mb-4">
                  {profile.avatar ? (
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                  ) : (
                    <AvatarFallback className="bg-forest text-2xl">
                      {profile.name.substring(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {profile.name}
                  {profile.verificationStatus === "verified" && (
                    <VerifiedBadge size="md" />
                  )}
                </h2>
                
                <p className="text-mint mt-1">{profile.role}</p>
                
                <div className="flex justify-center gap-4 mt-3">
                  <div className="text-center">
                    <p className="text-white font-semibold">{profile.followers}</p>
                    <p className="text-white/60 text-sm">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">{profile.following}</p>
                    <p className="text-white/60 text-sm">Following</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  className={isFollowing ? 'w-full border border-mint/20 text-white bg-transparent hover:bg-white/5' : 'w-full bg-mint hover:bg-mint/90 text-forest'}
                  onClick={handleFollow}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-2" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                
                <Button
                  className="w-full border border-mint/20 text-mint hover:bg-mint/10 bg-transparent"
                  onClick={handleMessage}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
              
              <div className="pt-4 border-t border-mint/10">
                <h3 className="text-white text-lg font-medium mb-2">About</h3>
                <p className="text-white/70 text-sm">{profile.bio}</p>
              </div>
              
              <div className="pt-4 border-t border-mint/10">
                <div className="flex justify-between items-center">
                  <p className="text-white/60 text-sm">Member since {profile.memberSince}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/50 hover:text-white/80 hover:bg-white/5"
                    onClick={handleReport}
                  >
                    <Flag className="h-3.5 w-3.5 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content area */}
          <div className="w-full md:w-2/3">
            <ProfileTabs courses={courses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
