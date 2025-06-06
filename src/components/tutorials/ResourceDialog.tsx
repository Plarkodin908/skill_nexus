
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FileVideo, Upload } from "lucide-react";
import { toast } from "sonner";

interface ResourceDialogProps {
  type: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (type: string) => void;
}

const ResourceDialog = ({ type, isOpen, onOpenChange, onSubmit }: ResourceDialogProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        toast.error('Please upload a video file');
        return;
      }
      
      // Check file size (limit to 100MB for example)
      if (file.size > 100 * 1024 * 1024) {
        toast.error('Video file is too large. Maximum size is 100MB.');
        return;
      }
      
      setVideoFile(file);
      toast.info('Video selected successfully!');
    }
  };

  const needsVideoUpload = type === "Post" || type === "videos";
  const uploadId = `${type}-upload`;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-forest-light border-mint/20 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New {type}</DialogTitle>
          <DialogDescription className="text-white/70">
            Share your knowledge with the SKILL SWAP community.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor={`${type}-title`}>Title</Label>
            <Input id={`${type}-title`} placeholder="Enter a title..." className="bg-forest border-mint/20 text-white" />
          </div>
          {type === "Resource" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="resource-type">Resource Type</Label>
                <Input id="resource-type" placeholder="PDF, Link, Cheatsheet, etc..." className="bg-forest border-mint/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resource-link">URL or File</Label>
                <Input id="resource-link" placeholder="https://..." className="bg-forest border-mint/20 text-white" />
              </div>
            </>
          )}
          {needsVideoUpload && (
            <div className="space-y-2">
              <Label htmlFor={uploadId}>Video File</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="file" 
                  id={uploadId} 
                  className="bg-forest border-mint/20 text-white hidden" 
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border-mint/20 text-mint hover:bg-mint/10 flex items-center justify-center gap-2"
                  onClick={() => document.getElementById(uploadId)?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {videoFile ? 'Change Video' : 'Upload Video'}
                </Button>
              </div>
              {videoFile && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-mint/10 rounded-md">
                  <FileVideo className="h-4 w-4 text-mint" />
                  <span className="text-sm text-white/80 truncate">{videoFile.name}</span>
                  <span className="text-xs text-white/60 ml-auto">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor={`${type}-content`}>
              {type === "Resource" ? "Notes" : "Content"}
            </Label>
            <Textarea 
              id={`${type}-content`} 
              placeholder={type === "Resource" ? "Add some notes about this resource..." : "Write your content..."} 
              className="bg-forest border-mint/20 text-white min-h-[150px]" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-mint text-forest" 
            onClick={() => {
              if (needsVideoUpload && !videoFile) {
                toast.error(`Please upload a video file for your ${type.toLowerCase()}.`);
                return;
              }
              onSubmit(type);
            }}
          >
            {type === "Resource" ? "Upload Resource" : `Create ${type}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDialog;
