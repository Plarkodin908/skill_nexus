
import React, { useState } from 'react';
import EnhancedNavbar from '@/components/EnhancedNavbar';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileTabs from '@/components/profile/ProfileTabs';

const Profile = () => {
  const [selectedGender, setSelectedGender] = useState('');

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

  return (
    <>
      <EnhancedNavbar />
      <div className="container mx-auto py-20 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <ProfileSidebar 
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
          />
          <div className="w-full md:w-2/3">
            <ProfileTabs courses={courses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
