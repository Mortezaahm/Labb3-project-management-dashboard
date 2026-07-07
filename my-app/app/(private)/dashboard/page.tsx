import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentProjects from "@/components/dashboard/RecentProjects";
import ProjectSummary from "@/components/dashboard/ProjectSummary";
import QuickAction from "@/components/dashboard/QuickAction";

import { dashboardStats, recentProjects, projectSummary, quickActions } from "@/data/dashboard";

export default async function DashboardPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  })


  return (
    <div className="container mx-auto py-8">

      <DashboardHeader userName = {session?.user?.name ?? "User"}/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {dashboardStats.map((stat) =>
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        )}
      </div>

      <ProjectSummary summary={projectSummary}/>

      <QuickAction actions={quickActions} />

      <RecentProjects
        projects={recentProjects}
      />
    </div>
  );
}
