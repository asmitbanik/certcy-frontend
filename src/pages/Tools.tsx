
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileEdit, Users, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const navigate = useNavigate();

  return (
    <Layout pageTitle="Career Tools">
      <div className="mb-6">
        <p className="text-certcy-text-secondary">
          Tools to help you succeed in your career transition journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-certcy-cardbg border-gray-800 text-white overflow-hidden">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="bg-blue-600/20 p-3 rounded-lg">
                <FileEdit className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <CardTitle>Resume Enhancer</CardTitle>
                <CardDescription className="text-certcy-text-secondary">
                  AI-powered resume optimization for your target role
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-certcy-text-secondary flex items-center gap-2">
                <span className="text-blue-500">•</span> AI analysis of your resume against target job descriptions
              </li>
              <li className="text-sm text-certcy-text-secondary flex items-center gap-2">
                <span className="text-blue-500">•</span> Keyword optimization suggestions
              </li>
              <li className="text-sm text-certcy-text-secondary flex items-center gap-2">
                <span className="text-blue-500">•</span> Skill gap identification and recommendations
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/tools/resume-enhancer")}
            >
              Enhance My Resume
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-certcy-cardbg border-gray-800 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-certcy-yellow text-black px-3 py-1 text-xs font-semibold">
            Coming Soon
          </div>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <CardTitle>Personal Branding Tips</CardTitle>
                <CardDescription className="text-certcy-text-secondary">
                  Build a strong personal brand to stand out in your industry
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-certcy-text-secondary flex items-center gap-2">
                <span className="text-gray-500">•</span> LinkedIn profile optimization
              </li>
              <li className="text-sm text-certcy-text-secondary flex items-center gap-2">
                <span className="text-gray-500">•</span> Content strategy for thought leadership
              </li>
              <li className="text-sm text-certcy-text-secondary flex items-center gap-2">
                <span className="text-gray-500">•</span> Networking strategy playbook
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white" disabled>
              <Lock className="h-4 w-4 mr-2" /> Join Waitlist
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Tools;
