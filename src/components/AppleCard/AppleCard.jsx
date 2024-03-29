import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import 'twin.macro'
import tw from "twin.macro";
import {
    AnimationWrapper, AppleCardWrapper, BackgroundWrapper,
    ContentWrapper, SubBar, Logo, TopTextA, TopTextB, SubTextA
} from "./Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {getOffsetTop, getScrollTop, getClientHeight} from '@/utils/utils';
import {H3, H4} from '@/styles/TextStyles';
import {MButton} from "@/components/Button/Styled.twin";
import { useNavigate } from 'react-router-dom';
import {styles} from './themes';
import {randomNum} from "@/utils/utils";
import PropTypes from 'prop-types';
import {debounce, throttle} from "@/utils/throttle";

/**
 * # AppleCard
 *
 * ## 一款可自定义的视差滚动Card组件，支持tailwind css参数。
 *
 * - h属性用于设置卡片高度；
 * - k属性用于控制背景视差效果的幅度（运动范围）；
 * - theme属性用于设置卡片的主题，支持多种颜色；
 * - logo_url属性用于设置Logo的URL；
 * - goto属性用于设置按钮跳转的URL；
 * - icon属性用于设置卡片内的图标；
 * - topTextA属性用于设置卡片左上角第一行小字标题；
 * - topTextB属性用于设置卡片左上角第二行大字标题；
 * - subTextA属性用于设置卡片左下角小字描述；
 * - hasMask属性用于设置是否显示蒙版；
 * - hasSubBar属性用于设置是否显示底部栏；
 * - _sub_h3属性用于设置底部栏的H3标题；
 * - _sub_h4属性用于设置底部栏的H4标题。
 *
 * ## 部分参数示例
 *
 * + h示例: `h={"360px"}`
 *
 * + k ∈ (0, 1) 负责控制背景视察效果的幅度（运动范围）
 *
 * + theme ∈ [default, black, white, green, yellow, red, pink, purple, gradient_blue]
 *
 * + logo_url示例: `logo_url={"images/QiuYeDx.png"}` css里需要怎么写这里就怎么写（待优化）
 *
 * + icon示例:
 *
 * ```
 * icon={<FontAwesomeIcon icon={regular("copy")} tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}/>}
 * ```
 *
 * @param props {theme, h: string, icon: JSX.Element, topTextA, topTextB, subTextA, hasMask: boolean, hasSubBar: boolean, k: number, logo_url: string, goto: string, tw_card, tw_background, tw_content, tw_subbar, tw_topTextA, tw_topTextB, tw_subButton, tw_subTextA, _sub_h3, _sub_h4, onClick}
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppleCard(props) {
    let [reSize, setReSize] = useState(false);
    let [matrix_y, setMatrix_y] = useState(0);
    let card_wrapper_ref = useRef(null);
    let background_wrapper_ref = useRef(null);
    let [randomClassName] = useState(randomNum(1, 99999));
    let [offset_top, setOffset_top] = useState(0);
    let [client_height, setClient_height] = useState(0);
    let [card_wrapper_height, setCard_wrapper_height] = useState(0);
    let [background_wrapper_height, setBackground_wrapper_height] = useState(0);

    let updateMatrix = () => {
        if (card_wrapper_ref.current && background_wrapper_ref) {
            let scroll_top = getScrollTop();
            let k = props.k ? props.k : 0.7;
            let range_height_oneSide = k * (card_wrapper_height - background_wrapper_height) / 2;
            let ans = -range_height_oneSide;

            if (scroll_top > offset_top - client_height) {
                if (scroll_top > offset_top + card_wrapper_height) {
                    ans = range_height_oneSide;
                    requestAnimationFrame(() => {setMatrix_y(ans);});
                } else {
                    ans = (scroll_top - (offset_top - client_height))
                        /
                        (card_wrapper_height + client_height)
                        *
                        range_height_oneSide * 2
                        -
                        range_height_oneSide
                    ;
                    requestAnimationFrame(() => {setMatrix_y(ans);});
                }
            } else {
                requestAnimationFrame(() => {setMatrix_y(ans);});
            }
        }
    }

    const updateByReSize = () => {
        setReSize(!reSize);
    }

    const updateByReSizeDebounced = debounce(updateByReSize, 100, true);

    const style = ((props.theme && styles[props.theme]) ? styles[props.theme] : styles['default']);
    useEffect(() => {
        setOffset_top(getOffsetTop(card_wrapper_ref.current));
        setClient_height(getClientHeight());
        setCard_wrapper_height(card_wrapper_ref.current.clientHeight);
        setBackground_wrapper_height(background_wrapper_ref.current.clientHeight);
        updateMatrix();
        window.addEventListener("scroll", updateMatrix);    // 如果第三个参数设置为true reSize后则会导致异常多数量的事件被触发。。。
        window.addEventListener('resize', updateByReSizeDebounced); // 如果第三个参数设置为true reSize过程可能会很卡。。。
        return (() => {
            window.removeEventListener("scroll", updateMatrix);
            window.removeEventListener("resize", updateByReSizeDebounced);
        });
    }, [offset_top, client_height, reSize]);



    return (
        <AppleCardWrapper
            className={'group' + ' group' + randomClassName}
            h={props.h || "400px"}
            _tw={style.styleAppleCard}
            _tw_user={props.tw_card || tw` `}
        >
            <TopTextA
                hasMask={props.hasMask}
                _tw={style.styleTopTextA}
                _tw_user={props.tw_topTextA || tw` `}
            >
                {props.topTextA || ''}
            </TopTextA>
            <TopTextB
                hasMask={props.hasMask}
                _tw={style.styleTopTextB}
                _tw_user={props.tw_topTextB || tw` `}
            >
                {props.topTextB || ''}
            </TopTextB>
            <SubTextA
                hasSubBar={props.hasSubBar}
                hasMask={props.hasMask}
                _tw={style.styleSubTextA}
                _tw_user={props.tw_subTextA || tw` `}
            >
                {props.subTextA || ''}
            </SubTextA>
            <AnimationWrapper
                ref={card_wrapper_ref}
                hasSubBar={props.hasSubBar}
                onClick={props.onClick}
            >
                <BackgroundWrapper
                    ref={background_wrapper_ref}
                    _Y={matrix_y}
                    _tw={style.styleBackground}
                    _tw_user={props.tw_background || tw` `}
                    _hover={'.group' + randomClassName + style.hoverBackground}
                    _active={'.group' + randomClassName + style.activeBackground}
                >
                    {
                        props.icon
                        ||
                        <FontAwesomeIcon
                            icon={regular("copy")}
                            tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />
                    }
                </BackgroundWrapper>
                <ContentWrapper
                    style={{transition: 'scale 0.3s ease'}}
                    hasMask={props.hasMask}
                    _tw={style.styleContent}
                    _tw_user={props.tw_content || tw` `}
                    _hover={'.group' + randomClassName + style.hoverContent}
                    _active={'.group' + randomClassName + style.activeContent}
                >
                    {props.children}
                </ContentWrapper>
            </AnimationWrapper>
            {props.hasSubBar &&
                <SubBar
                    _tw={style.styleSubBar}
                    _tw_user={props.tw_subbar || tw` `}
                >
                    <Logo url={props.logo_url}/>
                    <div tw={"pl-4 flex-col items-start text-left h-12 flex-grow shrink truncate"}>
                        <H3 tw={"tracking-wide truncate"}>{props._sub_h3 || ''}</H3>
                        <H4 tw={"tracking-widest truncate"}>{props._sub_h4 || ''}</H4>
                    </div>
                    {/*<div tw={"flex-grow"}> </div>*/}
                    <MButton
                        _tw={style.styleSubButton}
                        _tw_user={props.tw_subButton || tw` `}
                        onClick={() => {
                        // eslint-disable-next-line no-script-url
                        window.location = props.goto || 'javascript:;';
                    }}>打开</MButton>
                </SubBar>
            }
        </AppleCardWrapper>
    );
}

AppleCard.propTypes = {
    h: PropTypes.string,
    k: PropTypes.number,
    theme: PropTypes.oneOf(['default', 'white', 'black', 'green', 'purple', 'pink', 'gradient_blue']),
    logo_url: PropTypes.string,
    goto: PropTypes.string,
    icon: PropTypes.element,
    topTextA: PropTypes.string,
    topTextB: PropTypes.string,
    subTextA: PropTypes.node,
    hasMask: PropTypes.bool,
    hasSubBar: PropTypes.bool,
    _sub_h3: PropTypes.string,
    _sub_h4: PropTypes.string,
    onClick: PropTypes.func,
    tw_card: PropTypes.object,
    tw_background: PropTypes.object,
    tw_content: PropTypes.object,
    tw_subbar: PropTypes.object,
    tw_topTextA: PropTypes.object,
    tw_topTextB: PropTypes.object,
    tw_subTextA: PropTypes.object,
    tw_subButton: PropTypes.object,
};