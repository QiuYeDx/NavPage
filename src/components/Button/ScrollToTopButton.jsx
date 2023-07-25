import React, {useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';
import gsap from 'gsap';
import {PageButton} from "@/components/Button/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const ScrollToTopButton = (props) => {
    const gsap_ref = useRef(null);

    useEffect(() => {
        // 渐入动画
        gsap_ref.current = gsap.fromTo('#ScrollToTopButton', {
            opacity: 0,
            x: 60,
            scale: 0.1,
        }, {
            scrollTrigger: {
                trigger: '.root',
                start: 'top+=800', // 在页面上滚动到距离顶部 800px 的位置时触发动画
                scrub: true,
            },
            x: 0,
            opacity: 1,
            scale: 1,
            // duration: 1,
            ease: 'power2.out',
            repeat: 0,
        });
    }, []);

    return (
        <div className={props.className} id={'ScrollToTopButton'} tw={'fixed bottom-28 right-2 md:right-12 z-40 md:bottom-12'}>
            <PageButton
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
            >
                <FontAwesomeIcon icon={solid("chevron-up")}/>
            </PageButton>
        </div>
    );
};

export default ScrollToTopButton;
