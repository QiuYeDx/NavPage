import React from 'react';
import {P} from "@/styles/TextStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw, {styled} from "twin.macro";

const WrapperBottomStyle = styled.div`
  ${tw`p-4 font-sans`}
  ${({hasBorder}) => hasBorder && tw`border-purple-500`}
  text-align: center;
`

export default function WrapperBottom() {
    return (
        <WrapperBottomStyle>
            <P color={"rgba(0,0,0,0.5)"}>Made with&nbsp;
                <FontAwesomeIcon icon={solid("heart")} color={"red"}/>
                &nbsp;by <a href={'https://qiuyedx.com/me'}
                            tw={'text-blue-500 font-bold'}>QiuYeDx</a></P>
        </WrapperBottomStyle>
    );
}