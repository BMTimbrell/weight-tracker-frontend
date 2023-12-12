import { useState, useEffect } from 'react';
import useEventListener from './useEventListener';

export default function useMediaQuery(mediaQuery) {
    const [isMatch, setIsMatch] = useState(() => {
        const list = window.matchMedia(mediaQuery);
        return list.matches;
    });
    const [mediaQueryList, setMediaQueryList] = useState(() => {
        return window.matchMedia(mediaQuery);
    });

    useEffect(() => {
        const list = window.matchMedia(mediaQuery);
        setMediaQueryList(list);
        setIsMatch(list.matches);
    }, [mediaQuery]);

    useEventListener('change', e => setIsMatch(e.matches), mediaQueryList);

    return isMatch;
}