import React, {useEffect, useRef, useState} from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
    WrapperBottom, WrapperLeft, WrapperMain, WrapperMiddle,
    WrapperRight, WrapperTop, Wrapper, SubAvatar
} from "@/views/About/Styled.twin";
import { H1, P } from "@/styles/TextStyles";
import MainCard from "@/components/MainCard/MainCard"
import AppleCard from "@/components/AppleCard/AppleCard"
import toast, { Toaster } from 'react-hot-toast';
import { notify_success } from "@/hooks/toasts";
import { useClipboard } from 'use-clipboard-copy';


export default function About(){
    let [matrix_y, setMatrix_y] = useState(0);
    let apple_card_ref = useRef(null);
    const clipboard = useClipboard();
    let updateMatrix = () => {
        if(apple_card_ref.current){
            let elementToTop = apple_card_ref.current.getBoundingClientRect().top  // element的顶边到视口顶部的距离
            let a = -0.1754386;
            let b = 27.3684211;
            let ans = elementToTop * a + b - 6;
            setMatrix_y(ans > 80 ? 80 : ans );
        }
    }

    useEffect(() => {
        // window.addEventListener("scroll", throttle(updateMatrix, 50), true);
        window.addEventListener("scroll", updateMatrix, true);
        // console.log("effect.");
        return (() => {
            window.removeEventListener("scroll", updateMatrix);
        });
    }, []);

    return (
        <Wrapper>
            <WrapperTop>
                <Toaster/>
            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain>
                    <AppleCard
                        _tw={tw`md:col-span-2 col-span-5 m-4 \
                    bg-blue-200 hover:bg-blue-400 active:bg-blue-200 \ 
                    duration-500 ease-out \ 
                    cursor-pointer select-none`}
                        _tw_content={tw`tracking-widest text-8xl text-white font-bold \
                    group-hover:scale-110 duration-500 ease-out`}
                        icon={<FontAwesomeIcon
                            icon={regular("copy")}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://qiuyedx.github.io/NavPage");
                            notify_success("网站地址已拷贝到剪贴板");
                        }}
                    >
                        分享
                    </AppleCard>

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
                            <a tw={"pl-2 pr-2 text-base text-white font-sans bg-blue-400 border-4 border-blue-200 rounded-xl md:-top-16 mr-4 \
                                hover:bg-blue-300 hover:border-blue-400 hover:shadow-lg hover:scale-110 active:bg-blue-400 active:border-blue-200 active:scale-100 \
                                transition-all cursor-pointer select-none"} href={"mailto:me@qiuyedx.com"}>
                                <FontAwesomeIcon icon={solid("envelope")} tw={"pr-1"}/>
                                Mail
                            </a>
                            <a tw={"pl-2 pr-2 text-base text-white font-sans bg-blue-400 border-4 border-blue-200 rounded-xl md:-top-16 \
                                hover:bg-blue-300 hover:border-blue-400 hover:shadow-lg hover:scale-110 active:bg-blue-400 active:border-blue-200 active:scale-100 \
                                transition-all cursor-pointer select-none"} href={"https://qiuyedx.com"} target="_blank">
                                <FontAwesomeIcon icon={solid("blog")} tw={"pr-1"}/>
                                Blog
                            </a>
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

                    <AppleCard
                        _tw={tw`md:col-span-3 col-span-5 m-4 \
                    bg-blue-200 hover:bg-blue-400 active:bg-blue-200 \ 
                    duration-500 ease-out \
                    cursor-pointer select-none`}
                        _tw_content={tw`tracking-widest text-8xl text-white font-bold \
                    group-hover:scale-110 duration-500 ease-out`}
                        icon={<FontAwesomeIcon
                            icon={regular("copy")}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://qiuyedx.github.io/NavPage");
                            notify_success("网站地址已拷贝到剪贴板");
                        }}
                    >
                        Apple
                    </AppleCard>

                    <MainCard _tw={tw`hidden md:block bg-white md:col-span-2 col-span-5 m-4`} h={"360px"}>

                    </MainCard>

                    <MainCard _tw={tw`hidden md:block bg-white md:col-span-2 col-span-5 m-4`} h={"360px"}>

                    </MainCard>

                    <MainCard _tw={tw`hidden md:block bg-white md:col-span-3 col-span-5 m-4`} h={"360px"}>

                    </MainCard>
                    <MainCard _tw={tw`hidden md:block bg-white md:col-span-3 col-span-5 m-4`} h={"360px"}>

                    </MainCard>

                    <MainCard _tw={tw`hidden md:block bg-white md:col-span-2 col-span-5 m-4`} h={"360px"}>

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