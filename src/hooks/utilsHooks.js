import React, { useState, useEffect } from 'react';

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const handleResize = () => {
            setMatches(mediaQueryList.matches);
        };

        mediaQueryList.addListener(handleResize);
        return () => {
            mediaQueryList.removeListener(handleResize);
        };
    }, [query]);

    return matches;
}