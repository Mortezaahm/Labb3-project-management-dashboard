import type { ProjectPriority } from '@/types/project';

const priorityStyles: Record<ProjectPriority, string> = {
  Low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  Medium:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
  High: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
};

export function PriorityBadge({ priority }: { priority: ProjectPriority }) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
}
