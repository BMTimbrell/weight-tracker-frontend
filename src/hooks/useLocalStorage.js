import { useCallback, useState, useEffect } from 'react';

export default function useLocalStorage(key) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);

        if (jsonValue) return JSON.parse(jsonValue);

        return undefined;
    });

    useEffect(() => {
        if (value !== undefined)
            localStorage.setItem(key, JSON.stringify(value));
    }, [key, value, setValue]);

    const remove = () => {
        //setValue(undefined);
        //localStorage.removeItem(key);
    };

    return [value, setValue, remove];
}