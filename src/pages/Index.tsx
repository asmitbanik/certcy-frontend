
import { Layout } from "@/components/layout/Layout";
import { PivotSnapshot } from "@/components/dashboard/PivotSnapshot";
import { LayoffTracker } from "@/components/dashboard/LayoffTracker";
import { TodaysAction } from "@/components/dashboard/TodaysAction";
import { ProgressSummary } from "@/components/dashboard/ProgressSummary";
import { Shortcuts } from "@/components/dashboard/Shortcuts";

const Index = () => {
  return (
    <Layout pageTitle="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PivotSnapshot />
            <LayoffTracker />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TodaysAction />
            <ProgressSummary />
            <Shortcuts />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
