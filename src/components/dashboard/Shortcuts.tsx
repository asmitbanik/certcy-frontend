
import { Link } from "react-router-dom";
import { RocketIcon, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const shortcuts = [
  {
    name: "Resume Booster",
    icon: <RocketIcon className="h-5 w-5" />,
    href: "/tools/resume-enhancer",
  },
  {
    name: "Chat with Coach",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/compassbot",
  },
];

interface ShortcutsProps {
  className?: string;
}

export function Shortcuts({ className }: ShortcutsProps) {
  return (
    <div className={cn("card-gradient p-6", className)}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-certcy-green">🚀</span>
        <h3 className="text-xl font-bold text-white">Shortcuts</h3>
      </div>
      <p className="text-sm text-certcy-text-secondary mb-5">
        Quick access to tools
      </p>

      <div className="space-y-3">
        {shortcuts.map((shortcut) => (
          <Link
            key={shortcut.name}
            to={shortcut.href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-white"
          >
            <div className="bg-certcy-green/10 w-10 h-10 rounded-full flex items-center justify-center text-certcy-green">
              {shortcut.icon}
            </div>
            <span>{shortcut.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
