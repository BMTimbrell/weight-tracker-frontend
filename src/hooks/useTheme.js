import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useTheme() {
    const { value: theme, setValue: setTheme } = useLocalStorage('theme', {
        light: true,
        dark: false,
        blue: false,
        green: false
    });

    const [themeName, setThemeName] = useState(
        theme.dark ? 'dark' : 
        theme.blue ? 'blue' : 
        theme.green ? 'green' : 'light'
    );

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

    return [themeName, setTheme];
}