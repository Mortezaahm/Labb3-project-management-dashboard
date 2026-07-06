"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { Settings, Theme, FontSize, Language } from "@/types/types";
import { settingsStorage } from "@/lib/settings-storage";
import { useTheme } from "next-themes";

type SettingsContextType = {
  theme: Theme;
  fontSize: FontSize;
  setTheme: (t: Theme) => void;
  setFontSize: (f: FontSize) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export default function SettingsProvider({
  children,
  serverSettings,
}: {
  children: React.ReactNode;
  serverSettings?: Settings | null; // from MongoDB
}) {
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();

  const [theme, setThemeState] = useState<Theme>("light");
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");
  const [initialized, setInitialized] = useState(false);

  // HYDRATION STRATEGY (core logic)
  useEffect(() => {
    if (initialized) return;

    const local = settingsStorage.load();

    const finalSettings: Settings = serverSettings ?? {
          theme: (local?.theme as Theme) ?? "light",
          fontSize: (local?.fontSize as FontSize) ?? "medium",
          language: (local?.language as Language) ?? "en",
          notifications: (local?.notifications as boolean) ?? true,
        };

    setThemeState(finalSettings.theme);
    setFontSizeState(finalSettings.fontSize);

    setNextTheme(finalSettings.theme);
    setInitialized(true);
  }, [initialized, serverSettings, setNextTheme]);

  // persist only when user interacts (not initial hydrate)
  useEffect(() => {
    if (!initialized) return;

    if (!serverSettings) {
      settingsStorage.save({ theme, fontSize, language: "en", notifications: true });
    }
  }, [theme, fontSize, initialized, serverSettings]);

  // body class sync
  useEffect(() => {
    const classes = ["font-small", "font-medium", "font-large"];
    document.body.classList.remove(...classes);
    document.body.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  const value = useMemo(
    () => ({
      theme,
      fontSize,
      setTheme: (t: Theme) => {
        setThemeState(t);
        setNextTheme(t);
      },
      setFontSize: (f: FontSize) => setFontSizeState(f),
    }),
    [theme, fontSize, setNextTheme]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
