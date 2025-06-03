
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, Eye, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const mockPosts = [
    {
      id: 1,
      title: "Just completed my React certification! Here's what I learned",
      content: "After 3 months of intensive study, I finally got my React certification. The journey was challenging but incredibly rewarding...",
      upvotes: 342,
      downvotes: 12,
      comments: 28,
      timeAgo: "2 hours ago",
      category: "Achievement",
      tags: ["React", "Certification", "Learning"]
    },
    {
      id: 2,
      title: "Best practices for responsive design in 2024",
      content: "Here are some of the most important responsive design principles I've learned this year that have completely changed how I approach mobile-first design...",
      upvotes: 156,
      downvotes: 8,
      comments: 45,
      timeAgo: "1 day ago",
      category: "Tutorial",
      tags: ["CSS", "Responsive", "Mobile"]
    },
    {
      id: 3,
      title: "Looking for feedback on my portfolio redesign",
      content: "I just finished redesigning my portfolio and would love some constructive feedback from the community...",
      upvotes: 89,
      downvotes: 3,
      comments: 19,
      timeAgo: "3 days ago",
      category: "Feedback",
      tags: ["Portfolio", "Design", "Feedback"]
    }
  ];

  const mockComments = [
    {
      id: 1,
      content: "Great insights on React patterns! The useState examples were particularly helpful.",
      upvotes: 23,
      timeAgo: "1 hour ago",
      postTitle: "Advanced React Patterns"
    },
    {
      id: 2,
      content: "Thanks for sharing this tutorial. The step-by-step approach makes it easy to follow.",
      upvotes: 15,
      timeAgo: "4 hours ago",
      postTitle: "CSS Grid Layout Guide"
    }
  ];

  return (
    <Tabs defaultValue="posts" className="animate-fade-in">
      <TabsList className="w-full grid grid-cols-4 mb-6 bg-forest/50 border border-mint/20">
        <TabsTrigger value="posts" className="data-[state=active]:bg-mint data-[state=active]:text-forest">Posts</TabsTrigger>
        <TabsTrigger value="comments" className="data-[state=active]:bg-mint data-[state=active]:text-forest">Comments</TabsTrigger>
        <TabsTrigger value="courses" className="data-[state=active]:bg-mint data-[state=active]:text-forest">Courses</TabsTrigger>
        <TabsTrigger value="activity" className="data-[state=active]:bg-mint data-[state=active]:text-forest">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="space-y-4">
        {mockPosts.map((post) => (
          <Card key={post.id} className="bg-forest-light border border-mint/10 p-6 hover:border-mint/20 transition-colors">
            <div className="flex gap-4">
              {/* Reddit-style voting */}
              <div className="flex flex-col items-center gap-1 min-w-[40px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-green-500 hover:text-green-400 hover:bg-green-500/10"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
                <span className="text-white font-medium text-sm">
                  {(post.upvotes - post.downvotes).toLocaleString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <ArrowDown className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Post content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-mint/30 text-mint text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-white/60 text-sm">{post.timeAgo}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 hover:text-mint cursor-pointer">
                  {post.title}
                </h3>
                
                <p className="text-white/70 text-sm mb-3 line-clamp-2">
                  {post.content}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-mint/10 text-mint/80 text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Reddit-style action buttons */}
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5 p-2 h-auto">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5 p-2 h-auto">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5 p-2 h-auto">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="comments" className="space-y-4">
        {mockComments.map((comment) => (
          <Card key={comment.id} className="bg-forest-light border border-mint/10 p-4 hover:border-mint/20 transition-colors">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1 min-w-[40px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-green-500 hover:text-green-400 hover:bg-green-500/10"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <span className="text-white font-medium text-sm">{comment.upvotes}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white/60 text-sm">Comment on</span>
                  <span className="text-mint text-sm font-medium hover:underline cursor-pointer">
                    {comment.postTitle}
                  </span>
                  <span className="text-white/60 text-sm">• {comment.timeAgo}</span>
                </div>
                
                <p className="text-white/80 text-sm">{comment.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="courses" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-forest-light border border-mint/10 p-6 hover:border-mint/20 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-white/60 text-sm mb-4">by {course.author}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {course.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {course.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {course.views}
                  </div>
                </div>
                
                <Button size="sm" className="bg-mint hover:bg-mint/90 text-forest">
                  View Course
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="activity">
        <div className="space-y-4">
          <Card className="bg-forest-light border border-mint/10 p-4 hover:border-mint/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white/80">Upvoted "Best practices for responsive design in 2024"</span>
              <span className="ml-auto text-sm text-white/60">2 hours ago</span>
            </div>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-4 hover:border-mint/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-mint rounded-full animate-pulse"></div>
              <span className="text-white/80">Commented on "Advanced React Patterns"</span>
              <span className="ml-auto text-sm text-white/60">1 day ago</span>
            </div>
          </Card>
          <Card className="bg-forest-light border border-mint/10 p-4 hover:border-mint/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-white/80">Started following Michael Chen</span>
              <span className="ml-auto text-sm text-white/60">2 days ago</span>
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
