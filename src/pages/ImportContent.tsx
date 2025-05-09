import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ArrowLeft, Upload, FileUp, Link as LinkIcon, FileVideo } from "lucide-react";
import RequiresMembership from "@/components/membership/RequiresMembership";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ImportContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [importType, setImportType] = useState<string>("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (importType === "video" && !selectedFile.type.startsWith('video/')) {
        toast.error('Please upload a video file');
        return;
      }
      
      if (importType === "document" && 
          !['application/pdf', 'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'].includes(selectedFile.type)) {
        toast.error('Please upload a document file (PDF, DOC, DOCX, TXT)');
        return;
      }
      
      // Check file size (limit to 100MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast.error('File is too large. Maximum size is 100MB.');
        return;
      }
      
      setFile(selectedFile);
      toast.info('File selected successfully!');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (importType === "link" && !url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    if ((importType === "video" || importType === "document") && !file) {
      toast.error(`Please upload a ${importType} file`);
      return;
    }
    
    toast.success("Content imported successfully!", {
      description: "Your content has been imported and is now available.",
    });
  };
  
  // Check if the user is logged in
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Sign in Required</h1>
          <p className="mb-6">You need to sign in to import content.</p>
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
        <h1 className="text-3xl font-bold text-white">Import Content</h1>
      </div>
      
      <RequiresMembership 
        requiredMembership="Pro Learner"
        fallbackText="Importing content requires a Pro Learner or higher membership. Upgrade your plan to unlock this feature."
      >
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
          <Card className="bg-forest-light border-mint/20 text-white">
            <CardHeader>
              <CardTitle>Content Type</CardTitle>
              <CardDescription className="text-white/70">
                Select the type of content you want to import
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="video" onValueChange={setImportType} className="w-full">
                <TabsList className="grid grid-cols-3 bg-forest border border-mint/10">
                  <TabsTrigger value="video" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
                    <FileVideo className="h-4 w-4 mr-2" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="document" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
                    <FileText className="h-4 w-4 mr-2" />
                    Document
                  </TabsTrigger>
                  <TabsTrigger value="link" className="data-[state=active]:bg-mint data-[state=active]:text-forest">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Link
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="bg-forest-light border-mint/20 text-white">
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription className="text-white/70">
                Provide information about your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-title">Title</Label>
                <Input 
                  id="content-title" 
                  placeholder="Enter a title for your content..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-forest border-mint/20 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content-description">Description</Label>
                <Textarea 
                  id="content-description" 
                  placeholder="Describe your content..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-forest border-mint/20 text-white min-h-[120px]"
                />
              </div>
              
              {importType === "link" ? (
                <div className="space-y-2">
                  <Label htmlFor="content-url">URL</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                    <Input 
                      id="content-url" 
                      placeholder="https://..." 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-10 bg-forest border-mint/20 text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload {importType === "video" ? "Video" : "Document"}</Label>
                  <div className="border-2 border-dashed border-mint/20 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept={importType === "video" ? "video/*" : ".pdf,.doc,.docx,.txt"}
                      onChange={handleFileUpload}
                    />
                    {!file ? (
                      <div className="space-y-4">
                        {importType === "video" ? (
                          <FileVideo className="h-12 w-12 mx-auto text-mint/70" />
                        ) : (
                          <FileText className="h-12 w-12 mx-auto text-mint/70" />
                        )}
                        <div>
                          <p className="text-white/70 mb-2">
                            Drag and drop a {importType} file or click to browse
                          </p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="border-mint/20 text-mint hover:bg-mint/10"
                            onClick={() => document.getElementById('file-upload')?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload {importType === "video" ? "Video" : "Document"}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {importType === "video" ? (
                          <FileVideo className="h-8 w-8 mx-auto text-mint" />
                        ) : (
                          <FileText className="h-8 w-8 mx-auto text-mint" />
                        )}
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-white/70">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="border-mint/20 text-red-400 hover:bg-red-500/10"
                          onClick={() => setFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
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
              Import Content
            </Button>
          </div>
        </form>
      </RequiresMembership>
    </div>
  );
};

export default ImportContent;
