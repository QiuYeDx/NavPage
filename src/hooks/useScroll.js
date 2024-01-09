import {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {useWindowSize} from "react-use";

/**
 * Hook to get the horizontal scroll details of an element.
 *
 * @param {React.RefObject} ref - The reference to the scrolling element.
 * @param {boolean} onlyOnMount - If true, only fetches clientWidth and scrollWidth on component mount.
 *
 * @returns {Object} Scroll details: clientWidth, scrollWidth, scrollPercentage, scrollLeft, and fetchCurrentScrollDetails.
 *
 * @example
 * const { clientWidth, scrollWidth, scrollPercentage, scrollLeft, fetchCurrentScrollDetails } = useHorizontalScroll(ref, true);
 */
function useHorizontalScroll(ref, onlyOnMount = false) {
    const {width} = useWindowSize();
    const [dimensions, setDimensions] = useState({
        clientWidth: 0,
        scrollWidth: 0,
    });
    const [scrollState, setScrollState] = useState({
        scrollPercentage: 0,
        scrollLeft: 0,
    });

    const updateDimensions = useCallback(() => {
        if (ref.current) {
            const { clientWidth, scrollWidth } = ref.current;
            setDimensions({ clientWidth, scrollWidth });
        }
    }, [ref]);

    const updateScrollState = useCallback(() => {
        if (ref.current) {
            const { scrollLeft, clientWidth, scrollWidth } = ref.current;
            const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setScrollState({ scrollPercentage, scrollLeft });
        }
    }, [ref]);

    useLayoutEffect(() => {
        if (onlyOnMount) {
            updateDimensions();
        }

        const handleScroll = () => {
            updateScrollState();
            if (!onlyOnMount) {
                updateDimensions();
            }
        };

        ref.current.addEventListener('scroll', handleScroll);

        // Cleanup on unmount
        return (ref) => {
            ref && ref.current && ref.current.removeEventListener('scroll', handleScroll);
        };
    }, [onlyOnMount, updateScrollState, updateDimensions]);

    useEffect(() => {
        updateDimensions();
        updateScrollState();
    }, [width]);

    const fetchCurrentScrollDetails = useCallback(() => {
        updateDimensions();
        updateScrollState();
    }, [updateDimensions, updateScrollState]);

    return {
        ...dimensions,
        ...scrollState,
        fetchCurrentScrollDetails
    };
}

export default useHorizontalScroll;
