import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  MoreVertical,
  Pin,
  Flag,
  Plus
} from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  replies: number;
  isPinned: boolean;
  hasUserVoted: 'up' | 'down' | null;
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: string;
  upvotes: number;
  downvotes: number;
  hasUserVoted: 'up' | 'down' | null;
}

const DiscussionThreads = () => {
  const [posts] = useState<Post[]>([
    {
      id: "1",
      title: "Best practices for React state management in 2024?",
      content: "I'm working on a large React application and wondering what the community recommends for state management. Should I stick with Context API, move to Redux Toolkit, or try something like Zustand?",
      author: {
        name: "Sarah Chen",
        avatar: "/lovable-uploads/43cf2307-26cc-408d-b7ec-b67811205dab.png",
        role: "Frontend Developer"
      },
      timestamp: "2 hours ago",
      category: "Web Development",
      tags: ["react", "state-management", "redux"],
      upvotes: 24,
      downvotes: 2,
      replies: 8,
      isPinned: true,
      hasUserVoted: null
    },
    {
      id: "2",
      title: "How to optimize machine learning model performance?",
      content: "I've trained a model that works well but is quite slow in production. Looking for tips on optimization techniques and best practices for deployment.",
      author: {
        name: "Alex Kumar",
        avatar: "/lovable-uploads/44320338-928a-4f87-80c5-b108d09edc5e.png",
        role: "Data Scientist"
      },
      timestamp: "4 hours ago",
      category: "Data Science",
      tags: ["machine-learning", "optimization", "deployment"],
      upvotes: 18,
      downvotes: 0,
      replies: 12,
      isPinned: false,
      hasUserVoted: 'up'
    },
    {
      id: "3",
      title: "Technical writing for beginners - where to start?",
      content: "I want to transition into technical writing but don't know where to begin. What skills should I focus on first?",
      author: {
        name: "Emma Wilson",
        avatar: "/lovable-uploads/54ffc2eb-8b8d-4893-beca-68661a996ce4.png",
        role: "Content Creator"
      },
      timestamp: "6 hours ago",
      category: "Content Writing",
      tags: ["technical-writing", "career", "beginner"],
      upvotes: 15,
      downvotes: 1,
      replies: 6,
      isPinned: false,
      hasUserVoted: null
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  });

  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    toast.success(`${voteType === 'up' ? 'Upvoted' : 'Downvoted'} post`);
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Post created successfully!");
    setShowCreatePost(false);
    setNewPost({ title: "", content: "", category: "", tags: "" });
  };

  const handleReply = (postId: string) => {
    if (!replyContent.trim()) {
      toast.error("Please enter a reply");
      return;
    }
    
    toast.success("Reply posted successfully!");
    setReplyContent("");
    setSelectedPost(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Web Development': return 'bg-blue-500/20 text-blue-400';
      case 'Data Science': return 'bg-green-500/20 text-green-400';
      case 'Content Writing': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Community Discussions</h2>
          <p className="text-white/60">Join conversations and share knowledge with the community</p>
        </div>
        <Button
          onClick={() => setShowCreatePost(true)}
          className="bg-mint hover:bg-mint/90 text-forest"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <Card className="bg-gradient-dark border-mint/20">
          <CardHeader>
            <CardTitle className="text-white">Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              className="bg-forest border-mint/20 text-white"
            />
            <Textarea
              placeholder="Share your thoughts, ask a question..."
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              className="bg-forest border-mint/20 text-white min-h-32"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Category"
                value={newPost.category}
                onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                className="bg-forest border-mint/20 text-white"
              />
              <Input
                placeholder="Tags (comma separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                className="bg-forest border-mint/20 text-white"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCreatePost(false)}
                className="border-mint/20 text-white hover:bg-mint/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreatePost}
                className="bg-mint hover:bg-mint/90 text-forest"
              >
                Create Post
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-gradient-dark border-mint/20 hover:border-mint/40 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {post.isPinned && (
                    <Pin className="h-4 w-4 text-mint" />
                  )}
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white">{post.author.name}</h3>
                      <Badge variant="outline" className="text-xs border-mint/20 text-mint">
                        {post.author.role}
                      </Badge>
                      <span className="text-white/40 text-sm">•</span>
                      <span className="text-white/40 text-sm">{post.timestamp}</span>
                    </div>
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{post.title}</h4>
                <p className="text-white/80 leading-relaxed">{post.content}</p>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-mint/20 text-mint/80">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <Separator className="bg-mint/10" />
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(post.id, 'up')}
                    className={`flex items-center gap-1 ${
                      post.hasUserVoted === 'up' ? 'text-green-400' : 'text-white/60 hover:text-green-400'
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.upvotes}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(post.id, 'down')}
                    className={`flex items-center gap-1 ${
                      post.hasUserVoted === 'down' ? 'text-red-400' : 'text-white/60 hover:text-red-400'
                    }`}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{post.downvotes}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    className="flex items-center gap-1 text-white/60 hover:text-mint"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.replies} replies</span>
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    className="text-white/60 hover:text-mint"
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/60 hover:text-red-400"
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Reply Input */}
              {selectedPost === post.id && (
                <div className="space-y-3 pt-4 border-t border-mint/10">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="bg-forest border-mint/20 text-white"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPost(null)}
                      className="border-mint/20 text-white hover:bg-mint/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReply(post.id)}
                      className="bg-mint hover:bg-mint/90 text-forest"
                    >
                      Post Reply
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscussionThreads;