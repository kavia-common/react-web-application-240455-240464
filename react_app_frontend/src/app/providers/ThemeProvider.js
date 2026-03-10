import React, { createContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "kavia_shop_theme";

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides light/dark theme with persistence and sets [data-theme] on <html>. */
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "dark" || saved === "light" ? saved : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => {
    return {
      theme,
      // PUBLIC_INTERFACE
      toggleTheme: () =>
        setTheme((t) => (t === "light" ? "dark" : "light")),
      // PUBLIC_INTERFACE
      setTheme,
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to access theme context. */
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
