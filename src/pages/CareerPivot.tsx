
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CareerPath {
  id: string;
  title: string;
  match: number;
  description: string;
  skills: string[];
  growth: string;
  salary: string;
}

const careerPaths: CareerPath[] = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    match: 92,
    description: "Analyze and interpret complex data to help organizations make better decisions.",
    skills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    growth: "High",
    salary: "$105,000 - $150,000"
  },
  {
    id: "product-manager",
    title: "Product Manager, AI",
    match: 87,
    description: "Lead the development of AI-powered products from conception to launch.",
    skills: ["Product Strategy", "User Research", "AI/ML Understanding", "Leadership", "Analytics"],
    growth: "Very High",
    salary: "$120,000 - $180,000"
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    match: 82,
    description: "Transform raw data into actionable insights through analysis and visualization.",
    skills: ["SQL", "Excel", "Data Visualization", "Statistics", "Business Intelligence"],
    growth: "Moderate",
    salary: "$75,000 - $110,000"
  },
  {
    id: "ux-researcher",
    title: "UX Researcher",
    match: 78,
    description: "Study user behaviors and needs to inform product design decisions.",
    skills: ["User Interviews", "Usability Testing", "Data Analysis", "Empathy", "Communication"],
    growth: "High",
    salary: "$90,000 - $130,000"
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    match: 73,
    description: "Design and implement machine learning models for production environments.",
    skills: ["Python", "Deep Learning", "MLOps", "Software Engineering", "Data Structures"],
    growth: "Very High",
    salary: "$110,000 - $170,000"
  }
];

const CareerPivot = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleExplore = (pathId: string) => {
    navigate(`/career-pivot/${pathId}`);
  };

  return (
    <Layout pageTitle="Career Pivot">
      <div className="mb-6">
        <p className="text-certcy-text-secondary">
          Explore AI-recommended career pivot paths based on your skills and experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerPaths.map((path) => (
          <Card key={path.id} className="bg-certcy-cardbg border-gray-800 text-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{path.title}</CardTitle>
                <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-800">
                  {path.match}% Match
                </Badge>
              </div>
              <CardDescription className="text-certcy-text-secondary">
                {path.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1 text-certcy-text-secondary">Key Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {path.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div>
                  <h4 className="text-sm font-medium mb-1 text-certcy-text-secondary">Growth</h4>
                  <p className="text-sm">{path.growth}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 text-certcy-text-secondary">Avg. Salary</h4>
                  <p className="text-sm">{path.salary}</p>
                </div>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleExplore(path.id)}
              >
                Explore Path <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default CareerPivot;
