import Button from '@/components/ui/Button';

type FormControlsProps = {
  error: string | null;
  submitLabel: string;
  loading: boolean;
  onCancel: () => void;
};

export function FormControls({
  error,
  submitLabel,
  loading,
  onCancel,
}: FormControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}
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
    </div>
  );
}
