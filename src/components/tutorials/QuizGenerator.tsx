import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Trophy, Clock } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizGeneratorProps {
  tutorialId: string;
  tutorialTitle: string;
  onComplete: (score: number, passed: boolean) => void;
}

const QuizGenerator = ({ tutorialId, tutorialTitle, onComplete }: QuizGeneratorProps) => {
  const [questions] = useState<Question[]>([
    {
      id: "1",
      question: "What is the main purpose of React hooks?",
      options: ["To replace class components", "To manage state and effects in functional components", "To style components", "To handle routing"],
      correctAnswer: 1,
      explanation: "React hooks allow you to use state and other React features in functional components."
    },
    {
      id: "2", 
      question: "Which hook is used for side effects?",
      options: ["useState", "useEffect", "useContext", "useCallback"],
      correctAnswer: 1,
      explanation: "useEffect is used to perform side effects like data fetching, subscriptions, or DOM manipulation."
    },
    {
      id: "3",
      question: "What does useState return?",
      options: ["A single value", "An array with state and setter", "An object", "A function"],
      correctAnswer: 1,
      explanation: "useState returns an array with two elements: the current state value and a function to update it."
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const score = calculateScore();
    const passed = score >= 70; // 70% passing grade
    setShowResults(true);
    onComplete(score, passed);
    
    if (passed) {
      toast.success(`Congratulations! You passed with ${score}%`, {
        description: "You've earned a skill verification badge!"
      });
    } else {
      toast.error(`You scored ${score}%. You need 70% to pass.`, {
        description: "Don't worry, you can retake the quiz!"
      });
    }
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter(q => 
      selectedAnswers[q.id] === q.correctAnswer
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <Card className="bg-gradient-dark border-mint/20">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl mb-4">
            Quiz: {tutorialTitle}
          </CardTitle>
          <div className="space-y-4">
            <div className="flex justify-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                <span>70% to pass</span>
              </div>
            </div>
            <p className="text-white/60 max-w-md mx-auto">
              Test your knowledge and earn a skill verification badge by scoring 70% or higher.
            </p>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={startQuiz}
            className="bg-mint hover:bg-mint/90 text-forest px-8 py-3 text-lg"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;
    
    return (
      <Card className="bg-gradient-dark border-mint/20">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl mb-4">
            Quiz Results
          </CardTitle>
          <div className="space-y-4">
            <div className={`text-6xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {score}%
            </div>
            {passed ? (
              <div className="space-y-2">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
                <p className="text-green-400 text-lg font-medium">Congratulations! You passed!</p>
                <Badge className="bg-mint text-forest">
                  <Trophy className="h-4 w-4 mr-1" />
                  Skill Verified
                </Badge>
              </div>
            ) : (
              <div className="space-y-2">
                <XCircle className="h-16 w-16 text-red-400 mx-auto" />
                <p className="text-red-400 text-lg font-medium">Keep studying and try again!</p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-white font-medium">Review:</h4>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className={`p-3 rounded border ${isCorrect ? 'border-green-400/30 bg-green-400/10' : 'border-red-400/30 bg-red-400/10'}`}>
                  <p className="text-white text-sm mb-2">{q.question}</p>
                  <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    Your answer: {q.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                  </p>
                  {!isCorrect && (
                    <p className="text-green-400 text-sm">
                      Correct: {q.options[q.correctAnswer]}
                    </p>
                  )}
                  <p className="text-white/60 text-xs mt-1">{q.explanation}</p>
                </div>
              );
            })}
          </div>
          <Button 
            onClick={() => window.location.reload()}
            className="w-full bg-mint hover:bg-mint/90 text-forest"
          >
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-gradient-dark border-mint/20">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-white">
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <div className="flex items-center gap-2 text-white/70">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Progress value={progress} className="mb-4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-white text-lg font-medium">
          {currentQ.question}
        </h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full text-left justify-start p-4 h-auto border-mint/20 text-white hover:bg-mint/10 ${
                selectedAnswers[currentQ.id] === index ? 'bg-mint/20 border-mint' : ''
              }`}
              onClick={() => handleAnswer(currentQ.id, index)}
            >
              <span className="mr-3 w-6 h-6 rounded-full border border-mint/40 flex items-center justify-center text-sm">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </Button>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQ.id] === undefined}
            className="bg-mint hover:bg-mint/90 text-forest"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizGenerator;