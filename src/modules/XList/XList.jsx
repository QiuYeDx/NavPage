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
 * 一个用于展示列表的组件，支持通过 GSAP 实现动画效果。此组件允许用户滑动查看更多条目，并支持自定义标题、描述、按钮文本和图标。
 *
 * @component
 *
 * @param {Object} props - 组件的属性对象。
 * @param {string} [props.title='最新资源'] - 列表的标题。
 * @param {string} [props.desc='向左滑动 查看更多'] - 列表的描述文本。
 * @param {string} [props.gsapClass='XListItem'] - 用于 GSAP 动画的类名。
 * @param {number} [props.offset=120] - GSAP 动画的偏移量。
 * @param {React.Element|string} [props.icon] - 用于列表项的默认 FontAwesome 图标元素或图片 URL。如果是字符串，则被视为图片 URL。
 * @param {string} [props.btnText='打开'] - 按钮上显示的文本。
 * @param {Array<Object>} [props.dataSource=[]] - 数据源参数，是一个对象数组，每个对象表示列表中的一个项目。每个对象应包含项目所需的所有数据，如图标、标题、描述等。
 * @param {number} [props.itemsPerColumn=3] - 每列显示的项目数量。这个参数决定了在每列中渲染多少个项目。
 *
 * @returns {React.Element} 渲染的 XList 组件。
 */
export default function XList({
                                  title = '最新资源',
                                  desc = '向左滑动 查看更多',
                                  gsapClass = 'XListItem',
                                  offset = 120,
                                  icon = <FontAwesomeIcon icon={solid("layer-group")} />,
                                  btnText = '打开',
                                  dataSource = [{ icon: <FontAwesomeIcon icon={solid("camera")} />, itemTitle: "标题", itemDesc: "描述", btnText: "查看", btnClick: "https://qiuyedx.com" }], // 新增数据源参数
                                  itemsPerColumn = 3, // 新增每列项目个数参数
                              }) {
    const isMobile = useMediaQuery(`(max-width: ${WIDTH_MOBILE}px)`);
    const MD_COL_WIDTH = 370;
    const COL_WIDTH = 338;
    const scrollRef = useRef(null);
    const { clientWidth, scrollWidth, scrollPercentage, scrollLeft } = useHorizontalScroll(scrollRef, true);
    const gsap_ref = useRef(null);

    useLayoutEffect(() => {
        // XListItem依次渐入
        if (!gsap_ref.current) {
            gsap_ref.current = gsap.timeline({ repeat: 0 });

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
            gsap_ref.current = gsap.timeline({ repeat: 0 });

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

    // 将数据源分配到列中
    const columns = [];
    for (let i = 0; i < Math.ceil(dataSource.length / itemsPerColumn); i++) {
        columns.push(dataSource.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn));
    }

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

            <div tw={'relative col-span-4 min-h-[120px] w-full pb-2 mt-2.5 pt-1'}>
                <ScrollWrapper ref={scrollRef} tw={'h-full w-full overflow-x-auto flex gap-2 md:gap-10 snap-x snap-mandatory scroll-px-3 scroll-smooth px-3 -my-2 py-2'}>
                    {columns.map((column, k) => (
                        <div key={`xlist-col-${k}`} tw={'h-full w-[330px] pb-4 shrink-0 flex flex-col gap-1 justify-start snap-start snap-always'}>
                            {column.map((item, i) => (
                                <div key={`xlist-col-${k}-item-${i}`} className={gsapClass} tw={'h-[64px] mb-5 shrink-0 shadow-lg rounded-xl bg-white mx-1 flex justify-start px-2 items-center'}>
                                    {/*<Picture errorFlag={true} fadeStyle={'scale'} h={'52px'} w={'52px'} alt={item.icon || icon} />*/}
                                    {
                                        typeof item.icon === 'string' ?
                                            // item.icon 是字符串，作为图片 URL 处理
                                            <Picture img_tw={tw`w-10 h-10`} fadeStyle={'scale'} h={'52px'} w={'52px'} url={item.icon} /> :
                                            // item.icon 是 React 元素，使用 alt 属性
                                            <Picture errorFlag={true} fadeStyle={'scale'} h={'52px'} w={'52px'} alt={item.icon || icon} altFullHeight={true} />
                                    }
                                    <div tw={'flex flex-col gap-1 justify-center text-left pl-1'}>
                                        <span tw={'leading-4'}>{item.itemTitle}</span>
                                        <span tw={'leading-4 text-gray-400 text-sm truncate inline-block leading-[1.15rem] max-w-[170px]'}>{item.itemDesc}</span>
                                    </div>
                                    <div tw={'grow'}></div>
                                    <MButtonLight tw={'mr-2 md:hover:bg-blue-100 md:active:text-blue-600 md:active:bg-blue-200'}
                                                  style={{ fontSize: item.btnText && item.btnText.length > 2 ? '12px' : '15px' }}
                                                  h={'28px'} w={'68px'}
                                                  onClick={() => {
                                                      if (typeof item.btnClick === 'string') {
                                                          // 如果是字符串，则在新标签页中打开链接
                                                          window.open(item.btnClick, '_blank');
                                                      } else if (typeof item.btnClick === 'function') {
                                                          // 如果是函数，则执行该函数
                                                          item.btnClick();
                                                      } else {
                                                          // 否则，不执行任何操作
                                                      }
                                                  }}
                                    >
                                        {item.btnText || btnText}
                                    </MButtonLight>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div tw={'hidden md:block absolute -top-2 -right-8 h-[290px] w-12 bg-gradient-to-l backdrop-blur'}></div>
                    <div tw={'hidden md:block absolute -top-2 -left-9 h-[290px] w-12 bg-gradient-to-r backdrop-blur'}></div>
                </ScrollWrapper>
                <div tw={'absolute left-2/4 -translate-x-2/4 translate-y-2'}>
                    <DiscreteProgress clientWidth={clientWidth} scrollWidth={scrollWidth} scrollLeft={scrollLeft} scrollPercentage={scrollPercentage} numberOfSteps={Math.floor((scrollWidth - clientWidth) / (isMobile ? COL_WIDTH : MD_COL_WIDTH)) + 1} distancePerStep={(isMobile ? COL_WIDTH : MD_COL_WIDTH)} scrollRef={scrollRef}/>
                </div>
            </div>
        </>
    );
}