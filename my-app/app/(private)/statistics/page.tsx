import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";

import StatsCard from "@/components/dashboard/StatsCard";
// import { stats } from "@/data/statistics";
import { CompletionRate } from "@/components/statistics/CompletionRate";
import { OverdueRate } from "@/components/statistics/OverdueRate";

export default async function StatisticsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  await connectDB();

  const projects = await Project.find({ createdBy: session.user.id }).lean();

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const now = new Date();

  const overdueProjects = projects.filter(
    (project) => project.status !== "Completed"
    && new Date(project.deadline) < new Date()
  ).length;

  // First day of the current month
  const firstDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  // Projects created during the current month
  const monthlyProjects = projects.filter(
    (project) => new Date(project.createdAt) >= firstDayOfMonth
  );

  const monthlyCompletedProjects = monthlyProjects.filter(
    (project) => project.status === "Completed"
  ).length;

  const monthlyOverdueProjects = monthlyProjects.filter((project) => {
    return (
      project.status !== "Completed" &&
      new Date(project.deadline) < now
    );
  }).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <p className="text-gray-600 dark:text-gray-300">Here you can view detailed statistics about your activities, project performance, and overall progress. Analyze your data to make informed decisions and improve your workflow.</p>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      <StatsCard title="Total Projects" value={totalProjects} />
      <StatsCard title="Completed Projects" value={completedProjects} />
      <StatsCard title="In Progress" value={inProgressProjects} />
      <StatsCard title="Overdue Projects" value={overdueProjects} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
      <CompletionRate
        completedProjects={completedProjects}
        totalProjects={totalProjects}
        monthlyCompletedProjects={monthlyCompletedProjects}
        monthlyProjects={monthlyProjects.length}
      />
      <OverdueRate
        totalProjects={totalProjects}
        overdueProjects={overdueProjects}
        monthlyOverdueProjects={monthlyOverdueProjects}
        monthlyProjects={monthlyProjects.length}
      />
    </div>
  </div>
  );
}
