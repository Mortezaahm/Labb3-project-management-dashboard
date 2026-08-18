"use client";

import { useEffect, useState, useMemo } from "react";
import { SettingsContext } from "@/components/context/SettingsContext";
import type { Settings, Theme, FontSize } from "@/types/types";
import { settingsStorage } from "@/lib/settings-storage";
import { useTheme } from "next-themes";

// type SettingsContextType = {
//   theme: Theme;
//   fontSize: FontSize;
//   setTheme: (t: Theme) => void;
//   setFontSize: (f: FontSize) => void;
// };

// const SettingsContext = createContext<SettingsContextType | null>(null);

export default function SettingsProvider({
  children,
  serverSettings,
}: {
  children: React.ReactNode;
  serverSettings?: Settings | null; // from MongoDB
}) {
  const { setTheme: setNextTheme } = useTheme();

  const [theme, setThemeState] = useState<Theme>("light");
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");
  const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (serverSettings) {
            setThemeState(serverSettings.theme);
            setFontSizeState(serverSettings.fontSize);
            setNextTheme(serverSettings.theme);
            setInitialized(true);
        }
    }, [serverSettings]);

    useEffect(() => {
        if (serverSettings) return;
        if (initialized) return;

        const local = settingsStorage.load();

        const theme = (local?.theme as Theme) ?? "light";
        const fontSize = (local?.fontSize as FontSize) ?? "medium";

        setThemeState(theme);
        setFontSizeState(fontSize);
        setNextTheme(theme);

        setInitialized(true);
    }, [serverSettings, initialized, setNextTheme]);

  useEffect(() => {
    if (!initialized) return;

    if (serverSettings) return

    settingsStorage.save({
        theme,
        fontSize,
        language: "en",
        notifications: true
    })
},[theme, fontSize, initialized, serverSettings])

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

// export function useSettings() {
//   const ctx = useContext(SettingsContext);
//   if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
//   return ctx;
// }
