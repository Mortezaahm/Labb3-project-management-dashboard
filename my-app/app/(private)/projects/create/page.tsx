'use client';

import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { ProjectForm } from '@/components/projects/ProjectForm';

export default function CreateProjectPage() {
  const router = useRouter();
  const { createProject } = useProjects();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">New Project</h1>
      <ProjectForm
        mode="create"
        onSubmit={async (values) => {
          await createProject(values);
          router.push('/projects');
        }}
        onCancel={() => router.push('/projects')}
      />
    </div>
  );
}
