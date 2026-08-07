import Link from 'next/link';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import type { Project } from '@/types/project';

export function ProjectDetailsHeader({ project }: { project: Project }) {
  return (
    <div className="mb-6">
      <Link
        href="/projects"
        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Back to projects
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <Link
          href={`/projects/${project._id}/edit`}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm dark:border-gray-600"
        >
          Edit
        </Link>
      </div>
      <div className="mt-2 flex gap-2">
        <StatusBadge status={project.status} />
        <PriorityBadge priority={project.priority} />
      </div>
    </div>
  );
}
