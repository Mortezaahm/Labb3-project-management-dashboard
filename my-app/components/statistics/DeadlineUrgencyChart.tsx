'use client';

import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useProjects } from '@/hooks/useProjects';
import { useSettings } from '@/hooks/useSettings';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DeadlineUrgencyChart() {
  const { projects, loading } = useProjects();
  const { theme } = useSettings();
  const textColor = theme === 'dark' ? '#f8fafc' : '#171717';

  const chartData = useMemo(() => {
    const now = new Date();
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    let dueSoon = 0;
    let dueThisMonth = 0;
    let dueLater = 0;

    projects
      .filter((project) => project.status !== 'Completed')
      .forEach((project) => {
        const deadline = new Date(project.deadline);
        if (deadline <= in7Days) dueSoon += 1;
        else if (deadline <= in30Days) dueThisMonth += 1;
        else dueLater += 1;
      });

    return {
      labels: ['This Week', 'This Month', 'Later'],
      datasets: [
        {
          data: [dueSoon, dueThisMonth, dueLater],
          backgroundColor: ['#f97316', '#eab308', '#ec4899'],
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
      <h2 className="mb-4 text-lg font-semibold">Deadline Urgency</h2>
      <div className="relative mx-auto h-64 max-w-xs">
        <Doughnut
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  font: { size: 14 },
                  color: textColor,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
