import { useState } from 'react';

export default function useLocalStorage(key, initialValue = null) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            if (initialValue) localStorage.setItem(key, JSON.stringify(initialValue));
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    const removeValue = () => {
        setValue(null);
        localStorage.removeItem(key);
    };

    return { storedValue, setValue, removeValue };
}