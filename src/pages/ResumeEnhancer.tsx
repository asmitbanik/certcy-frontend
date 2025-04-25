
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ResumeEnhancer = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    resumeText: "",
    targetRole: "",
    targetIndustry: ""
  });
  
  const [results, setResults] = useState<{
    strengths: string[];
    improvements: string[];
    keywords: string[];
    score: number;
    enhancedResume: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data
      setResults({
        strengths: [
          "Strong technical skills highlighting SQL and data visualization",
          "Clear progression in previous roles",
          "Quantified achievements with metrics",
          "Good educational background for data roles"
        ],
        improvements: [
          "Add keywords related to specific data analytics tools",
          "Highlight collaborative projects and cross-functional experience",
          "Include more industry-specific achievements",
          "Restructure experience section to highlight relevant projects first"
        ],
        keywords: [
          "Tableau", "Power BI", "Data modeling", "A/B testing", "Statistical analysis",
          "ETL processes", "KPI monitoring", "Cross-functional collaboration"
        ],
        score: 72,
        enhancedResume: formData.resumeText + "\n\n[Enhanced with additional industry keywords and restructured to highlight relevant experience first]"
      });
      
      setLoading(false);
      setStep(2);
      
      toast({
        title: "Resume analyzed successfully",
        description: "We've analyzed your resume and generated enhancement recommendations.",
      });
    }, 2000);
  };
  
  return (
    <Layout pageTitle="Resume Enhancer">
      {step === 1 ? (
        <Card className="bg-certcy-cardbg border-gray-800 text-white">
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription className="text-certcy-text-secondary">
              Paste your resume content and provide details about your target role for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resumeText">Resume Content</Label>
              <Textarea 
                id="resumeText"
                name="resumeText"
                placeholder="Paste your resume text here..."
                className="h-60 bg-gray-900 border-gray-700 text-white" 
                value={formData.resumeText}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role</Label>
                <Select onValueChange={(value) => handleSelectChange("targetRole", value)}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="data-analyst">Data Analyst</SelectItem>
                    <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                    <SelectItem value="ux-researcher">UX Researcher</SelectItem>
                    <SelectItem value="ml-engineer">Machine Learning Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetIndustry">Target Industry</Label>
                <Select onValueChange={(value) => handleSelectChange("targetIndustry", value)}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
              disabled={!formData.resumeText || !formData.targetRole || !formData.targetIndustry || loading}
            >
              {loading ? "Analyzing..." : 
                <>
                  <Upload className="h-4 w-4 mr-2" /> Analyze My Resume
                </>
              }
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-certcy-cardbg border-gray-800 text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Resume Score</CardTitle>
                  <div className={`text-xl font-bold ${results?.score && results.score >= 70 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {results?.score}/100
                  </div>
                </div>
                <CardDescription className="text-certcy-text-secondary">
                  How well your resume matches the target role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${
                    results?.score && results.score >= 70 ? 'border-green-500 text-green-500' : 'border-yellow-500 text-yellow-500'
                  }`}>
                    {results?.score}%
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-center w-full text-certcy-text-secondary">
                  {results?.score && results.score >= 70 
                    ? "Good match! A few tweaks will make it even better."
                    : "Your resume needs some adjustments to better match the role."}
                </p>
              </CardFooter>
            </Card>
            
            <Card className="bg-certcy-cardbg border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" /> Strengths
                </CardTitle>
                <CardDescription className="text-certcy-text-secondary">
                  What's working well in your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results?.strengths.map((strength, index) => (
                    <li key={index} className="text-sm flex gap-2">
                      <span className="text-green-500">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-certcy-cardbg border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" /> Improvement Areas
                </CardTitle>
                <CardDescription className="text-certcy-text-secondary">
                  Suggested improvements for your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results?.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm flex gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-certcy-cardbg border-gray-800 text-white">
            <CardHeader>
              <CardTitle>Missing Keywords</CardTitle>
              <CardDescription className="text-certcy-text-secondary">
                Consider adding these keywords to your resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results?.keywords.map((keyword, index) => (
                  <div key={index} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-md text-sm">
                    {keyword}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-certcy-cardbg border-gray-800 text-white">
            <CardHeader>
              <CardTitle>Enhanced Resume</CardTitle>
              <CardDescription className="text-certcy-text-secondary">
                Here's your AI-enhanced resume optimized for your target role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                className="h-60 bg-gray-900 border-gray-700 text-white" 
                value={results?.enhancedResume}
                readOnly
              />
            </CardContent>
            <CardFooter>
              <div className="flex gap-4 w-full">
                <Button 
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => setStep(1)}
                >
                  Edit Original
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    toast({
                      title: "Resume downloaded",
                      description: "Your enhanced resume has been downloaded as a PDF.",
                    });
                  }}
                >
                  Download Enhanced Resume
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default ResumeEnhancer;
