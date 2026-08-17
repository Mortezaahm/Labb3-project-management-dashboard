"use client";

import { useContext } from "react";
import { SettingsContext } from "@/components/context/SettingsContext";

export function useSettings() {
  const ctx = useContext(SettingsContext);

  if (!ctx) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return ctx;
}
