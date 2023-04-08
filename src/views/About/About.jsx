import React from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
    WrapperBottom, WrapperLeft, WrapperMain, WrapperMiddle,
    WrapperRight, WrapperTop, Wrapper, SubAvatar, BaseButtonA
} from "@/views/About/Styled.twin";
import { H1, P } from "@/styles/TextStyles";
import MainCard from "@/components/MainCard/MainCard"


export default function About(){

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain>
                    <MainCard _tw={tw`bg-white md:col-span-2 hidden md:block m-4`} h={"360px"}>

                    </MainCard>

                    <MainCard _tw={tw`bg-blue-400 md:hidden col-span-5 m-4 mb-10 border-8 border-blue-200 border-opacity-50`} h={"80px"}>
                        <div tw={"text-2xl text-white font-bold font-sans mt-4"}>
                            关 于
                        </div>
                    </MainCard>

                    <MainCard _tw={tw`bg-white md:col-span-3 col-span-5 m-4 relative`} h={"360px"} >
                        <br/>
                        <SubAvatar img={"images/QiuYeDx.png"} hasBorder h={"100px"} w={"100px"}/>
                        <br/>
                        <div tw={"text-xl text-gray-700 font-sans mt-2 font-bold"}>QiuYeDx</div>
                        <div tw={"flex flex-row mt-2"}>
                            <div tw={"pl-2 pr-2 text-base text-white font-sans bg-blue-400 border-4 border-blue-200 rounded-xl md:-top-16 mr-4 \
                                hover:bg-blue-300 hover:border-blue-400 hover:shadow-lg hover:scale-110 transition-all cursor-pointer select-none"}>
                                <FontAwesomeIcon icon={solid("envelope")} tw={"pr-1"}/>
                                Mail
                            </div>
                            <div tw={"pl-2 pr-2 text-base text-white font-sans bg-blue-400 border-4 border-blue-200 rounded-xl md:-top-16 \
                                hover:bg-blue-300 hover:border-blue-400 hover:shadow-lg hover:scale-110 transition-all cursor-pointer select-none"}>
                                <FontAwesomeIcon icon={solid("blog")} tw={"pr-1"}/>
                                Blog
                            </div>
                        </div>
                        <FontAwesomeIcon icon={solid("quote-left")} size={"xl"} tw={"pr-4 relative top-6 -left-24"}/>
                        <div tw={"text-base text-gray-500 font-sans -mb-2"}>
                            IT、数码、摄影、ACG<br/>
                            正在向着全栈自由出发
                        </div>
                        <FontAwesomeIcon icon={solid("quote-right")} size={"xl"} tw={"pl-4 relative -top-4 left-24"}/>
                        <div tw={"relative w-full pl-6 pr-6"}>
                            <div tw={"pt-4 pb-4 text-xl text-white font-bold font-sans bg-blue-400 rounded-2xl flex justify-center items-center"}>
                                <div tw={"flex-1 h-24 flex flex-col"}>
                                    <div tw={"flex-grow"}><FontAwesomeIcon icon={solid("mars")} /></div>
                                    <div tw={"flex-grow font-normal text-base"}>性别</div>
                                    <div tw={"flex-grow"}>男</div>
                                </div>
                                <div tw={"flex-1 h-24 flex flex-col"}>
                                    <div tw={"flex-grow"}><FontAwesomeIcon icon={solid("user")} /></div>
                                    <div tw={"flex-grow font-normal text-base"}>年龄</div>
                                    <div tw={"flex-grow"}>21</div>
                                </div>
                                <div tw={"flex-1 h-24 flex flex-col"}>
                                    <div tw={"flex-grow"}><FontAwesomeIcon icon={solid("graduation-cap")} /></div>
                                    <div tw={"flex-grow font-normal text-base"}>学校</div>
                                    <div tw={"flex-grow md:hidden"}>NEU</div>
                                    <div tw={"flex-grow hidden md:block"}>东北大学</div>
                                </div>
                            </div>
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