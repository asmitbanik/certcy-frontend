
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestoneProgressProps {
  milestone: {
    id: string;
    title: string;
    duration: string;
    status: string;
    tasks: {
      id: string;
      name: string;
      completed: boolean;
    }[];
  };
  index: number;
  onTaskChange: (taskId: string, checked: boolean) => void;
  taskStates: { [key: string]: boolean };
}

export const MilestoneProgress = ({
  milestone,
  index,
  onTaskChange,
  taskStates,
}: MilestoneProgressProps) => {
  const completedTasks = milestone.tasks.filter(
    (task) => taskStates[task.id]
  ).length;
  const progress = (completedTasks / milestone.tasks.length) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "in-progress":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "not-started":
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <Card className={cn(
      "bg-certcy-cardbg border-gray-800 text-white group",
      "transition-all duration-300 hover:border-blue-500/30",
      "hover:shadow-lg hover:shadow-blue-500/10"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <div className="relative">
              {getStatusIcon(milestone.status)}
              <div 
                className="absolute inset-0 bg-green-500/20 rounded-full scale-[2] opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  transform: `scale(${2 + (progress / 100)})`,
                  opacity: progress > 0 ? 0.2 : 0
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <CardTitle className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-sm font-normal text-certcy-text-secondary">Week {index + 1}</div>
                <div className="text-lg">{milestone.title}</div>
              </div>
              <div className="text-sm font-normal text-certcy-text-secondary flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {milestone.duration}
              </div>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-14">
        <div className="space-y-4">
          <div className="space-y-2">
            {milestone.tasks.map((task) => (
              <div 
                key={task.id} 
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md transition-all duration-200",
                  "hover:bg-white/5"
                )}
              >
                <Checkbox
                  id={task.id}
                  checked={taskStates[task.id]}
                  onCheckedChange={(checked) => onTaskChange(task.id, checked === true)}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <label
                  htmlFor={task.id}
                  className={cn(
                    "text-sm cursor-pointer transition-all duration-200",
                    taskStates[task.id]
                      ? "line-through text-certcy-text-secondary"
                      : "text-white"
                  )}
                >
                  {task.name}
                </label>
              </div>
            ))}
          </div>

          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {milestone.status === "in-progress" && (
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group">
              Continue Learning
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}

          {milestone.status === "not-started" && (
            <Button
              className="w-full bg-gray-700 hover:bg-gray-600 text-white"
              disabled
            >
              Unlock When Ready
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
