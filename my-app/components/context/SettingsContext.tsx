"use client";

import { createContext } from "react";
import type { Theme, FontSize } from "@/types/types";

export type SettingsContextType = {
  theme: Theme;
  fontSize: FontSize;
  setTheme: (t: Theme) => void;
  setFontSize: (f: FontSize) => void;
};

export const SettingsContext =
  createContext<SettingsContextType | null>(null);
