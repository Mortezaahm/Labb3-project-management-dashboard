import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";

export async function getDashboardData(userId: string) {
  await connectDB();

  const projects = await Project.find({
    createdBy: userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  const total = projects.length;

  const completed = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const inProgress = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const now = new Date();

  const overdue = projects.filter(
    (project) =>
      project.status !== "Completed" &&
      new Date(project.deadline) < now
  ).length;

  const recentProjects = projects.slice(0, 5).map((project) => ({
    id: project._id.toString(),
    title: project.title,
    status: project.status,
    updated: project.updatedAt.toISOString(),
  }));

  return {
    stats: {
      total,
      completed,
      inProgress,
    },

    summary: {
      total,
      completed,
      inProgress,
      overdue,
    },

    recentProjects,
  };
}
