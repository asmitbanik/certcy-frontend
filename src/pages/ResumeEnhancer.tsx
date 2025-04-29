import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle, AlertCircle, Globe, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { ApiKeyInput } from "@/components/openai/ApiKeyInput";
import { analyzeContentWithOpenAI, extractWebsiteContent } from "@/services/openai";

interface ResumeAnalysisResult {
  strengths: string[];
  improvements: string[];
  keywords: string[];
  score: number;
  enhancedResume: string;
}

const ResumeEnhancer = () => {
  const { toast: uiToast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState<"text" | "website">("text");
  const [apiKey, setApiKey] = useState<string>("");
  const [formData, setFormData] = useState({
    resumeText: "",
    websiteUrl: "",
    targetRole: "",
    targetIndustry: ""
  });
  
  const [results, setResults] = useState<ResumeAnalysisResult | null>(null);

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

  const handleFetchWebsiteContent = async () => {
    if (!formData.websiteUrl) {
      toast.error("Please enter a valid website URL");
      return;
    }
    
    setLoading(true);
    
    try {
      const content = await extractWebsiteContent(formData.websiteUrl);
      if (content) {
        setFormData(prev => ({
          ...prev,
          resumeText: content.substring(0, 5000) // Limiting to 5000 chars for OpenAI token limits
        }));
        toast.success("Website content extracted successfully");
      }
    } catch (error) {
      console.error("Error fetching website content:", error);
      toast.error("Failed to extract content from the website");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!apiKey) {
      toast.error("Please enter your OpenAI API key first");
      return;
    }

    if (!formData.resumeText) {
      toast.error("Please enter resume text or extract from a website");
      return;
    }

    if (!formData.targetRole || !formData.targetIndustry) {
      toast.error("Please select a target role and industry");
      return;
    }

    setLoading(true);
    
    const prompt = `
      Analyze the provided resume or professional profile for a person targeting a ${formData.targetRole} role in the ${formData.targetIndustry} industry.
      
      Provide the following in valid JSON format:
      1. A list of "strengths" (array of strings) highlighting what works well in the resume
      2. A list of "improvements" (array of strings) with suggestions for improvement
      3. A list of missing "keywords" (array of strings) that would improve the resume for ATS systems
      4. A numerical "score" from 0-100 representing how well the resume matches the target role
      5. An "enhancedResume" (string) with the original text enhanced for the target role
      
      Return only valid JSON without explanations or additional text.
    `;

    try {
      const result = await analyzeContentWithOpenAI(
        formData.resumeText,
        apiKey,
        prompt,
        "resume analysis"
      );
      
      if (result) {
        setResults(result as ResumeAnalysisResult);
        setStep(2);
        toast.success("Resume analyzed successfully");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout pageTitle="Resume Enhancer">
      <div className="space-y-6">
        <ApiKeyInput onApiKeyChange={setApiKey} />
        
        {step === 1 ? (
          <Card className="bg-certcy-cardbg border-gray-800 text-white">
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription className="text-certcy-text-secondary">
                Paste your resume content or enter a website URL for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Button 
                  variant={inputMode === "text" ? "default" : "outline"}
                  onClick={() => setInputMode("text")}
                  className={inputMode === "text" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-700"}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Paste Text
                </Button>
                <Button 
                  variant={inputMode === "website" ? "default" : "outline"}
                  onClick={() => setInputMode("website")}
                  className={inputMode === "website" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-700"}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Website URL
                </Button>
              </div>
              
              {inputMode === "text" ? (
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
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="websiteUrl"
                        name="websiteUrl"
                        placeholder="https://www.example.com/profile"
                        className="bg-gray-900 border-gray-700 text-white flex-grow"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                      />
                      <Button 
                        onClick={handleFetchWebsiteContent} 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={loading || !formData.websiteUrl}
                      >
                        Extract
                      </Button>
                    </div>
                  </div>
                  
                  {formData.resumeText && (
                    <div className="space-y-2">
                      <Label>Extracted Content Preview</Label>
                      <div className="bg-gray-900 border border-gray-700 rounded-md p-3 h-40 overflow-y-auto text-sm">
                        {formData.resumeText.substring(0, 500)}
                        {formData.resumeText.length > 500 ? "..." : ""}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
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
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="marketing-specialist">Marketing Specialist</SelectItem>
                      <SelectItem value="sales-representative">Sales Representative</SelectItem>
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
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSubmit}
                disabled={!formData.resumeText || !formData.targetRole || !formData.targetIndustry || loading || !apiKey}
              >
                {loading ? "Analyzing..." : 
                  <>
                    <Upload className="h-4 w-4 mr-2" /> Analyze With OpenAI
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
                      toast.success("Resume downloaded");
                    }}
                  >
                    Download Enhanced Resume
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ResumeEnhancer;
