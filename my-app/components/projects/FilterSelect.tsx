import type { ProjectStatus } from '@/types/project';

type FilterSelectProps = {
  value: ProjectStatus | 'All';
  onChange: (value: ProjectStatus | 'All') => void;
};

const options: (ProjectStatus | 'All')[] = [
  'All',
  'Pending',
  'In Progress',
  'Completed',
];

export function FilterSelect({ value, onChange }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ProjectStatus | 'All')}
      aria-label="Filter by status"
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
