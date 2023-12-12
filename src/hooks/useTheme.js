import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useMediaQuery from './useMediaQuery';

export default function useTheme() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const { value: theme, setValue: setTheme } = useLocalStorage('theme', {
        light: !prefersDarkMode,
        dark: prefersDarkMode,
        blue: false,
        green: false
    });
    const [themeName, setThemeName] = useState(
        theme.dark ? 'dark' : 
        theme.blue ? 'blue' : 
        theme.green ? 'green' : 'light'
    );
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        let name;
        for (const type in theme) {
            if (theme[type]) {
                name = type;
                document.body.classList.toggle(type, true);
            }
            else {
                document.body.classList.toggle(type, false);
            }
        }
        setThemeName(name);
    }, [theme]);

    useEffect(() => {
        if (!firstRender) {
            setTheme({
                light: !prefersDarkMode,
                dark: prefersDarkMode,
                blue: false,
                green: false
            });
        }
        
        setFirstRender(false);
    }, [prefersDarkMode]);

    return [themeName, setTheme];
}