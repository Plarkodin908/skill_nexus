
import React from "react";
import { useNavigate } from "react-router-dom";
import PostTemplate from "@/components/posts/PostTemplate";
import CommentsForm from "@/components/comments/CommentsForm";
import { Button } from "@/components/ui/button";
import { Home, Plus } from "lucide-react";

const samplePosts = [
  {
    id: 1,
    title: "Web Development",
    content: "Learn the fundamentals of web development with HTML, CSS, and JavaScript. This beginner-friendly guide will help you start your coding journey.",
    date: "May 05",
    comments: 24,
    likes: 42,
    viewerCount: 8
  },
  {
    id: 2,
    title: "React Hooks",
    content: "Master the power of React hooks. Understand useState, useEffect, useContext and create your own custom hooks for cleaner React code.",
    date: "May 01",
    comments: 18,
    likes: 37,
    viewerCount: 5
  },
  {
    id: 3,
    title: "CSS Grid",
    content: "Create complex layouts with CSS Grid. Learn how to build responsive designs that work across all modern browsers.",
    date: "Apr 28",
    comments: 12,
    likes: 29,
    viewerCount: 4
  }
];

const sampleComments = [
  {
    id: 1,
    author: "Alex Johnson",
    timestamp: "Monday, May 8th at 10:24am",
    content: "This course was exactly what I needed! The instructor explains complex concepts in a way that's easy to understand. Highly recommend!",
    likes: 8
  },
  {
    id: 2,
    author: "Taylor Smith",
    timestamp: "Sunday, May 7th at 3:45pm",
    content: "Great content! I especially enjoyed the practical exercises and real-world examples. Would love to see more advanced topics covered in a future update.",
    likes: 6
  }
];

const Posts: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Community Posts</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-mint/20 text-white hover:bg-mint/10 flex items-center gap-2"
            onClick={() => navigate('/new-post')}
          >
            <Plus className="h-4 w-4" />
            New Post
          </Button>
          <Button 
            variant="outline" 
            className="border-mint/20 text-white hover:bg-mint/10 flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
          {samplePosts.map(post => (
            <PostTemplate
              key={post.id}
              title={post.title}
              content={post.content}
              date={post.date}
              comments={post.comments}
              likes={post.likes}
              viewerCount={post.viewerCount}
            />
          ))}
        </div>
        
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-6">Discussion</h2>
          <CommentsForm comments={sampleComments} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
