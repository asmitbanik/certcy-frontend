
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const layoffData = [
  { name: "Retail-X", value: 1000 },
  { name: "", value: 700 },
  { name: "", value: 500 },
  { name: "", value: 400 },
  { name: "HealthNow", value: 300 }
];

const affectedRoles = [
  "Customer Support",
  "Sales Associate",
  "QA Tester",
  "Operations Manager",
  "Marketing Specialist"
];

interface LayoffTrackerProps {
  className?: string;
}

export function LayoffTracker({ className }: LayoffTrackerProps) {
  return (
    <div className={cn("card-gradient p-6 space-y-4 hover:shadow-lg transition-all duration-300", className)}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-certcy-red">📉</span>
        <h3 className="text-xl font-bold text-white">Layoff Tracker</h3>
      </div>
      <p className="text-sm text-certcy-text-secondary mb-4">
        Recent layoffs (last 7-30 days)
      </p>

      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={layoffData}
            margin={{ top: 0, right: 0, left: -15, bottom: 0 }}
          >
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A0A0A0", fontSize: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#A0A0A0", fontSize: 10 }}
              domain={[0, 1200]}
              ticks={[0, 300, 600, 900, 1200]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {layoffData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#FF4D4F" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h4 className="font-semibold text-white mb-2">Most affected roles:</h4>
        <ul className="space-y-1 mb-6">
          {affectedRoles.map((role, index) => (
            <li key={index} className="text-sm text-certcy-text-secondary flex items-center gap-2">
              <span className="text-certcy-red">•</span> {role}
            </li>
          ))}
        </ul>
        
        <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
          Explore stable pivot roles
        </Button>
      </div>
    </div>
  );
}
