import type { ProjectStatus } from '@/types/project';

type StatusSelectProps = {
  value: ProjectStatus;
  onChange: (value: ProjectStatus) => void;
};

const options: ProjectStatus[] = ['Pending', 'In Progress', 'Completed'];

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <div>
      <label htmlFor="status" className="mb-1 block text-sm font-medium">
        Status
      </label>
      <select
        id="status"
        value={value}
        onChange={(e) => onChange(e.target.value as ProjectStatus)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
