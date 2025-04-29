
import { toast } from "sonner";

// OpenAI API configuration
const OPENAI_API_URL = "https://api.openai.com/v1";
const DEFAULT_MODEL = "gpt-4o";

// Function to extract website content
export const extractWebsiteContent = async (url: string) => {
  try {
    // This is a simplified implementation. In production, you'd likely use a backend service.
    // For client-side only, we can try to fetch publicly accessible content with CORS enabled.
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/html',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }
    
    const htmlContent = await response.text();
    
    // Extract text content from HTML (basic implementation)
    const textContent = htmlContent.replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return textContent;
  } catch (error) {
    console.error("Error extracting website content:", error);
    toast.error("Failed to extract website content. Check the URL and try again.");
    return null;
  }
};

// Send content to OpenAI for analysis
export const analyzeContentWithOpenAI = async (
  content: string, 
  apiKey: string,
  prompt: string,
  targetType: string
) => {
  try {
    if (!apiKey || !content) {
      throw new Error("API key and content are required");
    }

    const payload = {
      model: DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert at analyzing content and extracting structured information. 
          Format your response as valid JSON that matches the following structure for ${targetType}.
          Do not include any explanations outside of the JSON structure.`
        },
        {
          role: "user",
          content: `${prompt}\n\nHere is the content to analyze:\n${content}`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    };

    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();
    const jsonString = data.choices[0].message.content;
    
    // Extract JSON from the response (in case OpenAI adds any text around it)
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in the response");
    }
    
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.log("Raw response:", jsonString);
      throw new Error("Failed to parse JSON response");
    }
  } catch (error) {
    console.error("OpenAI analysis error:", error);
    toast.error(error instanceof Error ? error.message : "Failed to analyze content");
    return null;
  }
};

