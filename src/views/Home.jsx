import React from 'react';
import {
    Wrapper, WrapperMiddle , WrapperLeft,
    WrapperRight, WrapperBottom, WrapperTop,
    WrapperMain
} from './Styled.twin'

export default function Home(){
    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain>
                    Home Page
                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom>

            </WrapperBottom>
        </Wrapper>
    );
}