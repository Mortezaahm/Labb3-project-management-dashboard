import type { ProjectStatus } from '@/types/project';

const statusStyles: Record<ProjectStatus, string> = {
  Pending: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  'In Progress':
    'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
  Completed:
    'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
