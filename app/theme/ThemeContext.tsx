import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [userId] = useState(1);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      // Theme persistence is temporarily disabled until the Database module is fixed.
    } catch (error) {
      console.error("❌ Load theme error:", error);
    }
  };

  const persistSettings = async (
    _userId: number,
    _settings: { notifications_enabled: number; dark_mode: number },
  ) => {
    // No-op persistence until the Database module is available.
  };

  const toggleDarkMode = async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    await persistSettings(userId, {
      notifications_enabled: 1,
      dark_mode: newValue ? 1 : 0,
    });
  };

  const setDarkMode = async (value: boolean) => {
    setIsDark(value);
    await persistSettings(userId, {
      notifications_enabled: 1,
      dark_mode: value ? 1 : 0,
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
