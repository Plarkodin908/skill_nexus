
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import CourseCard from '@/components/profile/CourseCard';

interface ProfileTabsProps {
  courses: Array<{
    id: number;
    title: string;
    author: string;
    likes: number;
    comments: number;
    views: number;
  }>;
}

const ProfileTabs = ({ courses }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="courses" className="animate-fade-in">
      <TabsList className="w-full grid grid-cols-3 mb-6 bg-dark-purple/50 border border-primary-purple/30">
        <TabsTrigger value="courses" className="data-[state=active]:bg-primary-purple data-[state=active]:text-white">Courses</TabsTrigger>
        <TabsTrigger value="skills" className="data-[state=active]:bg-primary-purple data-[state=active]:text-white">Skills</TabsTrigger>
        <TabsTrigger value="activity" className="data-[state=active]:bg-primary-purple data-[state=active]:text-white">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="courses" className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              author={course.author}
              likes={course.likes}
              comments={course.comments}
              views={course.views}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="skills">
        <h2 className="text-2xl font-bold mb-4">My Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple transition-all duration-300 animate-fade-in">
            <h3 className="font-bold">JavaScript</h3>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-purple rounded-full animate-slide-in" 
                style={{ width: '85%' }}
              ></div>
            </div>
          </Card>
          <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold">React</h3>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-purple rounded-full animate-slide-in" 
                style={{ width: '75%', animationDelay: '0.1s' }}
              ></div>
            </div>
          </Card>
          <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold">CSS</h3>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-purple rounded-full animate-slide-in" 
                style={{ width: '90%', animationDelay: '0.2s' }}
              ></div>
            </div>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple hover:translate-x-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-purple rounded-full animate-pulse"></div>
              <span>Completed "Advanced React Patterns" course</span>
              <span className="ml-auto text-sm text-gray-400">2 days ago</span>
            </div>
          </Card>
          <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple hover:translate-x-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-purple rounded-full animate-pulse"></div>
              <span>Posted a new tutorial on CSS animations</span>
              <span className="ml-auto text-sm text-gray-400">1 week ago</span>
            </div>
          </Card>
          <Card className="p-4 bg-dark-purple border-primary-purple/30 hover:border-primary-purple hover:translate-x-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-purple rounded-full animate-pulse"></div>
              <span>Joined a new study group for TypeScript</span>
              <span className="ml-auto text-sm text-gray-400">2 weeks ago</span>
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
