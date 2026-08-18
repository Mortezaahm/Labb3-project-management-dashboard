import { auth } from "@/lib/auth"
import { headers } from "next/headers";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentProjects from "@/components/dashboard/RecentProjects";
import ProjectSummary from "@/components/dashboard/ProjectSummary";
import QuickAction from "@/components/dashboard/QuickAction";

import { quickActions } from "@/data/dashboard";
import { getDashboardData } from "@/lib/dashboard";
//import { dashboardStats, recentProjects, projectSummary, quickActions } from "@/data/dashboard";

export default async function DashboardPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const userName = session?.user?.name ?? "User";

  const dashboard = session ? await getDashboardData(session.user.id) : {
    stats: {
      total: 0,
      completed: 0,
      inProgress: 0,
    },
    summary: {
      total: 0,
      completed: 0,
      inProgress: 0,
      overdue: 0,
    },
    recentProjects: []
  };

  const dashboardStats = [
    { title: "Total Projects", value: dashboard.stats.total },
    { title: "Completed Projects", value: dashboard.stats.completed },
    { title: "In Progress Projects", value: dashboard.stats.inProgress },
  ];

  return (
    <div className="container mx-auto py-8">
      <DashboardHeader userName = {userName}/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {dashboardStats.map((stat) =>
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        )}
      </div>

      <ProjectSummary summary={dashboard.summary}/>

      <QuickAction actions={quickActions} />

      <RecentProjects
        projects={dashboard.recentProjects}
      />
    </div>
  );
}
