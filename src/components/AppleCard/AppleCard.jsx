import React, {useEffect, useRef, useState} from 'react';
import 'twin.macro'
import tw from "twin.macro";
import {AppleCardWrapper, BackgroundWrapper, ContentWrapper} from "./Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {getOffsetTop, getScrollTop, getClientHeight} from '@/utils/utils';

export default function AppleCard(props){
    let [matrix_y, setMatrix_y] = useState(0);
    let card_wrapper_ref = useRef(null);
    let background_wrapper_ref = useRef(null);

    let updateMatrix = () => {
        if(card_wrapper_ref.current && background_wrapper_ref){
            let offset_top = getOffsetTop(card_wrapper_ref.current); // element的顶边到文档流顶部的距离
            let scroll_top = getScrollTop();
            let client_height = getClientHeight();
            let card_wrapper_height = card_wrapper_ref.current.clientHeight;
            let background_wrapper_height = background_wrapper_ref.current.clientHeight;

            let k = props.k ? props.k : 0.7;
            let range_height_oneSide = k * (card_wrapper_height - background_wrapper_height) / 2;

            let ans = -range_height_oneSide;

            if(scroll_top > offset_top - client_height){
                if(scroll_top > offset_top + card_wrapper_height){
                    ans = range_height_oneSide;
                    setMatrix_y(ans);
                }else{
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
            }else{
                setMatrix_y(ans);
            }
        }
    }

    useEffect(() => {
        updateMatrix();
        window.addEventListener("scroll", updateMatrix, true);
        return (() => {
            window.removeEventListener("scroll", updateMatrix);
        });
    }, []);

    return (
        <AppleCardWrapper
            ref={card_wrapper_ref}
            className={"group"}
            h={"360px"}
            _tw={props._tw || tw`md:col-span-2 col-span-5 m-4 \
                bg-blue-200 hover:bg-blue-400 active:bg-blue-200 \ 
                duration-500 ease-out \ 
                cursor-pointer select-none`}
            onClick={props.onClick}
        >
            <BackgroundWrapper
                ref={background_wrapper_ref}
                _Y={matrix_y}
                tw={"text-blue-400 group-hover:text-blue-300 "}
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
                _tw={props._tw_content || tw`tracking-widest text-8xl text-white font-bold \
                    group-hover:scale-110 duration-500 ease-out`}>
                {props.children}
            </ContentWrapper>
        </AppleCardWrapper>
    );
}