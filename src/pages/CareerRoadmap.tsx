import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MilestoneProgress } from "@/components/roadmap/MilestoneProgress";

const roadmaps = {
  "data-scientist": {
    title: "Data Scientist",
    totalDuration: "24 weeks",
    progress: 25,
    milestones: [
      {
        id: "m1",
        title: "Python Foundations",
        duration: "4 weeks",
        status: "completed",
        tasks: [
          { id: "t1-1", name: "Introduction to Python", completed: true },
          { id: "t1-2", name: "Data Structures in Python", completed: true },
          { id: "t1-3", name: "Functions and Modules", completed: true },
          { id: "t1-4", name: "Python Project: Data Processing", completed: true }
        ]
      },
      {
        id: "m2",
        title: "Data Analysis with Python",
        duration: "6 weeks",
        status: "in-progress",
        tasks: [
          { id: "t2-1", name: "NumPy for Numerical Computing", completed: true },
          { id: "t2-2", name: "Pandas for Data Analysis", completed: true },
          { id: "t2-3", name: "Data Visualization with Matplotlib", completed: false },
          { id: "t2-4", name: "Exploratory Data Analysis", completed: false },
          { id: "t2-5", name: "Project: Analyze & Visualize Dataset", completed: false }
        ]
      },
      {
        id: "m3",
        title: "Machine Learning Basics",
        duration: "8 weeks",
        status: "not-started",
        tasks: [
          { id: "t3-1", name: "Introduction to Machine Learning", completed: false },
          { id: "t3-2", name: "Supervised Learning Algorithms", completed: false },
          { id: "t3-3", name: "Model Evaluation & Validation", completed: false },
          { id: "t3-4", name: "Project: Build a Predictive Model", completed: false }
        ]
      },
      {
        id: "m4",
        title: "Advanced Machine Learning",
        duration: "6 weeks",
        status: "not-started",
        tasks: [
          { id: "t4-1", name: "Unsupervised Learning", completed: false },
          { id: "t4-2", name: "Deep Learning Fundamentals", completed: false },
          { id: "t4-3", name: "Natural Language Processing", completed: false },
          { id: "t4-4", name: "Capstone Project", completed: false }
        ]
      }
    ]
  },
  "product-manager": {
    title: "Product Manager, AI",
    totalDuration: "20 weeks",
    progress: 15,
    milestones: [
      {
        id: "m1",
        title: "Product Management Fundamentals",
        duration: "4 weeks",
        status: "completed",
        tasks: [
          { id: "t1-1", name: "Introduction to Product Management", completed: true },
          { id: "t1-2", name: "User Research & Requirements", completed: true },
          { id: "t1-3", name: "Roadmapping & Prioritization", completed: true }
        ]
      },
      {
        id: "m2",
        title: "AI Concepts for Product Managers",
        duration: "6 weeks",
        status: "in-progress",
        tasks: [
          { id: "t2-1", name: "Introduction to Machine Learning", completed: true },
          { id: "t2-2", name: "AI Use Cases & Applications", completed: false },
          { id: "t2-3", name: "Ethics in AI Product Development", completed: false }
        ]
      }
    ]
  },
  "data-analyst": {
    title: "Data Analyst",
    totalDuration: "16 weeks",
    progress: 40,
    milestones: [
      {
        id: "m1",
        title: "SQL Fundamentals",
        duration: "4 weeks",
        status: "in-progress",
        tasks: [
          { id: "t1-1", name: "SQL Basics", completed: true },
          { id: "t1-2", name: "SQL Joins & Relationships", completed: true },
          { id: "t1-3", name: "SQL Aggregations", completed: false },
          { id: "t1-4", name: "Advanced SQL Queries", completed: false }
        ]
      }
    ]
  }
};

const CareerRoadmap = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const navigate = useNavigate();
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [taskStates, setTaskStates] = useState<{[key: string]: boolean}>({});
  const [lastCompletedTask, setLastCompletedTask] = useState<string | null>(null);
  
  useEffect(() => {
    if (pathId && pathId in roadmaps) {
      // @ts-ignore
      setRoadmapData(roadmaps[pathId]);
      
      // Initialize task states
      const initialTaskStates: {[key: string]: boolean} = {};
      // @ts-ignore
      roadmaps[pathId].milestones.forEach((milestone: any) => {
        milestone.tasks.forEach((task: any) => {
          initialTaskStates[task.id] = task.completed;
        });
      });
      
      setTaskStates(initialTaskStates);
    } else {
      navigate("/career-pivot");
    }
  }, [pathId, navigate]);
  
  if (!roadmapData) {
    return null;
  }
  
  const handleTaskChange = (taskId: string, checked: boolean) => {
    setTaskStates((prev) => ({
      ...prev,
      [taskId]: checked
    }));
    
    if (checked) {
      setLastCompletedTask(taskId);
      setTimeout(() => setLastCompletedTask(null), 2000);
    }
  };
  
  const totalTasks = roadmapData.milestones.reduce(
    (acc: number, milestone: any) => acc + milestone.tasks.length,
    0
  );
  
  const completedTasks = Object.values(taskStates).filter(Boolean).length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Layout pageTitle="Your Personalized Roadmap">
      <div className="mb-8 space-y-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/career-pivot")}
          className="text-certcy-text-secondary group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Career Paths
        </Button>
        
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-white">
              {roadmapData.title} Career Path
            </h2>
            <p className="text-certcy-text-secondary flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total duration: {roadmapData.totalDuration}
            </p>
          </div>
          
          <div className="bg-certcy-cardbg border border-gray-800 rounded-lg p-4 min-w-[200px]">
            <div className="text-sm text-certcy-text-secondary mb-2">Overall Progress</div>
            <div className="flex items-center gap-3">
              <Progress 
                value={progressPercentage} 
                className={cn(
                  "h-2 flex-1",
                  "bg-gray-800/50 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-blue-400"
                )} 
              />
              <span className="text-white font-medium min-w-[3ch]">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {roadmapData.milestones.map((milestone: any, index: number) => (
          <div 
            key={milestone.id}
            className={cn(
              "transform transition-all duration-500",
              lastCompletedTask && milestone.tasks.some((t: any) => t.id === lastCompletedTask)
                ? "scale-[1.02]"
                : "scale-100"
            )}
          >
            <MilestoneProgress
              milestone={milestone}
              index={index}
              onTaskChange={handleTaskChange}
              taskStates={taskStates}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CareerRoadmap;
