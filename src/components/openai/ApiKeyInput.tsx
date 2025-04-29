
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Eye, EyeOff, Save } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
  isRequired?: boolean;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ 
  onApiKeyChange,
  isRequired = true 
}) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  
  // On component mount, check if API key is stored in localStorage
  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      onApiKeyChange(storedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey);
      onApiKeyChange(apiKey);
      toast.success("API key saved successfully");
    } else if (isRequired) {
      toast.error("Please enter your OpenAI API key");
    }
  };

  return (
    <Card className="bg-certcy-cardbg border-gray-800 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          OpenAI API Key
        </CardTitle>
        <CardDescription className="text-certcy-text-secondary">
          Enter your OpenAI API key to enable content analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <Input
              type={showApiKey ? "text" : "password"}
              placeholder="sk-..."
              className="bg-gray-900 border-gray-700 text-white pr-10"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveApiKey();
                }
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-7 w-7"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
          <Button
            onClick={handleSaveApiKey}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
