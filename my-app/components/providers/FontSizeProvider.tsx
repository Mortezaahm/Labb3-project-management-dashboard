// "use client"

// import { createContext, useContext, useEffect, useState } from "react"

// type FontSize = "small" | "medium" | "large";

// type FontSizeContextType = {
//   fontSize: FontSize
//   setFontSize: (size: FontSize) => void
// }

// const FontSizeContext = createContext<FontSizeContextType | null>(null);


// export default function FontSizeProvider({
//   children,
//   initialFontSize = "medium"
// }: {
//   children: React.ReactNode;
//   initialFontSize?: FontSize
// }) {

//   const [fontSize, setFontSize] = useState<FontSize>(() => {
//     if (initialFontSize) return initialFontSize

//     return (
//       (localStorage.getItem("font-size") as FontSize) ?? "medium"
//     )
//   });

//   useEffect(() => {
//     const classes = ["font-small", "font-medium", "font-large"]
//     document.body.classList.remove(...classes);

//     document.body.classList.add(`font-${fontSize}`);

//     localStorage.setItem("font-size", fontSize)

//   }, [fontSize]);

//   return (
//     <FontSizeContext.Provider
//       value={{
//         fontSize,
//         setFontSize,
//       }}
//     >
//       {children}
//     </FontSizeContext.Provider>
//   );
// }


// export function useFontSize() {

//   const context = useContext(FontSizeContext);

//   if (!context) {
//     throw new Error(
//       "useFontSize must be used inside FontSizeProvider"
//     );
//   }

//   return context;
// }
