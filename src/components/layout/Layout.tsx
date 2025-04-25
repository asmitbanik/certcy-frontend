
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
      <main className="flex-1 ml-16 p-8">
        {pageTitle && (
          <div className="pb-6">
            <h1 className="text-2xl font-semibold text-certcy-text">{pageTitle}</h1>
            <h2 className="text-3xl font-bold text-white mt-1">{pageTitle}</h2>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
