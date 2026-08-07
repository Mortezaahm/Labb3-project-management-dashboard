import Button from '@/components/ui/Button';

type FormActionsProps = {
  submitLabel: string;
  loading: boolean;
  onCancel: () => void;
};

export function FormActions({
  submitLabel,
  loading,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex gap-3">
      <Button disabled={loading}>{loading ? 'Saving…' : submitLabel}</Button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        Cancel
      </button>
    </div>
  );
}
