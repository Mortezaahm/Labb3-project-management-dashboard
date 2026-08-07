import type { Project } from '@/types/project';

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Description
        </h2>
        <p className="mt-1">
          {project.description || 'No description provided.'}
        </p>
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Deadline
        </h2>
        <p className="mt-1">
          {new Date(project.deadline).toLocaleDateString()}
        </p>
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Created
        </h2>
        <p className="mt-1">
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
