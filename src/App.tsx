
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CareerPivot from "./pages/CareerPivot";
import CareerPathDetail from "./pages/CareerPathDetail";
import CareerRoadmap from "./pages/CareerRoadmap";
import Tools from "./pages/Tools";
import ResumeEnhancer from "./pages/ResumeEnhancer";
import CompassBot from "./pages/CompassBot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career-pivot" element={<CareerPivot />} />
          <Route path="/career-pivot/:pathId" element={<CareerPathDetail />} />
          <Route path="/career-pivot/:pathId/roadmap" element={<CareerRoadmap />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/resume-enhancer" element={<ResumeEnhancer />} />
          <Route path="/compassbot" element={<CompassBot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
