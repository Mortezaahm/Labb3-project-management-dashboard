"use client"

import { createContext, useContext, useEffect, useState } from "react"

type FontSize = "small" | "medium" | "large";

type FontSizeContextType = {
    fontSize: FontSize
    setFontSize: (size: FontSize) => void
}

const FontSizeContext = createContext<FontSizeContextType | null>(null);

export default function FontSizeProvider({children}: {children: React.ReactNode;}) {

  const getInitialFontSize = (): FontSize => {
    if (typeof window === "undefined") {
        return "medium";
    }
  return (
    (localStorage.getItem("font-size") as FontSize | null) ??
    "medium"
  );
};

const [fontSize, setFontSize] = useState(getInitialFontSize);

  useEffect(() => {
    localStorage.setItem("font-size", fontSize);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider
      value={{
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);

  if (!context) {
    throw new Error("useFontSize must be used inside FontSizeProvider");
  }

  return context;
}
