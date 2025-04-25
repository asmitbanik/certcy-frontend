
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle, Circle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

// Roadmap data by career path
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
  
  useState(() => {
    if (pathId && pathId in roadmaps) {
      // @ts-ignore
      setRoadmapData(roadmaps[pathId]);
      
      // Initialize task states
      // @ts-ignore
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
  });
  
  if (!roadmapData) {
    return null;
  }
  
  const handleTaskChange = (taskId: string, checked: boolean) => {
    setTaskStates((prev) => ({
      ...prev,
      [taskId]: checked
    }));
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'not-started':
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };
  
  return (
    <Layout pageTitle="Your Personalized Roadmap">
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/career-pivot")}
          className="mb-4 text-certcy-text-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Career Paths
        </Button>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {roadmapData.title} Career Path
            </h2>
            <p className="text-certcy-text-secondary">
              Total duration: {roadmapData.totalDuration}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-certcy-text-secondary mb-1">Overall Progress</div>
            <div className="flex items-center gap-2">
              <Progress value={roadmapData.progress} className="h-2 w-40 bg-gray-800" indicatorClassName="bg-blue-500" />
              <span className="text-white">{roadmapData.progress}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {roadmapData.milestones.map((milestone: any, index: number) => (
          <Card key={milestone.id} className="bg-certcy-cardbg border-gray-800 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getStatusIcon(milestone.status)}
                </div>
                <div className="flex-1">
                  <CardTitle className="flex justify-between">
                    <div>
                      <span>Week {index + 1}: {milestone.title}</span>
                    </div>
                    <div className="flex items-center text-sm font-normal text-certcy-text-secondary">
                      <Calendar className="h-4 w-4 mr-1" /> {milestone.duration}
                    </div>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-14">
              <div className="space-y-2">
                {milestone.tasks.map((task: any) => (
                  <div key={task.id} className="flex items-center gap-2">
                    <Checkbox 
                      id={task.id} 
                      checked={taskStates[task.id]} 
                      onCheckedChange={(checked) => handleTaskChange(task.id, checked === true)}
                    />
                    <label htmlFor={task.id} className={`text-sm ${taskStates[task.id] ? 'line-through text-certcy-text-secondary' : 'text-white'}`}>
                      {task.name}
                    </label>
                  </div>
                ))}
              </div>
              
              {milestone.status === "in-progress" && (
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                  Continue Learning
                </Button>
              )}
              
              {milestone.status === "not-started" && (
                <Button className="mt-4 bg-gray-700 hover:bg-gray-600 text-white" disabled>
                  Unlock When Ready
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default CareerRoadmap;
