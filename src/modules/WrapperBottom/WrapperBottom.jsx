import React from 'react';
import {P} from "@/styles/TextStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw, {styled} from "twin.macro";

export default function WrapperBottom() {
    const WrapperBottom = styled.div`
      ${tw`p-4 font-sans`}
      ${({hasBorder}) => hasBorder && tw`border-purple-500`}
      text-align: center;
    `
    return (
        <WrapperBottom>
            <P color={"rgba(0,0,0,0.5)"}>Made with&nbsp;
                <FontAwesomeIcon icon={solid("heart")} color={"red"}/>
                &nbsp;by QiuYeDx</P>
        </WrapperBottom>
    );
}