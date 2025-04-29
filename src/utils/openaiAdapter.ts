
import { toast } from "sonner";

// Function to securely retrieve the OpenAI API key
export const getOpenAiApiKey = (): string | null => {
  try {
    return localStorage.getItem("openai_api_key");
  } catch (error) {
    console.error("Error retrieving API key:", error);
    return null;
  }
};

// Simple validation helper
export const validateApiKey = (apiKey: string | null): boolean => {
  if (!apiKey) {
    toast.error("OpenAI API key is required. Please add your API key in the settings.");
    return false;
  }
  
  if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
    toast.error("Invalid OpenAI API key format");
    return false;
  }
  
  return true;
};

// Helper function to handle JSON parsing safely
export const safeJsonParse = (text: string): any => {
  try {
    // First try direct parsing
    return JSON.parse(text);
  } catch (e) {
    // Look for a JSON object in the text
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
      
      // If that fails, look for a JSON array
      const arrayMatch = text.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        return JSON.parse(arrayMatch[0]);
      }
      
      throw new Error("No valid JSON found");
    } catch (nestedError) {
      console.error("JSON parse error:", nestedError);
      console.log("Raw text:", text);
      return null;
    }
  }
};
