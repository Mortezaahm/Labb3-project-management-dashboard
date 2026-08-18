'use client';

import { useState } from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

type DeleteProjectButtonProps = {
  onConfirmDelete: () => void | Promise<void>;
};

export function DeleteProjectButton({
  onConfirmDelete,
}: DeleteProjectButtonProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setOpen(false);
    setDeleting(true);
    try {
      await onConfirmDelete();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={deleting}
        className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
      >
        {deleting ? 'Deleting…' : 'Delete'}
      </button>
      <ConfirmDialog
        open={open}
        title="Do you wish to delete this project?"
        description="This action cannot be undone and the project will be permanently removed."
        confirmLabel="Delete"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
