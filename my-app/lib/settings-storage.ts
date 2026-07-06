import type { Settings } from "@/types/types";

const STORAGE_KEY = "app-settings";

export const settingsStorage = {
  load(): Settings | null {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const value = localStorage.getItem(STORAGE_KEY);

      return value ? (JSON.parse(value) as Settings) : null;
    } catch {
      return null;
    }
  },

  save(settings: Settings) {
    if (typeof window === "undefined") return;

    localStorage.setItem
      (
        STORAGE_KEY,
        JSON.stringify(settings)
      );
  },

  clear() {
    if (typeof window === "undefined") return;

    localStorage.removeItem(STORAGE_KEY)
  }
};
