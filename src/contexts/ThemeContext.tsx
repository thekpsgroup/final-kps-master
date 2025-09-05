"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "auto";
type ColorScheme = "default" | "minimal" | "vibrant" | "professional";

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("default");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme;

    if (savedTheme) setTheme(savedTheme);
    if (savedColorScheme) setColorScheme(savedColorScheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDark(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      setIsDark(theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("colorScheme", colorScheme);
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
    document.documentElement.classList.toggle("dark", isDark);
  }, [colorScheme, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setTheme, setColorScheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
