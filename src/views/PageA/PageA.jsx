import React from 'react';
import { Wrapper } from "./Styled.twin";
import {WrapperBottom, WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight, WrapperTop} from "@/views/PageA/Styled.twin";
import "twin.macro";
import tw from "twin.macro";
import MainCard from "@/components/MainCard/MainCard";
import {P} from "@/styles/TextStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {SubAvatar} from "@/views/About/Styled.twin";

export default function PageA(){

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
                            工 具
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
                <P color={"rgba(0,0,0,0.7)"}>Made with&nbsp;
                    <FontAwesomeIcon icon={solid("heart")} color={"red"} flip/>
                    &nbsp;by QiuYeDx</P>
            </WrapperBottom>
        </Wrapper>
    );
}