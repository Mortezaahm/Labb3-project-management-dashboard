'use client';

import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useProjects } from '@/hooks/useProjects';

ChartJS.register(ArcElement, Tooltip, Legend);

export function OverdueStatusChart() {
  const { projects, loading } = useProjects();

  const chartData = useMemo(() => {
    const now = new Date();
    let overdue = 0;
    let onTrack = 0;

    projects.forEach((project) => {
      const isOverdue =
        project.status !== 'Completed' && new Date(project.deadline) < now;
      if (isOverdue) overdue += 1;
      else onTrack += 1;
    });

    return {
      labels: ['On Track', 'Overdue'],
      datasets: [
        {
          data: [onTrack, overdue],
          backgroundColor: ['#22c55e', '#ef4444'],
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
      <h2 className="mb-4 text-lg font-semibold">Overdue vs On Track</h2>
      <div className="relative mx-auto h-64 max-w-xs">
        <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
