import React from 'react';
import { Wrapper } from "./Styled.twin";
import {WrapperBottom, WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight, WrapperTop} from "@/views/PageA/Styled.twin";

export default function PageA(){

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain>
                    工具页
                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom>

            </WrapperBottom>
        </Wrapper>
    );
}