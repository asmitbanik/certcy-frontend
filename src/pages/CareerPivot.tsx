
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, Compass, Route, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { SkillAssessmentForm } from "@/components/assessment/SkillAssessmentForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { ApiKeyInput } from "@/components/openai/ApiKeyInput";
import { analyzeContentWithOpenAI, extractWebsiteContent } from "@/services/openai";
import { Input } from "@/components/ui/input";

interface CareerPath {
  id: string;
  title: string;
  match: number;
  description: string;
  skills: string[];
  growth: string;
  salary: string;
}

// Default career paths if no OpenAI analysis is done
const defaultCareerPaths: CareerPath[] = [
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
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState<boolean>(false);
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate" | "advanced" | null>(null);
  const [showDirectPathway, setShowDirectPathway] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>(defaultCareerPaths);
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const handleExplore = (pathId: string) => {
    navigate(`/career-pivot/${pathId}`);
  };

  const handleAssessmentComplete = (level: "beginner" | "intermediate" | "advanced") => {
    setSkillLevel(level);
    setHasCompletedAssessment(true);
  };

  const handleDirectPathway = (targetCareer: string) => {
    if (!targetCareer.trim()) {
      toast.error("Please enter a career path");
      return;
    }
    
    // Find if we have this career path in our system
    const matchedPath = careerPaths.find(
      path => path.title.toLowerCase().includes(targetCareer.toLowerCase())
    );
    
    if (matchedPath) {
      setSelectedPath(matchedPath.id);
      navigate(`/career-pivot/${matchedPath.id}/roadmap`);
    } else {
      // For demonstration purposes, navigate to a generic roadmap
      toast.success(`Creating custom roadmap for ${targetCareer}`);
      navigate('/career-pivot/custom-path/roadmap', { 
        state: { customCareer: targetCareer } 
      });
    }
  };
  
  const handleAnalyzeWebsite = async () => {
    if (!apiKey) {
      toast.error("Please enter your OpenAI API key");
      return;
    }
    
    if (!websiteUrl) {
      toast.error("Please enter a website URL");
      return;
    }
    
    setLoading(true);
    
    try {
      // Extract the content from the website
      const content = await extractWebsiteContent(websiteUrl);
      
      if (!content) {
        throw new Error("Failed to extract content from the website");
      }
      
      // Analyze the content with OpenAI
      const prompt = `
        Analyze this professional profile or portfolio website content and suggest career paths
        that would be a good match for the person based on their skills and experience.
        
        For each career path, provide:
        1. A unique "id" (string, kebab-case)
        2. "title" (string, job title)
        3. "match" (number between 0-100, how well this career matches their skills)
        4. "description" (string, short description of the career)
        5. An array of 5 "skills" (strings) needed for this career
        6. "growth" (string, market growth potential: "Low", "Moderate", "High", "Very High")
        7. "salary" (string, salary range like "$X,XXX - $Y,YYY")
        
        Return exactly 5 career paths, ordered by match percentage descending.
        Return only valid JSON as an array of objects without explanations or additional text.
      `;
      
      const result = await analyzeContentWithOpenAI(content, apiKey, prompt, "career paths");
      
      if (result && Array.isArray(result)) {
        setCareerPaths(result as CareerPath[]);
        setSkillLevel("intermediate"); // Assume intermediate if we're doing website analysis
        setHasCompletedAssessment(true);
        toast.success("Analysis complete! Career recommendations generated");
      } else {
        throw new Error("Invalid response format from OpenAI");
      }
    } catch (error) {
      console.error("Error analyzing website:", error);
      toast.error("Failed to analyze the website. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hasCompletedAssessment) {
    return (
      <Layout pageTitle="Career Assessment">
        <div className="space-y-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-fade-in">
              Skill Assessment
            </h1>
            <p className="text-certcy-text-secondary mt-4 text-lg leading-relaxed animate-fade-in">
              Before exploring career options, let's assess your current skills to provide the most relevant recommendations.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Complete the assessment form</h3>
              
              <Button 
                variant="outline" 
                className="border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              >
                <Globe className="w-4 h-4 mr-2" /> 
                Analyze Portfolio Website
              </Button>
            </div>
            
            {showApiKeyInput && (
              <div className="space-y-4 p-4 border border-blue-500/20 rounded-lg bg-blue-500/5">
                <ApiKeyInput onApiKeyChange={setApiKey} />
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your portfolio or LinkedIn URL"
                    className="bg-gray-900 border-gray-700 text-white flex-grow"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                  <Button 
                    onClick={handleAnalyzeWebsite}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={loading || !apiKey || !websiteUrl}
                  >
                    {loading ? "Analyzing..." : "Analyze"}
                  </Button>
                </div>
              </div>
            )}
            
            {!showApiKeyInput && (
              <SkillAssessmentForm 
                pathId="general" 
                onComplete={handleAssessmentComplete}
              />
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Career Pivot">
      <div className="space-y-6 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-fade-in">
            Discover Your Next Career Move
          </h1>
          <p className="text-certcy-text-secondary mt-4 text-lg leading-relaxed animate-fade-in">
            Based on your {skillLevel} skill level, here are the AI-recommended career paths 
            tailored to your unique abilities and experience.
          </p>
        </div>

        {/* Direct pathway button in corner */}
        <div className="absolute top-0 right-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-blue-600/10 border-blue-500/30 text-blue-500 hover:bg-blue-600/20 flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                I know what I want
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-certcy-darkbg border-gray-800">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Already have a career in mind?</h4>
                <p className="text-sm text-certcy-text-secondary">
                  Tell us what career you want to pivot to, and we'll create a custom roadmap for you.
                </p>
                
                <div className="flex flex-col space-y-2">
                  <input 
                    type="text" 
                    placeholder="e.g., Data Scientist, Product Manager" 
                    className="bg-gray-800 border-gray-700 rounded-md p-2 text-white"
                    onKeyDown={(e) => e.key === 'Enter' && handleDirectPathway(e.currentTarget.value)}
                  />
                  
                  <Button 
                    className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      const input = (e.currentTarget.previousSibling as HTMLInputElement);
                      handleDirectPathway(input.value);
                    }}
                  >
                    <Route className="w-4 h-4" />
                    Show My Roadmap
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPaths.map((path) => (
            <Card 
              key={path.id} 
              className="bg-certcy-cardbg border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <CardHeader className="space-y-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-white">
                    <HoverCard>
                      <HoverCardTrigger>
                        <span className="cursor-help">{path.title}</span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-certcy-darkbg border-gray-800">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-white">{path.title}</h4>
                          <p className="text-sm text-certcy-text-secondary">{path.description}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </CardTitle>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "bg-blue-600/20 border-blue-800",
                      path.match >= 90 ? "text-green-400" : 
                      path.match >= 80 ? "text-blue-400" : 
                      "text-gray-400"
                    )}
                  >
                    {path.match}% Match
                  </Badge>
                </div>
                <CardDescription className="text-certcy-text-secondary min-h-[3rem]">
                  {path.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-certcy-text-secondary">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-certcy-text-secondary">
                      <TrendingUp className="w-4 h-4" />
                      <h4 className="text-sm font-medium">Growth</h4>
                    </div>
                    <p className="text-sm text-white">{path.growth}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-certcy-text-secondary">
                      <DollarSign className="w-4 h-4" />
                      <h4 className="text-sm font-medium">Salary</h4>
                    </div>
                    <p className="text-sm text-white">{path.salary}</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 group"
                  onClick={() => handleExplore(path.id)}
                >
                  Explore Path 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CareerPivot;
