
import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "bot",
    content: "Hi there! I'm CompassBot, your AI career counselor. I can help you navigate your career transition journey. What would you like guidance on today?",
    timestamp: new Date()
  }
];

const suggestedQuestions = [
  "How do I prepare for a data scientist interview?",
  "What skills should I focus on for a product management role?",
  "How do I explain my career transition to potential employers?",
  "Tips for networking in the tech industry?",
  "How can I showcase my transferable skills on my resume?"
];

const botResponses: Record<string, string> = {
  "how do i prepare for a data scientist interview": "To prepare for a data scientist interview, focus on these key areas:\n\n1. Technical skills: Review statistics, probability, SQL, Python, and machine learning concepts\n\n2. Practice coding challenges: Use platforms like LeetCode or HackerRank to practice data manipulation and algorithm questions\n\n3. Prepare case studies: Be ready to discuss how you'd approach real-world data problems\n\n4. Know your projects: Be able to explain your past projects in depth - the problem, your approach, and the results\n\n5. Behavioral preparation: Prepare stories about collaboration, overcoming challenges, and driving impact\n\n6. Research the company: Understand their data challenges and how they use data science\n\nWould you like me to elaborate on any of these areas?",
  "what skills should i focus on for a product management role": "For a product management role, especially in AI, focus on developing these key skills:\n\n1. Strategic thinking: Ability to define product vision and strategy aligned with business goals\n\n2. Technical understanding: Basic knowledge of how AI/ML works (you don't need to be a developer, but should understand the possibilities and limitations)\n\n3. User empathy: Strong ability to understand user needs and translate them into product requirements\n\n4. Data analysis: Comfort with metrics, A/B testing, and making data-driven decisions\n\n5. Cross-functional collaboration: Ability to work with engineering, design, marketing, and sales\n\n6. Project management: Organizing work, setting timelines, and driving execution\n\n7. Communication: Clear articulation of complex concepts to different stakeholders\n\n8. Business acumen: Understanding market dynamics and business models\n\nWhich of these areas would you like to develop further?",
  "how do i explain my career transition to potential employers": "When explaining your career transition to potential employers:\n\n1. Focus on the narrative: Create a clear story about why you're making this change. Connect your past experience to your desired role.\n\n2. Highlight transferable skills: Identify skills from your current career that apply to your target role (e.g., analytical thinking, project management, leadership).\n\n3. Show commitment to learning: Discuss courses, certificates, or self-directed learning you've undertaken to build relevant skills.\n\n4. Demonstrate passion: Explain why you're excited about this new direction.\n\n5. Connect to their needs: Research the company and position thoroughly, then explain how your unique background brings value.\n\n6. Provide examples: Share specific projects or achievements that demonstrate your capabilities in the new field.\n\nRemember, career changes are common nowadays, and many employers value diverse backgrounds and fresh perspectives.",
  "tips for networking in the tech industry": "Here are my top networking tips specifically for the tech industry:\n\n1. Attend industry events: Meetups, conferences, and workshops are great places to meet people face-to-face. Look for events on platforms like Meetup.com or Eventbrite.\n\n2. Leverage LinkedIn: Optimize your profile, engage with content in your target field, and reach out to professionals for informational interviews.\n\n3. Contribute to open source or online communities: Platforms like GitHub, Stack Overflow, or industry-specific Slack channels can help you build relationships while showcasing your knowledge.\n\n4. Join tech-focused groups: Look for local tech associations or groups specific to your target role.\n\n5. Follow up meaningfully: After connecting with someone, follow up with something valuable like an interesting article or a relevant opportunity.\n\n6. Be specific when reaching out: Instead of asking for a job, ask for specific advice or insights about their career path.\n\n7. Give before you get: Offer help or share resources before asking for favors.\n\n8. Stay current with industry trends: This gives you something relevant to discuss when networking.\n\nWhat specific networking challenge are you facing?",
  "how can i showcase my transferable skills on my resume": "To effectively showcase transferable skills on your resume when pivoting careers:\n\n1. Create a skills-focused resume format: Consider a functional or hybrid resume format that emphasizes skills over chronological work history.\n\n2. Write a powerful summary statement: Clearly state your career transition and highlight your most relevant transferable skills.\n\n3. Use the right keywords: Study job descriptions in your target field and incorporate relevant terminology.\n\n4. Reframe your experience: For each previous position, emphasize aspects that relate to your target role rather than responsibilities unrelated to your new direction.\n\n5. Quantify achievements: Use metrics to demonstrate impact, regardless of industry (e.g., improved efficiency by 20%, managed a team of 10).\n\n6. Create a skills section: Group your transferable skills into categories relevant to your target role.\n\n7. Include relevant projects: Showcase personal, volunteer, or side projects that demonstrate skills relevant to your target role.\n\n8. Address the transition directly: In your cover letter, explain your transition and why your background is an asset.\n\nWould you like me to help you identify which of your specific skills might transfer well to your target role?"
};

const CompassBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate bot response delay
    setTimeout(() => {
      const normalizedInput = inputValue.toLowerCase().trim();
      let botResponse = "I don't have a specific answer for that question yet. As your career counselor, I'm here to help with your career transition questions. Could you try asking something about career pivoting, skill development, or job search strategies?";
      
      // Check if we have a canned response for this input
      for (const [question, response] of Object.entries(botResponses)) {
        if (normalizedInput.includes(question) || question.includes(normalizedInput)) {
          botResponse = response;
          break;
        }
      }
      
      const botReplyMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botReplyMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    // Focus on input after setting the value
    const inputElement = document.getElementById("chat-input");
    if (inputElement) {
      inputElement.focus();
    }
  };
  
  return (
    <Layout pageTitle="CompassBot">
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <Card className="bg-certcy-cardbg border-gray-800 text-white flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              CompassBot - Your AI Career Counselor
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 pr-2">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%]`}>
                    {msg.role === 'bot' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src="/lovable-uploads/c470eefe-5d58-4dc4-be08-4f822e6fbb60.png" alt="CompassBot" />
                        <AvatarFallback className="bg-blue-600 text-white">CB</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`rounded-xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-white'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    {msg.role === 'user' && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-green-600 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/lovable-uploads/c470eefe-5d58-4dc4-be08-4f822e6fbb60.png" alt="CompassBot" />
                      <AvatarFallback className="bg-blue-600 text-white">CB</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-800 text-white rounded-xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {messages.length <= 2 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 text-certcy-text-secondary">Suggested Questions:</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-full px-3 py-1"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Input 
                id="chat-input"
                className="bg-gray-900 border-gray-700 text-white"
                placeholder="Ask me about your career journey..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white" 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CompassBot;
