
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Clipboard, TestTube, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillAssessmentFormProps {
  pathId: string;
  onComplete: (level: "beginner" | "intermediate" | "advanced") => void;
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    points: number;
  }[];
}

const questions: { [key: string]: AssessmentQuestion[] } = {
  "general": [
    {
      id: "tech",
      question: "How would you rate your technical skills?",
      options: [
        { value: "none", label: "No technical background", points: 0 },
        { value: "basic", label: "Basic understanding of technology", points: 1 },
        { value: "intermediate", label: "Comfortable with common technologies", points: 2 },
        { value: "advanced", label: "Advanced technical knowledge", points: 3 }
      ]
    },
    {
      id: "data",
      question: "How comfortable are you working with data?",
      options: [
        { value: "none", label: "No experience with data analysis", points: 0 },
        { value: "basic", label: "Can read basic charts and reports", points: 1 },
        { value: "intermediate", label: "Can analyze data with tools", points: 2 },
        { value: "advanced", label: "Expert in data analysis", points: 3 }
      ]
    },
    {
      id: "coding",
      question: "What's your level of programming experience?",
      options: [
        { value: "none", label: "Never coded before", points: 0 },
        { value: "basic", label: "Basic understanding of coding concepts", points: 1 },
        { value: "intermediate", label: "Can write functional code", points: 2 },
        { value: "advanced", label: "Expert programmer", points: 3 }
      ]
    }
  ],
  "data-scientist": [
    {
      id: "python",
      question: "How comfortable are you with Python programming?",
      options: [
        { value: "none", label: "Never used Python", points: 0 },
        { value: "basic", label: "Basic understanding of syntax", points: 1 },
        { value: "intermediate", label: "Can write functions and use libraries", points: 2 },
        { value: "advanced", label: "Expert in Python and its ecosystem", points: 3 }
      ]
    },
    {
      id: "stats",
      question: "What's your level of understanding in statistics?",
      options: [
        { value: "none", label: "No statistical knowledge", points: 0 },
        { value: "basic", label: "Basic probability and statistics", points: 1 },
        { value: "intermediate", label: "Understand hypothesis testing and regression", points: 2 },
        { value: "advanced", label: "Advanced statistical methods and modeling", points: 3 }
      ]
    },
    {
      id: "ml",
      question: "How familiar are you with Machine Learning concepts?",
      options: [
        { value: "none", label: "No ML knowledge", points: 0 },
        { value: "basic", label: "Understand basic concepts", points: 1 },
        { value: "intermediate", label: "Have implemented ML models", points: 2 },
        { value: "advanced", label: "Deep understanding of ML algorithms", points: 3 }
      ]
    }
  ],
  "data-analyst": [
    {
      id: "sql",
      question: "How proficient are you with SQL?",
      options: [
        { value: "none", label: "Never used SQL", points: 0 },
        { value: "basic", label: "Can write basic queries", points: 1 },
        { value: "intermediate", label: "Comfortable with JOINs and subqueries", points: 2 },
        { value: "advanced", label: "Expert in SQL optimization", points: 3 }
      ]
    },
    {
      id: "excel",
      question: "What's your level of expertise with Excel/Spreadsheets?",
      options: [
        { value: "none", label: "Basic data entry only", points: 0 },
        { value: "basic", label: "Can use basic formulas", points: 1 },
        { value: "intermediate", label: "Proficient with pivot tables and VLOOKUP", points: 2 },
        { value: "advanced", label: "Expert in advanced Excel functions", points: 3 }
      ]
    }
  ],
  "product-manager": [
    {
      id: "product",
      question: "How familiar are you with product development processes?",
      options: [
        { value: "none", label: "No experience", points: 0 },
        { value: "basic", label: "Basic understanding of product lifecycle", points: 1 },
        { value: "intermediate", label: "Have worked on product teams", points: 2 },
        { value: "advanced", label: "Led product development initiatives", points: 3 }
      ]
    },
    {
      id: "agile",
      question: "What's your experience with Agile methodologies?",
      options: [
        { value: "none", label: "No experience with Agile", points: 0 },
        { value: "basic", label: "Familiar with Agile concepts", points: 1 },
        { value: "intermediate", label: "Worked in Agile teams", points: 2 },
        { value: "advanced", label: "Scrum Master or Agile leader experience", points: 3 }
      ]
    }
  ]
};

export const SkillAssessmentForm = ({ pathId, onComplete }: SkillAssessmentFormProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const form = useForm();
  const pathQuestions = questions[pathId] || [];
  const currentQuestion = pathQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === pathQuestions.length - 1;

  const handleNext = (data: any) => {
    const selectedOption = currentQuestion.options.find(
      opt => opt.value === data[currentQuestion.id]
    );
    
    if (selectedOption) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: selectedOption.points
      }));
      
      if (isLastQuestion) {
        const totalPoints = Object.values({...answers, [currentQuestion.id]: selectedOption.points}).reduce((sum, points) => sum + points, 0);
        const maxPoints = pathQuestions.length * 3;
        const percentage = (totalPoints / maxPoints) * 100;
        
        let level: "beginner" | "intermediate" | "advanced" = "beginner";
        if (percentage >= 80) {
          level = "advanced";
        } else if (percentage >= 40) {
          level = "intermediate";
        }
        
        onComplete(level);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        form.reset();
      }
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3 text-xl font-semibold">
        <Clipboard className="h-6 w-6 text-blue-500" />
        <h2>Skill Assessment</h2>
      </div>
      
      <div className="flex gap-2 items-center text-sm text-certcy-text-secondary">
        <TestTube className="h-4 w-4" />
        Question {currentQuestionIndex + 1} of {pathQuestions.length}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <FormField
            control={form.control}
            name={currentQuestion.id}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-medium">
                  {currentQuestion.question}
                </FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid gap-3"
                >
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border p-4 cursor-pointer transition-all duration-200",
                        "hover:bg-white/5",
                        field.value === option.value ? "border-blue-500 bg-blue-500/10" : "border-gray-800"
                      )}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full group">
            {isLastQuestion ? "Complete Assessment" : "Next Question"}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </Form>
    </div>
  );
};
