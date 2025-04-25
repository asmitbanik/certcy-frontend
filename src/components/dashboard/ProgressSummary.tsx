
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const roadmapProgress = 40;

const skillsLearned = [
  { name: "SQL", color: "bg-blue-500" },
  { name: "Product Thinking", color: "bg-blue-400" },
  { name: "User Research", color: "bg-blue-300" },
];

interface ProgressSummaryProps {
  className?: string;
}

export function ProgressSummary({ className }: ProgressSummaryProps) {
  return (
    <div className={cn("card-gradient p-4 md:p-6 rounded-xl transition-all duration-200", className)}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-orange-500 text-lg">🔥</span>
        <h3 className="text-lg md:text-xl font-bold text-white">Progress Summary</h3>
      </div>
      <p className="text-sm text-certcy-text-secondary mb-5">
        Your Pivot Path progress
      </p>

      <div className="mb-6 md:mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-white">Roadmap Progress</span>
          <span className="text-sm font-medium text-white">{roadmapProgress}%</span>
        </div>
        <Progress 
          value={roadmapProgress} 
          className={cn(
            "h-2.5 bg-gray-800/50",
            "relative overflow-hidden rounded-full",
            "[&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-blue-400"
          )} 
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Skills Learned</h4>
        <div className="flex flex-wrap gap-2">
          {skillsLearned.map((skill) => (
            <span 
              key={skill.name}
              className={`${skill.color} text-white text-xs rounded-md px-3 py-1.5 transition-transform hover:scale-105 cursor-default`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
