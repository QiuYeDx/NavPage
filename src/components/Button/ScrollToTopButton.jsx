import React, {useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';
import gsap from 'gsap';
import {PageButton} from "@/components/Button/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useLocation} from "react-router-dom";

const ScrollToTopButton = () => {
    const gsap_ref = useRef(null);
    const location = useLocation();
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(() => {
        // 清除之前的动画
        if (gsap_ref.current) {
            gsap_ref.current.kill();
        }

        // 新的动画
        gsap_ref.current = gsap.fromTo(
            '#ScrollToTopButton',
            {
                opacity: 0,
                x: 60,
                scale: 0.1,
            },
            {
                scrollTrigger: {
                    trigger: '#rootWrapper',
                    start: 'top+=600 top',
                    end: 'bottom bottom',
                    scrub: 1,
                    // markers: true,   // 调试用
                },
                x: 0,
                opacity: 1,
                scale: 1,
                ease: 'power2.out',
                repeat: 0,
            }
        );
        // 添加ResizeObserver来监控页面高度变化
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // 更新页面高度
                setPageHeight(entry.contentRect.height);
            }
        });

        // 监控根元素（#rootWrapper）的高度变化
        const rootWrapperElement = document.querySelector('#rootWrapper');
        if (rootWrapperElement) {
            observer.observe(rootWrapperElement);
        }

        // 在组件销毁时停止观察
        return () => {
            observer.disconnect();
        };
    }, [location.pathname, pageHeight]); // 在location.pathname发生变化时重新计算动画

    return (
        <div id={'ScrollToTopButton'} tw={'fixed bottom-28 right-3 md:right-12 z-40 md:bottom-12'}>
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
