import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';

const NumberAnimation = ({
                             fromValue = 0,
                             toValue = 0,
                             duration = 2,
                             step = 1,
                             ease = 'power2.out',
                             forceFresh = false
                         }) => {
    const numberRef = useRef();

    useEffect(() => {
        const element = numberRef.current;

        if (forceFresh)
            gsap.fromTo(element, {innerHTML: fromValue}, {
                innerHTML: toValue,
                duration,
                snap: {innerHTML: step},
                ease,
            });
        else gsap.to(element, {
            innerHTML: toValue,
            duration,
            snap: {innerHTML: step},
            ease,
        });
    }, [fromValue, toValue, duration, step]);

    return (
        <div>
            <span ref={numberRef}>{fromValue}</span>
        </div>
    );
};

export default NumberAnimation;
