'use client';

import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { ProjectForm } from '@/components/projects/ProjectForm';
import type { Project } from '@/types/project';

export function EditProjectClient({ project }: { project: Project }) {
  const router = useRouter();
  const { updateProject } = useProjects();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <ProjectForm
        mode="edit"
        initialProject={project}
        onSubmit={async (values) => {
          await updateProject(project._id, values);
          router.push(`/projects/${project._id}`);
        }}
        onCancel={() => router.push(`/projects/${project._id}`)}
      />
    </div>
  );
}
