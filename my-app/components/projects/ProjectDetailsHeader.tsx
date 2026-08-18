'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { DeleteProjectButton } from './DeleteProjectButton';
import type { Project } from '@/types/project';

export function ProjectDetailsHeader({ project }: { project: Project }) {
  const router = useRouter();
  const { deleteProject } = useProjects();

  return (
    <div className="mb-6">
      <Link
        href="/projects"
        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Back to projects
      </Link>
      <div className="mt-2 flex items-center justify-between gap-2">
        <h1
          title={project.title}
          className="min-w-0 flex-1 truncate text-2xl font-bold"
        >
          {project.title}
        </h1>
        <div className="flex flex-shrink-0 gap-2">
          <Link
            href={`/projects/${project._id}/edit`}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm dark:border-gray-600"
          >
            Edit
          </Link>
          <DeleteProjectButton
            onConfirmDelete={async () => {
              await deleteProject(project._id);
              router.push('/projects');
            }}
          />
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <StatusBadge status={project.status} />
        <PriorityBadge priority={project.priority} />
      </div>
    </div>
  );
}
