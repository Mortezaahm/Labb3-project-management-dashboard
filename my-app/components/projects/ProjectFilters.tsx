import Input from '@/components/ui/Input';
import type { ProjectStatus } from '@/types/project';

export type SortOption = 'newest' | 'oldest' | 'deadline' | 'priority';

type ProjectFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: ProjectStatus | 'All';
  onStatusFilterChange: (value: ProjectStatus | 'All') => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
};

const statusOptions: (ProjectStatus | 'All')[] = [
  'All',
  'Pending',
  'In Progress',
  'Completed',
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'priority', label: 'Priority' },
];

export function ProjectFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search projects by title"
          className="!mb-0"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusFilterChange(e.target.value as ProjectStatus | 'All')
        }
        aria-label="Filter by status"
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        aria-label="Sort projects"
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
