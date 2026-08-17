"use client";

import { useSettings } from "@/hooks/useSettings";

export default function FontSizeSelector() {
  const { fontSize, setFontSize } = useSettings();

  return (
    <select
      value={fontSize}
      onChange={(e) =>
        setFontSize(e.target.value as "small" | "medium" | "large")
      }
      className="border rounded px-2 py-1 dark:bg-gray-700"
    >
      <option value="small">A-</option>
      <option value="medium">A</option>
      <option value="large">A+</option>
    </select>
  );
}
