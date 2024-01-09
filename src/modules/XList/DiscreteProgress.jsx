// import React from 'react';
// import tw from 'twin.macro';
//
// /**
//  * DiscreteProgress Component
//  *
//  * @component
//  *
//  * @param {number} clientWidth - The visible width of the element.
//  * @param {number} scrollWidth - The overall width of the element content including non-visible portion.
//  * @param {number} scrollPercentage - The percentage of horizontal scroll in relation to the total scroll width.
//  * @param {number} scrollLeft - The scrolled distance of the element.
//  * @param {number} numberOfSteps - Number of discrete steps or dots.
//  *
//  * @returns {React.Element} The rendered DiscreteProgress component.
//  */
// const DiscreteProgress = ({ clientWidth, scrollWidth, scrollPercentage, scrollLeft, numberOfSteps = 5 }) => {
//     const activeStep = Math.floor((scrollPercentage / 100) * numberOfSteps);
//
//     return (
//         <div tw="flex space-x-2">
//             {Array.from({ length: numberOfSteps }).map((_, index) => (
//                 <div
//                     key={index}
//                     tw="w-4 h-4 rounded-full"
//                     css={[
//                         index <= activeStep ? tw`bg-blue-500` : tw`bg-gray-300`,
//                     ]}
//                 />
//             ))}
//         </div>
//     );
// };
//
// export default DiscreteProgress;

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import tw, { styled } from 'twin.macro'
import gsap from "gsap";
import {randomNum} from "@/utils/utils";

/**
 * DiscreteProgress Component
 *
 * @component
 *
 * @param {number} clientWidth - The visible width of the element.
 * @param {number} scrollWidth - The overall width of the element content including non-visible portion.
 * @param {number} scrollLeft - The scrolled distance of the element.
 * @param {number} numberOfSteps - Number of discrete steps or dots.
 * @param {number} distancePerStep - The distance to be scrolled to increase progress by one step.
 * @param {string | null} gsapClass - className used for GSAP.
 * @param {React.RefObject} scrollRef - The reference to the scrolling element.
 *
 * @returns {React.Element} The rendered DiscreteProgress component.
 */
const DiscreteProgress = ({ clientWidth, scrollWidth, scrollLeft, numberOfSteps = 5, distancePerStep = 100, gsapClass = null, scrollRef }) => {
    const activeStep = Math.min(numberOfSteps, Math.floor((scrollLeft + 170) / distancePerStep) + 1);
    // console.info('>>> activeStep: ', activeStep, numberOfSteps, scrollLeft);
    // console.info(numberOfSteps, Math.floor(scrollLeft / distancePerStep) + 1);
    const random_num = randomNum(0, 999);
    const [DELAY, setDELAY] = useState(0.8);
    const notFirst = useRef(false);
    const [defaultGsapClass] = useState(`gsap_discrete_progress_${random_num}`);

    const gsap_ref = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            // 依次渐入
            if (!gsap_ref.current) {
                gsap_ref.current = gsap.timeline({repeat: 0});

                // 将动画添加到时间轴中
                gsap_ref.current.set(`.${gsapClass || defaultGsapClass}`, {
                    y: 20,
                    opacity: 0,
                    duration: 0,
                });
                gsap_ref.current.to(`.${gsapClass || defaultGsapClass}`, {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    stagger: 0.12,
                    delay: DELAY,
                    callback: () => {
                        notFirst.current = true;
                    },
                });
            } else {
                gsap_ref.current.kill();
                gsap_ref.current = gsap.timeline({repeat: 0});

                // 将动画添加到时间轴中
                gsap_ref.current.set(`.${gsapClass || defaultGsapClass}`, {
                    y: 20,
                    opacity: 0,
                    duration: 0,
                });
                gsap_ref.current.to(`.${gsapClass || defaultGsapClass}`, {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    stagger: 0.12,
                    delay: DELAY,
                    callback: () => {
                        notFirst.current = true;
                    },
                });
            }
        }, 100);
    }, [numberOfSteps]);

    useLayoutEffect(() => {
        if(notFirst.current)
            setDELAY(0);
    }, [numberOfSteps]);

    return (
        <div tw="flex space-x-2 opacity-70 md:hover:opacity-100 active:opacity-100 duration-300">
            {Array.from({ length: numberOfSteps }).map((_, index) => (
                <DiscreteProgressPoint
                    className={gsapClass || defaultGsapClass}
                    style={{ transform: index === activeStep - 1 ? 'scale(1.1, 1.1)' : 'scale(0.9, 0.9)'}}
                    aria-checked={index < activeStep}
                    key={index}
                    tw="w-3 h-3 rounded-full bg-blue-100 aria-checked:bg-blue-400 opacity-0 md:cursor-pointer"
                    onClick={() => {
                        const targetScrollPosition = index * distancePerStep;
                        if (scrollRef && scrollRef.current) {
                            scrollRef.current.scrollTo({
                                left: targetScrollPosition,
                                behavior: 'smooth'
                            });
                        }
                    }}
                />
            ))}
        </div>
    );
};

const DiscreteProgressPoint = styled.div`
  transition: background-color 0.3s ease;
`;

export default DiscreteProgress;
