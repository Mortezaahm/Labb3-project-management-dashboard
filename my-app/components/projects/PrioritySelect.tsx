import type { ProjectPriority } from '@/types/project';

type PrioritySelectProps = {
  value: ProjectPriority;
  onChange: (value: ProjectPriority) => void;
};

const options: ProjectPriority[] = ['Low', 'Medium', 'High'];

export function PrioritySelect({ value, onChange }: PrioritySelectProps) {
  return (
    <div>
      <label htmlFor="priority" className="mb-1 block text-sm font-medium">
        Priority
      </label>
      <select
        id="priority"
        value={value}
        onChange={(e) => onChange(e.target.value as ProjectPriority)}
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
