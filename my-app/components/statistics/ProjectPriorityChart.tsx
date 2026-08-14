'use client';

import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useProjects } from '@/hooks/useProjects';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const priorityColors: Record<string, string> = {
  Low: '#38bdf8',
  Medium: '#f59e0b',
  High: '#ef4444',
};

export function ProjectPriorityChart() {
  const { projects, loading } = useProjects();

  const chartData = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0 };
    projects.forEach((project) => {
      counts[project.priority] += 1;
    });

    const labels = Object.keys(counts);
    return {
      labels,
      datasets: [
        {
          label: 'Projects',
          data: labels.map((label) => counts[label as keyof typeof counts]),
          backgroundColor: labels.map((label) => priorityColors[label]),
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
      <h2 className="mb-4 text-lg font-semibold">Project Priority Overview</h2>
      <div className="relative h-64">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
          }}
        />
      </div>
    </div>
  );
}
