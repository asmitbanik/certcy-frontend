
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data
const careerPaths = {
  "data-scientist": {
    title: "Data Scientist",
    description: "Analyze and interpret complex data to help organizations make better decisions.",
    courses: [
      {
        id: "ds-1",
        title: "Python for Data Science and Machine Learning",
        provider: "Coursera",
        level: "Intermediate",
        duration: "10 weeks",
        description: "Learn how to use Python for data analysis, visualization, and machine learning.",
        skills: ["Python", "NumPy", "Pandas", "Scikit-Learn", "TensorFlow"]
      },
      {
        id: "ds-2",
        title: "Statistical Thinking for Data Science",
        provider: "edX",
        level: "Intermediate",
        duration: "8 weeks",
        description: "Master statistical concepts essential for data science and analytics.",
        skills: ["Statistics", "Hypothesis Testing", "Experiment Design", "Probability"]
      },
      {
        id: "ds-3",
        title: "Machine Learning A-Z",
        provider: "Udemy",
        level: "Beginner to Advanced",
        duration: "12 weeks",
        description: "Comprehensive course covering all aspects of machine learning with hands-on projects.",
        skills: ["Regression", "Classification", "Clustering", "Natural Language Processing"]
      }
    ]
  },
  "product-manager": {
    title: "Product Manager, AI",
    description: "Lead the development of AI-powered products from conception to launch.",
    courses: [
      {
        id: "pm-1",
        title: "AI Product Management Specialization",
        provider: "Coursera",
        level: "Advanced",
        duration: "12 weeks",
        description: "Learn how to develop AI strategy and manage AI products effectively.",
        skills: ["AI Strategy", "Product Requirements", "Ethics in AI", "Product Analytics"]
      },
      {
        id: "pm-2",
        title: "Product Management Fundamentals",
        provider: "Product School",
        level: "Intermediate",
        duration: "8 weeks",
        description: "Master the core skills needed to be an effective product manager.",
        skills: ["User Stories", "Roadmapping", "Stakeholder Management", "Prioritization"]
      }
    ]
  },
  "data-analyst": {
    title: "Data Analyst",
    description: "Transform raw data into actionable insights through analysis and visualization.",
    courses: [
      {
        id: "da-1",
        title: "SQL for Data Analysis",
        provider: "Udacity",
        level: "Beginner",
        duration: "4 weeks",
        description: "Learn SQL fundamentals for querying databases and extracting insights.",
        skills: ["SQL Basics", "Joins", "Aggregations", "Window Functions"]
      },
      {
        id: "da-2",
        title: "Data Visualization with Tableau",
        provider: "Coursera",
        level: "Intermediate",
        duration: "6 weeks",
        description: "Master the art of creating impactful visualizations with Tableau.",
        skills: ["Dashboard Design", "Interactive Visualizations", "Data Storytelling"]
      }
    ]
  },
  "ux-researcher": {
    title: "UX Researcher",
    description: "Study user behaviors and needs to inform product design decisions.",
    courses: [
      {
        id: "ux-1",
        title: "Introduction to User Research",
        provider: "Interaction Design Foundation",
        level: "Beginner",
        duration: "6 weeks",
        description: "Learn fundamental user research methods and when to apply them.",
        skills: ["Interview Techniques", "Usability Testing", "Survey Design", "Research Ethics"]
      }
    ]
  },
  "ml-engineer": {
    title: "Machine Learning Engineer",
    description: "Design and implement machine learning models for production environments.",
    courses: [
      {
        id: "ml-1",
        title: "Deep Learning Specialization",
        provider: "Coursera",
        level: "Advanced",
        duration: "16 weeks",
        description: "Master deep learning techniques including neural networks and CV.",
        skills: ["Neural Networks", "Computer Vision", "NLP", "TensorFlow"]
      }
    ]
  }
};

const CareerPathDetail = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const navigate = useNavigate();
  const [pathData, setPathData] = useState<any>(null);
  
  useEffect(() => {
    if (pathId && pathId in careerPaths) {
      // @ts-ignore
      setPathData(careerPaths[pathId]);
    } else {
      navigate("/career-pivot");
    }
  }, [pathId, navigate]);
  
  if (!pathData) {
    return null;
  }
  
  return (
    <Layout pageTitle={pathData.title}>
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate("/career-pivot")}
          className="mb-4 text-certcy-text-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Career Paths
        </Button>
        <p className="text-certcy-text-secondary">
          {pathData.description}
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Recommended Courses</h2>
        <p className="text-certcy-text-secondary mb-6">
          These courses will help you build the skills needed for this career path. Select courses to include in your personalized roadmap.
        </p>
        
        <div className="space-y-4">
          {pathData.courses.map((course: any) => (
            <Card key={course.id} className="bg-certcy-cardbg border-gray-800 text-white">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-800">
                    {course.provider}
                  </Badge>
                </div>
                <CardDescription className="text-certcy-text-secondary">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-certcy-text-secondary" />
                    <span className="text-sm">{course.level}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-certcy-text-secondary" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-certcy-text-secondary" />
                    <span className="text-sm">5 modules</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1 text-certcy-text-secondary">Skills You'll Learn</h4>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => navigate(`/career-pivot/${pathId}/roadmap`)}
                >
                  Add to Roadmap
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          onClick={() => navigate(`/career-pivot/${pathId}/roadmap`)}
        >
          Build My Personalized Roadmap
        </Button>
      </div>
    </Layout>
  );
};

export default CareerPathDetail;
