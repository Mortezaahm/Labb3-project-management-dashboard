import StatsCard from "@/components/dashboard/StatsCard";
import { stats } from "@/data/statistics";
import { CompletionRate } from "@/components/statistics/CompletionRate";
import { OverdueRate } from "@/components/statistics/OverdueRate";

export default function StatisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <p className="text-gray-600 dark:text-gray-300">Here you can view detailed statistics about your activities, project performance, and overall progress. Analyze your data to make informed decisions and improve your workflow.</p>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      <StatsCard title="Total Projects" value={stats.totalProjects} />
      <StatsCard title="Completed Projects" value={stats.completedProjects} />
      <StatsCard title="In Progress" value={stats.inProgressProjects} />
      <StatsCard title="Overdue Projects" value={stats.overdueProjects} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
      <CompletionRate completedProjects={stats.completedProjects} totalProjects={stats.totalProjects} />
      <OverdueRate totalProjects={stats.totalProjects} overdueProjects={stats.overdueProjects} />
    </div>
  </div>
  );
}
