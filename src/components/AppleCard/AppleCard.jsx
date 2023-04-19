import React, {useEffect, useRef, useState} from 'react';
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
// import {throttle} from '@/utils/throttle';

/**
 * # AppleCard
 *
 * ## 一款可自定义的视差滚动Card组件，支持tailwind css参数。
 *
 * - h属性用于设置卡片高度；
 * - k属性用于控制背景视差效果的幅度（运动范围）；
 * - theme属性用于设置卡片的主题，支持多种颜色；
 * - logo_url属性用于设置Logo的URL；
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
 * + theme ∈ [default, black, white, green, yellow, red, pink, purple]
 *
 * + logo_url示例: `logo_url={"images/QiuYeDx.png"}` css里需要怎么写这里就怎么写（待优化）
 *
 * + icon示例:
 *
 * ```
 * icon={<FontAwesomeIcon icon={regular("copy")} tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}/>}
 * ```
 *
 * @param props {theme, h: string, icon: JSX.Element, topTextA, topTextB, subTextA, hasMask: boolean, hasSubBar: boolean, k: number, logo_url, tw_card , tw_background, tw_content, tw_subbar, tw_topTextA, tw_topTextB, tw_subButton, tw_subTextA, _sub_h3, _sub_h4}
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppleCard(props) {
    const navigate = useNavigate();
    let [matrix_y, setMatrix_y] = useState(0);
    let card_wrapper_ref = useRef(null);
    let background_wrapper_ref = useRef(null);
    let [randomClassName] = useState(randomNum(1, 99999));

    let updateMatrix = () => {
        if (card_wrapper_ref.current && background_wrapper_ref) {
            let offset_top = getOffsetTop(card_wrapper_ref.current); // element的顶边到文档流顶部的距离
            let scroll_top = getScrollTop();
            let client_height = getClientHeight();
            let card_wrapper_height = card_wrapper_ref.current.clientHeight;
            let background_wrapper_height = background_wrapper_ref.current.clientHeight;

            let k = props.k ? props.k : 0.7;
            let range_height_oneSide = k * (card_wrapper_height - background_wrapper_height) / 2;

            let ans = -range_height_oneSide;

            if (scroll_top > offset_top - client_height) {
                if (scroll_top > offset_top + card_wrapper_height) {
                    ans = range_height_oneSide;
                    setMatrix_y(ans);
                } else {
                    ans = (scroll_top - (offset_top - client_height))
                        /
                        (card_wrapper_height + client_height)
                        *
                        range_height_oneSide * 2
                        -
                        range_height_oneSide
                    ;
                    setMatrix_y(ans);
                }
            } else {
                setMatrix_y(ans);
            }
        }
    }
    const [style, setStyle] = useState(styles['default']);
    // const style = ((props.theme && styles[props.theme]) ? styles[props.theme] : styles['default']);
    useEffect(() => {
        setStyle((props.theme && styles[props.theme]) ? styles[props.theme] : styles['default']);
        console.log(props.theme, styles[props.theme]);
        updateMatrix();
        window.addEventListener("scroll", updateMatrix, true);
        // window.addEventListener("scroll", throttle(updateMatrix, 8), true);
        return (() => {
            window.removeEventListener("scroll", updateMatrix);
        });
    }, [props.theme]);

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
                >
                    {
                        props.icon
                        ||
                        <FontAwesomeIcon
                            icon={regular("copy")}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />
                    }
                </BackgroundWrapper>
                <ContentWrapper
                    hasMask={props.hasMask}
                    _tw={style.styleContent}
                    _tw_user={props.tw_content || tw` `}
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
                    <div tw={"pl-4 flex-col items-start text-left h-12"}>
                        <H3 tw={"tracking-wide"}>{props._sub_h3 || ''}</H3>
                        <H4 tw={"tracking-widest"}>{props._sub_h4 || ''}</H4>
                    </div>
                    <div tw={"flex-grow"}> </div>
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