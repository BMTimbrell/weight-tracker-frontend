import React, { useContext } from 'react';
import useTheme from './useTheme';

const ThemeContext = React.createContext();

export function useThemeContext() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useTheme();

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            { children }
        </ThemeContext.Provider>
    );
}