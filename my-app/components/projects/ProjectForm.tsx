'use client';

import { useState, type FormEvent } from 'react';
import Input from '@/components/ui/Input';
import { StatusSelect } from './StatusSelect';
import { PrioritySelect } from './PrioritySelect';
import { DeadlineField } from './DeadlineField';
import { FormActions } from './FormActions';
import { FormError } from './FormError';
import type {
  Project,
  ProjectInput,
  ProjectStatus,
  ProjectPriority,
} from '@/types/project';

type ProjectFormProps = {
  mode: 'create' | 'edit';
  initialProject?: Project;
  onSubmit: (values: ProjectInput) => Promise<void>;
  onCancel: () => void;
};

export function ProjectForm({
  mode,
  initialProject,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialProject?.title ?? '');
  const [description, setDescription] = useState(
    initialProject?.description ?? '',
  );
  const [status, setStatus] = useState<ProjectStatus>(
    initialProject?.status ?? 'Pending',
  );
  const [priority, setPriority] = useState<ProjectPriority>(
    initialProject?.priority ?? 'Medium',
  );
  const [deadline, setDeadline] = useState(
    initialProject?.deadline?.slice(0, 10) ?? '',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit({ title, description, status, priority, deadline });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={120}
        />
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <StatusSelect value={status} onChange={setStatus} />
      <PrioritySelect value={priority} onChange={setPriority} />
      <DeadlineField value={deadline} onChange={setDeadline} />
      <FormError message={error} />
      <FormActions
        submitLabel={mode === 'create' ? 'Create Project' : 'Save Changes'}
        loading={loading}
        onCancel={onCancel}
      />
    </form>
  );
}
