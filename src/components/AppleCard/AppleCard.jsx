import React, {useRef} from 'react';
import 'twin.macro'
import tw from "twin.macro";
import {AppleCardWrapper, BackgroundWrapper, ContentWrapper} from "./Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";

export default function AppleCard(props){
    let apple_card_ref = useRef(null);

    return (
        <AppleCardWrapper
            ref={apple_card_ref}
            className={"group"}
            h={"360px"}
            _tw={props._tw || tw`md:col-span-2 col-span-5 m-4 \
                bg-blue-200 hover:bg-blue-400 active:bg-blue-200 \ 
                duration-500 ease-out \ 
                cursor-pointer select-none`}
            onClick={props.onClick}
        >
            <BackgroundWrapper _Y={0} tw={"text-blue-400 group-hover:text-blue-300 "}>
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