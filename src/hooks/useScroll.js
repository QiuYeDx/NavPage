// import { useState, useEffect } from "react";
//
// /**
//  * Hook to get horizontal scroll properties of a DOM element.
//  *
//  * @function
//  * @param {React.RefObject<HTMLElement>} ref - React ref pointing to the DOM element.
//  * @returns {Object} - Contains scrollWidth, clientWidth, scrollPercentage, and scrollLeft of the DOM element.
//  *
//  * @property {number} scrollWidth - The overall width of the element content including non-visible portion.
//  * @property {number} clientWidth - The visible width of the element.
//  * @property {number} scrollPercentage - The percentage of horizontal scroll in relation to the total scroll width.
//  * @property {number} scrollLeft - The scrolled distance of the element.
//  *
//  * @example
//  * const { clientWidth, scrollWidth, scrollPercentage, scrollLeft } = useHorizontalScroll(scrollRef);
//  */
// function useHorizontalScroll(ref) {
//     const [scrollState, setScrollState] = useState({
//         scrollWidth: 0,
//         clientWidth: 0,
//         scrollPercentage: 0,
//         scrollLeft: 0
//     });
//
//     useEffect(() => {
//         const handleScroll = () => {
//             if (ref.current) {
//                 const { scrollWidth, clientWidth, scrollLeft } = ref.current;
//                 const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
//                 setScrollState({
//                     scrollWidth,
//                     clientWidth,
//                     scrollPercentage,
//                     scrollLeft
//                 });
//             }
//         };
//
//         if (ref.current) {
//             ref.current.addEventListener("scroll", handleScroll);
//             handleScroll(); // Initial fetch
//
//             // Cleanup listener
//             return () => {
//                 ref.current.removeEventListener("scroll", handleScroll);
//             };
//         }
//     }, [ref]);
//
//     return scrollState;
// }
//
// export default useHorizontalScroll;

//
// import { useState, useEffect } from 'react';
//
// /**
//  * Hook to get the horizontal scroll details of an element.
//  *
//  * @param {React.RefObject} ref - The reference to the scrolling element.
//  * @param {boolean} onlyOnMount - If true, only fetches the scroll details on component mount.
//  *
//  * @returns {Object} Scroll details: clientWidth, scrollWidth, scrollPercentage, and scrollLeft.
//  */
// function useHorizontalScroll(ref, onlyOnMount = false) {
//     const [scrollDetails, setScrollDetails] = useState({
//         clientWidth: 0,
//         scrollWidth: 0,
//         scrollPercentage: 0,
//         scrollLeft: 0,
//     });
//
//     const updateScrollDetails = () => {
//         if (ref.current) {
//             const { clientWidth, scrollWidth, scrollLeft } = ref.current;
//             const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
//             setScrollDetails({ clientWidth, scrollWidth, scrollPercentage, scrollLeft });
//         }
//     }
//
//     useEffect(() => {
//         updateScrollDetails();
//
//         if (!onlyOnMount) {
//             const handleScroll = () => {
//                 updateScrollDetails();
//             };
//             ref.current.addEventListener('scroll', handleScroll);
//
//             // Cleanup on unmount
//             return () => {
//                 ref.current.removeEventListener('scroll', handleScroll);
//             }
//         }
//     }, [onlyOnMount]); // Dependency on onlyOnMount ensures useEffect re-runs if onlyOnMount changes
//
//     return scrollDetails;
// }
//
// export default useHorizontalScroll;
//
// import { useState, useEffect, useCallback } from 'react';
//
// /**
//  * Hook to get the horizontal scroll details of an element.
//  *
//  * @param {React.RefObject} ref - The reference to the scrolling element.
//  * @param {boolean} onlyOnMount - If true, only fetches clientWidth and scrollWidth on component mount.
//  *
//  * @returns {Object} Scroll details: clientWidth, scrollWidth, scrollPercentage, scrollLeft, and fetchCurrentScrollDetails.
//  *
//  * @example
//  * const { clientWidth, scrollWidth, scrollPercentage, scrollLeft, fetchCurrentScrollDetails } = useHorizontalScroll(ref, true);
//  */
// function useHorizontalScroll(ref, onlyOnMount = false) {
//     const [dimensions, setDimensions] = useState({
//         clientWidth: 0,
//         scrollWidth: 0,
//     });
//     const [scrollState, setScrollState] = useState({
//         scrollPercentage: 0,
//         scrollLeft: 0,
//     });
//
//     const updateDimensions = useCallback(() => {
//         if (ref.current) {
//             const { clientWidth, scrollWidth } = ref.current;
//             setDimensions({ clientWidth, scrollWidth });
//         }
//     }, [ref]);
//
//     const updateScrollState = useCallback(() => {
//         if (ref.current) {
//             const { scrollLeft, clientWidth, scrollWidth } = ref.current;
//             const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
//             setScrollState({ scrollPercentage, scrollLeft });
//         }
//     }, [ref]);
//
//     useEffect(() => {
//         if (onlyOnMount) {
//             updateDimensions();
//         }
//
//         const handleScroll = () => {
//             updateScrollState();
//             if (!onlyOnMount) {
//                 updateDimensions();
//             }
//         };
//
//         ref.current.addEventListener('scroll', handleScroll);
//
//         // Cleanup on unmount
//         return () => {
//             ref.current.removeEventListener('scroll', handleScroll);
//         };
//     }, [onlyOnMount, updateScrollState, updateDimensions]);
//
//     const fetchCurrentScrollDetails = useCallback(() => {
//         updateDimensions();
//         updateScrollState();
//     }, [updateDimensions, updateScrollState]);
//
//     return {
//         ...dimensions,
//         ...scrollState,
//         fetchCurrentScrollDetails
//     };
// }
//
// export default useHorizontalScroll;

import { useState, useEffect, useCallback } from 'react';
import {throttle} from "@/utils/throttle";

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

    useEffect(() => {
        if (onlyOnMount) {
            updateDimensions();
        }

        const handleScroll = () => {
            updateScrollState();
            if (!onlyOnMount) {
                updateDimensions();
            }
        };

        const handleResize = throttle(() => {
            updateDimensions();
            updateScrollState();
        }, 150);

        ref.current.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return (ref) => {
            ref && ref.current && ref.current.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [onlyOnMount, updateScrollState, updateDimensions]);

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
