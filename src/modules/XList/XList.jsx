import {createNElements} from "@/utils/utils";
import React, {useEffect, useLayoutEffect, useRef} from "react";
import tw from 'twin.macro';
import 'twin.macro';
import gsap from "gsap";
import Picture from "@/components/PictureDisplay/Pictrue";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MButtonLight} from "@/components/Button/Styled.twin";
import {ScrollWrapper} from "@/modules/XList/Styled.twin";
import useHorizontalScroll from "@/hooks/useScroll";
import DiscreteProgress from "@/modules/XList/DiscreteProgress";
import {useMediaQuery} from "@/hooks/utilsHooks";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

/**
 * XList Component
 *
 * @component
 *
 * @param {Object} props - The props object
 * @param {string} [props.title='最新资源'] - The title of the list
 * @param {string} [props.desc='向左滑动 查看更多'] - The description of the list
 * @param {string} [props.gsapClass='XListItem'] - The class name for GSAP animations
 * @param {number} [props.offset=120] - The offset for the GSAP animation
 * @param {React.Element} [props.icon] - The FontAwesome icon element
 * @param {string} [props.btnText='打开'] - The text for the button
 *
 * @returns {React.Element} The rendered XList component
 */
export default function XList({
                                  title = '最新资源',
                                  desc = '向左滑动 查看更多',
                                  gsapClass = 'XListItem',
                                  offset = 120,
                                  icon = <FontAwesomeIcon icon={solid("layer-group")} />,
                                  btnText = '打开',
                              }) {
    const isMobile = useMediaQuery(`(max-width: ${WIDTH_MOBILE}px)`);
    const MD_COL_WIDTH = 370;
    const COL_WIDTH = 338;
    const scrollRef = useRef(null);
    const { clientWidth, scrollWidth, scrollPercentage, scrollLeft } = useHorizontalScroll(scrollRef, true);
    const gsap_ref = useRef(null);

    useEffect(() => {
        console.info('isMobile, clientWidth, scrollWidth, scrollPercentage, scrollLeft: ', isMobile, clientWidth, scrollWidth, scrollPercentage, scrollLeft);
    }, [isMobile, clientWidth, scrollWidth, scrollPercentage, scrollLeft]);

    useLayoutEffect(() => {
        // XListItem依次渐入
        if (!gsap_ref.current) {
            gsap_ref.current = gsap.timeline({repeat: 0});

            // 将动画添加到时间轴中
            gsap_ref.current.set(`.${gsapClass}`, {
                x: offset,
                opacity: 0,
                duration: 0,
            });
            gsap_ref.current.to(`.${gsapClass}`, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.12,
                delay: 0.8,
            });
        } else {
            gsap_ref.current.kill();
            gsap_ref.current = gsap.timeline({repeat: 0});

            // 将动画添加到时间轴中
            gsap_ref.current.set(`.${gsapClass}`, {
                x: offset,
                opacity: 0,
                duration: 0,
            });
            gsap_ref.current.to(`.${gsapClass}`, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.12,
                delay: 0.8,
            });
        }
    }, []);

    return (
        <>
            <div tw={'col-span-4 px-4 flex flex-col justify-start items-start h-[60px]'}>
                <div tw={'text-gray-700 font-bold text-3xl h-9'}>
                    <div className={gsapClass}>
                        {title}
                    </div>
                </div>
                <div className={gsapClass} tw={'text-gray-400 overflow-hidden'}>
                    {desc}
                </div>
            </div>

            <div tw={'relative col-span-4 h-[300px] w-full pb-2'}>
                {/* 滚动一列 向左移动 370px */}
                <ScrollWrapper ref={scrollRef}
                    tw={'h-full w-full overflow-x-auto flex gap-2 md:gap-10 snap-x snap-mandatory scroll-px-3 scroll-smooth px-3 -my-2 py-2'}>
                    {createNElements(8, (k) =>
                        <div key={`xlist-col-${k}`} tw={'h-full w-[330px] shrink-0 flex flex-col gap-1 justify-evenly snap-start snap-always'}>
                            {createNElements(3, (i) =>
                                <div key={`xlist-col-${k}-item-${i}`} className={gsapClass}
                                     tw={'h-[72px] shadow-lg rounded-xl bg-white mx-1 flex justify-start px-2 items-center'}>
                                    <Picture errorFlag={true} fadeStyle={'scale'} h={'52px'} w={'52px'} alt={icon}/>
                                    <div tw={'flex flex-col justify-center text-left'}>
                                        <span tw={'leading-4'}>Item {i + 1}</span>
                                        <span tw={'leading-4 text-gray-400 text-sm'}>Item {i + 1}</span>
                                    </div>
                                    <div tw={'grow'}>

                                    </div>
                                    <MButtonLight
                                        tw={'mr-2 md:hover:bg-blue-100 md:active:text-blue-600 md:active:bg-blue-200'}
                                        h={'28px'}
                                        w={'68px'}
                                        onClick={() => {
                                            // eslint-disable-next-line no-script-url
                                            // window.location = props.goto || 'javascript:;';
                                        }}>{btnText}</MButtonLight>
                                </div>)}
                        </div>
                    )}

                    <div tw={'hidden md:block absolute -top-2 -right-8 h-[290px] w-12 bg-gradient-to-l backdrop-blur'}>

                    </div>

                    <div tw={'hidden md:block absolute -top-2 -left-9 h-[290px] w-12 bg-gradient-to-r backdrop-blur'}>

                    </div>
                </ScrollWrapper>
                <div tw={'absolute left-2/4 -translate-x-2/4 translate-y-2'}>
                    <DiscreteProgress clientWidth={clientWidth} scrollWidth={scrollWidth} scrollLeft={scrollLeft} scrollPercentage={scrollPercentage} numberOfSteps={Math.floor((scrollWidth - clientWidth) / (isMobile ? COL_WIDTH : MD_COL_WIDTH)) + 1} distancePerStep={(isMobile ? COL_WIDTH : MD_COL_WIDTH)} scrollRef={scrollRef}/>
                </div>
                {/*<div>{[clientWidth, scrollWidth, scrollPercentage, scrollLeft].join(' / ')}</div>*/}
            </div>
        </>
    );
}