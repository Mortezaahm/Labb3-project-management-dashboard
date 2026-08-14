'use client';

import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useProjects } from '@/hooks/useProjects';

ChartJS.register(ArcElement, Tooltip, Legend);

const statusColors: Record<string, string> = {
  Pending: '#8b5cf6',
  'In Progress': '#3b82f6',
  Completed: '#22c55e',
};

export function ProjectStatusChart() {
  const { projects, loading } = useProjects();

  const chartData = useMemo(() => {
    const counts = { Pending: 0, 'In Progress': 0, Completed: 0 };
    projects.forEach((project) => {
      counts[project.status] += 1;
    });

    const labels = Object.keys(counts);
    return {
      labels,
      datasets: [
        {
          data: labels.map((label) => counts[label as keyof typeof counts]),
          backgroundColor: labels.map((label) => statusColors[label]),
          borderWidth: 1,
        },
      ],
    };
  }, [projects]);

  if (loading) return <p>Loading chart…</p>;

  if (projects.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">No project data yet.</p>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 p-6 shadow-sm dark:border-gray-700">
      <h2 className="mb-4 text-lg font-semibold">
        Project Status Distribution
      </h2>
      <div className="relative mx-auto h-64 max-w-xs">
        <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
