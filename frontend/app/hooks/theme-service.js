// themeContext.js
import React, { createContext, useContext, useState } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setIsDark((prev) => !prev);
    const theme = isDark ? DarkTheme : DefaultTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeToggle() {
    return useContext(ThemeContext);
}
