import React from 'react';
import { Wrapper } from "./Styled.twin";
import {WrapperBottom, WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight, WrapperTop} from "@/views/Styled.twin";
import MainCard from "@/components/MainCard/MainCard";
import tw from "twin.macro";
import 'twin.macro';

export default function PageB(){

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain>
                    <MainCard _tw={tw`bg-white md:col-span-5 hidden md:block m-4`} h={"360px"}>

                    </MainCard>

                    <MainCard _tw={tw`bg-blue-400 md:hidden col-span-5 m-4 mb-10 border-8 border-blue-200 border-opacity-50`} h={"80px"}>
                        <div tw={"w-full pl-12 pr-12 text-2xl text-white font-bold font-sans mt-4"}>
                            资 源
                        </div>
                    </MainCard>

                    <MainCard _tw={tw`bg-white md:col-span-3 col-span-5 m-4`} h={"360px"} >

                    </MainCard>

                    <MainCard _tw={tw`bg-white md:col-span-2 col-span-5 m-4`} h={"360px"}>
                    </MainCard>
                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom>

            </WrapperBottom>
        </Wrapper>
    );
}