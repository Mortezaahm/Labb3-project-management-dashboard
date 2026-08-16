import StatsCard from "@/components/dashboard/StatsCard";
import { getStatistics } from "@/lib/statistics";
import { CompletionRate } from "@/components/statistics/CompletionRate";
import { OverdueRate } from "@/components/statistics/OverdueRate";
import { redirect } from "next/navigation";
import { ProjectStatusChart } from "@/components/statistics/ProjectStatusChart";
import { ProjectPriorityChart } from "@/components/statistics/ProjectPriorityChart";
import { DeadlineUrgencyChart } from "@/components/statistics/DeadlineUrgencyChart";

export default async function StatisticsPage() {
  const statsData = await getStatistics();

  if (!statsData) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Statistics</h1>

      <p className="mt-2">
        Here you can view detailed statistics about your activities, project
        performance, and overall progress. Analyze your data to make informed
        decisions and improve your workflow.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
        <StatsCard
          title="Total Projects"
          value={statsData.totalProjects}
        />

        <StatsCard
          title="Completed Projects"
          value={statsData.completedProjects}
        />

        <StatsCard
          title="In Progress"
          value={statsData.inProgressProjects}
        />

        <StatsCard
          title="Pending Projects"
          value={statsData.pendingProjects}
        />

        <StatsCard
          title="Overdue Projects"
          value={statsData.overdueProjects}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <CompletionRate
          completedProjects={statsData.completedProjects}
          totalProjects={statsData.totalProjects}
          monthlyCompleted={statsData.monthlyCompleted}
          monthlyProjects={statsData.monthlyProjects}
        />

        <OverdueRate
          totalProjects={statsData.totalProjects}
          overdueProjects={statsData.overdueProjects}
          monthlyOverdue={statsData.monthlyOverdue}
          monthlyProjects={statsData.monthlyProjects}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 items-start">
        <ProjectStatusChart />
        <ProjectPriorityChart />
        <DeadlineUrgencyChart />
      </div>
    </div>
  );
}
