
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

export function Layout({ children, pageTitle }: LayoutProps) {
  return (
    <div className="min-h-screen bg-certcy-darkbg flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 transition-all duration-200 ml-16">
        {pageTitle && (
          <div className="pb-4 md:pb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-certcy-text">
              {pageTitle}
            </h2>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              {pageTitle}
            </h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
