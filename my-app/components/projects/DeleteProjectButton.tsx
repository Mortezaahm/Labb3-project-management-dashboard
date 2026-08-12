'use client';

import { useState } from 'react';

type DeleteProjectButtonProps = {
  onConfirmDelete: () => void | Promise<void>;
};

export function DeleteProjectButton({
  onConfirmDelete,
}: DeleteProjectButtonProps) {
  const [deleting, setDeleting] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this project?',
    );
    if (!confirmed) return;
    setDeleting(true);
    try {
      await onConfirmDelete();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={deleting}
      className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark: border-red800 dark:text-red-400 dark:hover:bg-red-950"
    >
      {deleting ? 'Deleting..' : 'Delete'}
    </button>
  );
}
