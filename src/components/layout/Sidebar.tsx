
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Compass, Tool, MessageSquare } from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
};

export function Sidebar() {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: Home,
      isActive: location.pathname === "/"
    },
    {
      title: "Career Pivot",
      href: "/career-pivot",
      icon: Compass,
      isActive: location.pathname.startsWith("/career-pivot")
    },
    {
      title: "Tools",
      href: "/tools",
      icon: Tool,
      isActive: location.pathname.startsWith("/tools")
    },
    {
      title: "CompassBot",
      href: "/compassbot",
      icon: MessageSquare,
      isActive: location.pathname.startsWith("/compassbot")
    }
  ];

  return (
    <aside className="fixed left-0 top-0 z-10 h-full w-16 bg-certcy-sidebar flex flex-col items-center pt-4 border-r border-gray-800">
      <div className="mb-10 p-2">
        <Link to="/" className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/c470eefe-5d58-4dc4-be08-4f822e6fbb60.png" 
            alt="Certcy Logo" 
            className="w-10 h-10 rounded-md bg-white p-1" 
          />
        </Link>
      </div>

      <nav className="flex flex-col gap-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-md text-lg transition-colors",
              item.isActive
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            )}
            title={item.title}
          >
            <item.icon size={20} />
          </Link>
        ))}
      </nav>
    </aside>
  );
}
