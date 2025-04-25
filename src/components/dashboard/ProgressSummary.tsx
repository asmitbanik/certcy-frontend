
import { Progress } from "@/components/ui/progress";

const roadmapProgress = 40;

const skillsLearned = [
  { name: "SQL", color: "bg-blue-500" },
  { name: "Product Thinking", color: "bg-blue-400" },
  { name: "User Research", color: "bg-blue-300" },
];

export function ProgressSummary() {
  return (
    <div className="card-gradient p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-orange-500">🔥</span>
        <h3 className="text-xl font-bold text-white">Progress Summary</h3>
      </div>
      <p className="text-sm text-certcy-text-secondary mb-5">
        Your Pivot Path progress
      </p>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-white">Roadmap Progress</span>
          <span className="text-sm text-white">{roadmapProgress}%</span>
        </div>
        <Progress value={roadmapProgress} className="h-2 bg-gray-800" indicatorClassName="bg-blue-500" />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Skills Learned</h4>
        <div className="flex flex-wrap gap-2">
          {skillsLearned.map((skill) => (
            <span 
              key={skill.name}
              className={`${skill.color} text-white text-xs rounded-md px-3 py-1`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
