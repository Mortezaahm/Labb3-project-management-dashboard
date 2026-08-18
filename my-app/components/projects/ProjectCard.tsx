import Link from 'next/link';
import Card from '@/components/ui/Card';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { DeleteProjectButton } from './DeleteProjectButton';
import type { Project } from '@/types/project';

export function ProjectCard({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (id: string) => void | Promise<void>;
}) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <h2
          title={project.title}
          className="min-w-0 flex-1 truncate text-lg font-semibold"
        >
          {project.title}
        </h2>
        <div className="flex flex-shrink-0 gap-2">
          <StatusBadge status={project.status} />
          <PriorityBadge priority={project.priority} />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {project.description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Deadline: {new Date(project.deadline).toLocaleDateString()}
      </p>
      <div className="mt-2 flex gap-3 text-sm">
        <Link
          href={`/projects/${project._id}`}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          View details
        </Link>
        <Link
          href={`/projects/${project._id}/edit`}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Edit
        </Link>
        <DeleteProjectButton onConfirmDelete={() => onDelete(project._id)} />
      </div>
    </Card>
  );
}
