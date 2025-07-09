import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
const EmptyCoursesState = () => {
  const navigate = useNavigate();
  const handleCreateCourse = () => {
    navigate("/add-course");
  };
  const handleImportContent = () => {
    navigate("/import-content");
  };
  return <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="floating-card-outer p-[2px] max-w-lg w-full">
        <div className="floating-card-inner bg-dark-purple p-8 rounded-xl w-full">
          <BookOpen className="h-16 w-16 text-primary-purple mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold text-white mb-2">No Courses Available Yet</h2>
          <p className="text-white/70 mb-6">Be the first to share your knowledge with our community by creating an engaging course.</p>
          <p className="text-white/70 mb-6 text-sm">Maximum file size: 150MB for high quality content</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary-purple hover:bg-primary-purple/90 text-dark-purple flex items-center gap-2 hover-scale" onClick={handleCreateCourse}>
              <PlusCircle className="h-4 w-4" />
              Create a Course
            </Button>
            <Button variant="outline" onClick={handleImportContent} className="border-primary-purple/20 text-primary-purple hover:bg-primary-purple/10 flex items-center gap-2 text-slate-50">
              <Upload className="h-4 w-4" />
              Import Content
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default EmptyCoursesState;