
import { useState } from "react";
import { toast } from "sonner";
import HeaderSection from "@/components/tutorials/HeaderSection";
import TabsSection from "@/components/tutorials/TabsSection";
import ResourceDialog from "@/components/tutorials/ResourceDialog";
import QuizGenerator from "@/components/tutorials/QuizGenerator";

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);
  
  const handleAddResource = (type: string) => {
    setActiveDialog(type);
  };
  
  const handleSubmitResource = (type: string) => {
    toast.success(`New ${type} added!`, {
      description: `Your ${type.toLowerCase()} has been created successfully.`,
    });
    setActiveDialog(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed) {
      toast.success(`Congratulations! You scored ${score}% and earned a skill badge!`);
    } else {
      toast.error(`You scored ${score}%. Try again to earn your badge!`);
    }
  };

  const startQuiz = (tutorialId: string) => {
    setSelectedTutorial(tutorialId);
    setShowQuiz(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSection 
        onAddResource={handleAddResource}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      
      <TabsSection onResourceAdd={handleAddResource} onStartQuiz={startQuiz} />
      
      {/* Quiz Section */}
      {showQuiz && selectedTutorial && (
        <div className="mt-8">
          <QuizGenerator
            tutorialId={selectedTutorial}
            tutorialTitle="React Advanced Concepts"
            onComplete={handleQuizComplete}
          />
        </div>
      )}
      
      {/* Resource Dialog for Post */}
      <ResourceDialog
        type="Post"
        isOpen={activeDialog === "Post"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
        onSubmit={handleSubmitResource}
      />
      
      {/* Resource Dialog for Resource */}
      <ResourceDialog
        type="Resource"
        isOpen={activeDialog === "Resource"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
        onSubmit={handleSubmitResource}
      />
      
      {/* Resource Dialog for posts tab */}
      <ResourceDialog
        type="posts"
        isOpen={activeDialog === "posts"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
        onSubmit={handleSubmitResource}
      />
      
      {/* Resource Dialog for articles tab */}
      <ResourceDialog
        type="articles"
        isOpen={activeDialog === "articles"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
        onSubmit={handleSubmitResource}
      />
      
      {/* Resource Dialog for videos tab */}
      <ResourceDialog
        type="videos"
        isOpen={activeDialog === "videos"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
        onSubmit={handleSubmitResource}
      />
    </div>
  );
};

export default Tutorials;
