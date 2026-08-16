import StatsCard from "@/components/dashboard/StatsCard";
// import { stats } from "@/data/statistics";
import { getStatistics } from "@/lib/statistics";
import { CompletionRate } from "@/components/statistics/CompletionRate";
import { OverdueRate } from "@/components/statistics/OverdueRate";
import { redirect } from 'next/navigation'
import { ui } from '@/lib/styles'

export default async function StatisticsPage() {

    const statsData = await getStatistics()

    if (!statsData) {
      redirect('/login')
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <p className={ui.text}>Here you can view detailed statistics about your activities, project performance, and overall progress. Analyze your data to make informed decisions and improve your workflow.</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
      <StatsCard title="Total Projects" value={statsData.totalProjects} />
      <StatsCard title="Completed Projects" value={statsData.completedProjects} />
      <StatsCard title="In Progress" value={statsData.inProgressProjects} />
      <StatsCard title="Pending Projects" value={statsData.pendingProjects} />
      <StatsCard title="Overdue Projects" value={statsData.overdueProjects} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
      <CompletionRate completedProjects={statsData.completedProjects} totalProjects={statsData.totalProjects} monthlyCompleted={statsData.monthlyCompleted} monthlyProjects={statsData.monthlyProjects} />
      <OverdueRate totalProjects={statsData.totalProjects} overdueProjects={statsData.overdueProjects} monthlyOverdue={statsData.monthlyOverdue} monthlyProjects={statsData.monthlyProjects} />
    </div>
  </div>
  );
}
