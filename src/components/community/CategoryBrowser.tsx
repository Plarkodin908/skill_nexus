import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Database, 
  PenTool, 
  TrendingUp, 
  Palette, 
  Users, 
  Search, 
  Filter, 
  Heart,
  MessageCircle,
  BookOpen,
  Video,
  FileText,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  icon: any;
  description: string;
  courseCount: number;
  followers: number;
  isFollowing: boolean;
  color: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  format: 'video' | 'text' | 'pdf';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  categoryId: string;
  rating: number;
  students: number;
  duration: string;
  thumbnail: string;
  price: number;
  discussions: number;
}

const CategoryBrowser = () => {
  const [categories] = useState<Category[]>([
    {
      id: "web-dev",
      name: "Web Development",
      icon: Code,
      description: "Frontend, backend, and full-stack development",
      courseCount: 234,
      followers: 12500,
      isFollowing: false,
      color: "bg-blue-500"
    },
    {
      id: "data-science",
      name: "Data Science",
      icon: Database,
      description: "Analytics, machine learning, and data visualization",
      courseCount: 189,
      followers: 8900,
      isFollowing: true,
      color: "bg-green-500"
    },
    {
      id: "writing",
      name: "Content Writing",
      icon: PenTool,
      description: "Technical writing, copywriting, and content strategy",
      courseCount: 156,
      followers: 6700,
      isFollowing: false,
      color: "bg-purple-500"
    },
    {
      id: "marketing",
      name: "Digital Marketing",
      icon: TrendingUp,
      description: "SEO, social media, and growth strategies",
      courseCount: 198,
      followers: 9800,
      isFollowing: true,
      color: "bg-orange-500"
    },
    {
      id: "design",
      name: "UI/UX Design",
      icon: Palette,
      description: "User interface and experience design",
      courseCount: 167,
      followers: 7800,
      isFollowing: false,
      color: "bg-pink-500"
    }
  ]);

  const [courses] = useState<Course[]>([
    {
      id: "1",
      title: "Advanced React Patterns",
      description: "Learn advanced React patterns including compound components, render props, and hooks",
      format: "video",
      difficulty: "advanced",
      categoryId: "web-dev",
      rating: 4.8,
      students: 1234,
      duration: "8 hours",
      thumbnail: "/lovable-uploads/43cf2307-26cc-408d-b7ec-b67811205dab.png",
      price: 89,
      discussions: 45
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      description: "Complete guide to machine learning algorithms and implementation",
      format: "text",
      difficulty: "intermediate",
      categoryId: "data-science",
      rating: 4.6,
      students: 987,
      duration: "12 hours",
      thumbnail: "/lovable-uploads/44320338-928a-4f87-80c5-b108d09edc5e.png",
      price: 129,
      discussions: 67
    },
    {
      id: "3",
      title: "Technical Writing Mastery",
      description: "Master the art of technical documentation and content creation",
      format: "pdf",
      difficulty: "beginner",
      categoryId: "writing",
      rating: 4.7,
      students: 756,
      duration: "6 hours",
      thumbnail: "/lovable-uploads/54ffc2eb-8b8d-4893-beca-68661a996ce4.png",
      price: 59,
      discussions: 23
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [formatFilter, setFormatFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [followedCategories, setFollowedCategories] = useState<string[]>(
    categories.filter(cat => cat.isFollowing).map(cat => cat.id)
  );

  const toggleFollow = (categoryId: string) => {
    setFollowedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      toast.success(
        followedCategories.includes(categoryId) 
          ? `Unfollowed ${category.name}` 
          : `Following ${category.name}`
      );
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.categoryId === selectedCategory;
    const matchesFormat = formatFilter === "all" || course.format === formatFilter;
    const matchesDifficulty = difficultyFilter === "all" || course.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesFormat && matchesDifficulty;
  });

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'text': return <BookOpen className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-gradient-dark border-mint/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="h-5 w-5" />
            Browse by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
            <Input
              placeholder="Search courses and content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-forest border-mint/20 text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={formatFilter} onValueChange={setFormatFilter}>
              <SelectTrigger className="bg-forest border-mint/20 text-white">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="bg-forest border-mint/20 text-white">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-forest border-mint/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="bg-forest border border-mint/20">
          <TabsTrigger value="categories" className="text-white data-[state=active]:bg-mint data-[state=active]:text-forest">
            Categories
          </TabsTrigger>
          <TabsTrigger value="courses" className="text-white data-[state=active]:bg-mint data-[state=active]:text-forest">
            Courses
          </TabsTrigger>
          <TabsTrigger value="following" className="text-white data-[state=active]:bg-mint data-[state=active]:text-forest">
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="bg-gradient-dark border-mint/20 hover:border-mint/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${category.color}/20`}>
                          <IconComponent className={`h-6 w-6 text-white`} />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">
                            {category.name}
                          </CardTitle>
                          <p className="text-white/60 text-sm">
                            {category.courseCount} courses
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFollow(category.id)}
                        className={`${
                          followedCategories.includes(category.id)
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-white/60 hover:text-mint'
                        }`}
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            followedCategories.includes(category.id) ? 'fill-current' : ''
                          }`} 
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-white/80 text-sm">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{category.followers.toLocaleString()} followers</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="border-mint/20 text-mint hover:bg-mint/10"
                      >
                        Browse
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-gradient-dark border-mint/20 hover:border-mint/40 transition-colors">
                <CardHeader className="pb-2">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <CardTitle className="text-white text-lg">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/80 text-sm line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                    <Badge variant="outline" className="border-mint/20 text-mint">
                      {getFormatIcon(course.format)}
                      <span className="ml-1 capitalize">{course.format}</span>
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>⭐ {course.rating} ({course.students})</span>
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{course.discussions}</span>
                    </div>
                    <span className="text-mint font-medium">${course.price}</span>
                  </div>
                  
                  <Button className="w-full bg-mint hover:bg-mint/90 text-forest">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <Card className="bg-gradient-dark border-mint/20 text-center py-12">
              <CardContent>
                <Filter className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">No courses found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories
              .filter(category => followedCategories.includes(category.id))
              .map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card key={category.id} className="bg-gradient-dark border-mint/20">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${category.color}/20`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">
                            {category.name}
                          </CardTitle>
                          <p className="text-white/60 text-sm">
                            {category.courseCount} courses
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full border-mint/20 text-mint hover:bg-mint/10"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        View Latest Updates
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
          
          {followedCategories.length === 0 && (
            <Card className="bg-gradient-dark border-mint/20 text-center py-12">
              <CardContent>
                <Heart className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 mb-4">You're not following any categories yet.</p>
                <Button
                  onClick={() => setSelectedCategory("categories")}
                  className="bg-mint hover:bg-mint/90 text-forest"
                >
                  Discover Categories
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategoryBrowser;