import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileVideo, Link as LinkIcon, Upload, DollarSign, ArrowLeft, PlusCircle, X } from "lucide-react";
import RequiresMembership from "@/components/membership/RequiresMembership";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DeliveryAnimation from "@/components/animations/DeliveryAnimation";
import Loading from "@/components/ui/loading";

const AddCourse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [paymentType, setPaymentType] = useState("free");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [sections, setSections] = useState([{ title: "", content: "", type: "text" }]);
  const [links, setLinks] = useState([{ title: "", url: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeliveryAnimation, setShowDeliveryAnimation] = useState(false);
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        toast.error('Please upload a video file');
        return;
      }
      
      // Check file size (limit to 150MB)
      if (file.size > 150 * 1024 * 1024) {
        toast.error('Video file is too large. Maximum size is 150MB.');
        return;
      }
      
      setVideoFile(file);
      toast.info('Video selected successfully!');
    }
  };
  
  const addSection = () => {
    setSections([...sections, { title: "", content: "", type: "text" }]);
  };
  
  const removeSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };
  
  const updateSection = (index: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };
  
  const addLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };
  
  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };
  
  const updateLink = (index: number, field: string, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseTitle.trim()) {
      toast.error("Please enter a course title");
      return;
    }
    
    if (paymentType === "paid" && (isNaN(Number(price)) || Number(price) <= 0)) {
      toast.error("Please enter a valid price for your course");
      return;
    }
    
    setIsSubmitting(true);
    setShowDeliveryAnimation(true);
    
    // Simulate course submission
    setTimeout(() => {
      toast.success("Course created successfully!", {
        description: "Your course has been submitted for review.",
      });
      
      // Navigate to dashboard after successful submission
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 3000); // Show the animation for 3 seconds before completing
  };
  
  // Check if the user is logged in
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Sign in Required</h1>
          <p className="mb-6">You need to sign in to create a course.</p>
          <Button 
            className="bg-mint hover:bg-mint/90 text-forest"
            onClick={() => navigate('/auth/sign-in')}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }
  
  // If course is being submitted, show delivery animation
  if (showDeliveryAnimation) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-lg mx-auto text-center space-y-8">
          <h1 className="text-2xl font-bold text-white">Delivering your course to the marketplace...</h1>
          <div className="flex justify-center">
            <DeliveryAnimation />
          </div>
          <p className="text-white/70">
            Your course is being processed and will be available soon.
          </p>
        </div>
      </div>
    );
  }
  
  // If submitting but animation not yet shown
  if (isSubmitting) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <Loading size="large" text="Preparing your course..." />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Button 
          variant="outline" 
          size="icon" 
          className="border-mint/20 text-white hover:bg-mint/10"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold text-white">Create New Course</h1>
      </div>
      
      <RequiresMembership 
        requiredMembership="Educator"
        fallbackText="Creating courses requires an Educator membership. Upgrade your plan to unlock this feature."
      >
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
          <Card className="bg-forest-light border-mint/20 text-white">
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription className="text-white/70">
                Start by adding basic details about your course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input 
                  id="course-title" 
                  placeholder="Enter a title for your course..." 
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="bg-forest border-mint/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-description">Course Description</Label>
                <Textarea 
                  id="course-description" 
                  placeholder="Describe what your course is about..." 
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  className="bg-forest border-mint/20 text-white min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-forest-light border-mint/20 text-white">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription className="text-white/70">
                Add sections, videos, and links to your course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg">Main Course Video</Label>
                <div className="border-2 border-dashed border-mint/20 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="video-upload"
                    className="hidden"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                  {!videoFile ? (
                    <div className="space-y-4">
                      <FileVideo className="h-12 w-12 mx-auto text-mint/70" />
                      <div>
                        <p className="text-white/70 mb-2">Drag and drop a video file or click to browse</p>
                        <p className="text-white/50 text-sm mb-4">Maximum file size: 150MB for high quality files</p>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="border-mint/20 text-mint hover:bg-mint/10"
                          onClick={() => document.getElementById('video-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FileVideo className="h-8 w-8 mx-auto text-mint" />
                      <p className="text-white font-medium">{videoFile.name}</p>
                      <p className="text-white/70">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-mint/20 text-red-400 hover:bg-red-500/10"
                        onClick={() => setVideoFile(null)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove Video
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Course Sections</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-mint/20 text-mint hover:bg-mint/10"
                    onClick={addSection}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
                
                {sections.map((section, index) => (
                  <Card key={index} className="bg-forest border-mint/10 text-white">
                    <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
                      <h4 className="text-sm font-medium">Section {index + 1}</h4>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-white/60 hover:text-white/90 hover:bg-forest-light"
                        onClick={() => removeSection(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="py-3 px-4 space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor={`section-title-${index}`} className="text-sm">Title</Label>
                        <Input 
                          id={`section-title-${index}`} 
                          value={section.title}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          placeholder="Section title..."
                          className="bg-forest-light border-mint/20 text-white h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`section-content-${index}`} className="text-sm">Content</Label>
                        <Textarea 
                          id={`section-content-${index}`} 
                          value={section.content}
                          onChange={(e) => updateSection(index, 'content', e.target.value)}
                          placeholder="Section content..."
                          className="bg-forest-light border-mint/20 text-white min-h-[80px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">External Links</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-mint/20 text-mint hover:bg-mint/10"
                    onClick={addLink}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>
                
                {links.map((link, index) => (
                  <Card key={index} className="bg-forest border-mint/10 text-white">
                    <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
                      <h4 className="text-sm font-medium">Link {index + 1}</h4>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-white/60 hover:text-white/90 hover:bg-forest-light"
                        onClick={() => removeLink(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="py-3 px-4 space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor={`link-title-${index}`} className="text-sm">Title</Label>
                        <Input 
                          id={`link-title-${index}`} 
                          value={link.title}
                          onChange={(e) => updateLink(index, 'title', e.target.value)}
                          placeholder="Link title..."
                          className="bg-forest-light border-mint/20 text-white h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`link-url-${index}`} className="text-sm">URL</Label>
                        <Input 
                          id={`link-url-${index}`} 
                          value={link.url}
                          onChange={(e) => updateLink(index, 'url', e.target.value)}
                          placeholder="https://..."
                          className="bg-forest-light border-mint/20 text-white h-8"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-forest-light border-mint/20 text-white">
            <CardHeader>
              <CardTitle>Payment Options</CardTitle>
              <CardDescription className="text-white/70">
                Set your pricing strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup 
                value={paymentType} 
                onValueChange={setPaymentType}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free">Free Course</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="paid" />
                  <Label htmlFor="paid">Paid Course</Label>
                </div>
              </RadioGroup>
              
              {paymentType === "paid" && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="course-price">Course Price (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                    <Input 
                      id="course-price" 
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="19.99"
                      className="pl-10 bg-forest border-mint/20 text-white"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button 
              type="button"
              variant="outline"
              className="border-mint/20 text-white hover:bg-mint/10"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-mint hover:bg-mint/90 text-forest"
            >
              Create Course
            </Button>
          </div>
        </form>
      </RequiresMembership>
    </div>
  );
};

export default AddCourse;
