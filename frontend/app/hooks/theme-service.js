import React, { createContext, useContext, useState } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

// Custom colors based on Rebot's design system
const customColors = {
    light: {
        primary: '#16837D',
        primaryDark: '#0E6962',
        primaryLight: '#E7F5F4',
        accent: '#F28D35',
        accentLight: '#FFF4E9',
        background: '#FFFFFF',
        surface: '#F5F9F9',
        card: '#FFFFFF',
        border: '#D8E6E5',
        text: {
            primary: '#1A3B39',
            secondary: '#5B7876',
            inverse: '#FFFFFF',
            muted: '#8AA6A4',
        },
        error: '#E85D55',
        disabled: '#B8C9C8',
        success: '#26A69A',
    },
    dark: {
        primary: '#16837D',
        primaryDark: '#0E6962',
        primaryLight: '#194A47',
        accent: '#F28D35',
        accentLight: '#3D2A14',
        background: '#121A19',
        surface: '#1A2423',
        card: '#1A2423',
        border: '#262e2d',
        text: {
            primary: '#E5F0EF',
            secondary: '#A2BDBB',
            inverse: '#121A19',
            muted: '#67817F',
        },
        error: '#FF7B74',
        disabled: '#3D4A49',
        success: '#3DD9C9',
    },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setIsDark((prev) => !prev);

    // Create enhanced theme objects with custom colors
    const theme = {
        ...(isDark ? DarkTheme : DefaultTheme),
        colors: {
            ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
            primary: customColors[isDark ? 'dark' : 'light'].primary,
            card: customColors[isDark ? 'dark' : 'light'].card,
            // Add other colors from React Navigation's theme schema as needed
        },
        // Add our full custom colors palette
        customColors: customColors[isDark ? 'dark' : 'light'],
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark, colors: customColors[isDark ? 'dark' : 'light'] }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeToggle() {
    return useContext(ThemeContext);
}