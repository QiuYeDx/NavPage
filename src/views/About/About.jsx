import React, {useEffect, useRef, useState} from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid, regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {
    WrapperBottom, WrapperLeft, WrapperMain, WrapperMiddle,
    WrapperRight, WrapperTop, Wrapper, SubAvatar
} from "@/views/About/Styled.twin";
import {P} from "@/styles/TextStyles";
import MainCard from "@/components/MainCard/MainCard"
import AppleCard from "@/components/AppleCard/AppleCard"
import {Toaster} from 'react-hot-toast';
import {notify_success} from "@/hooks/toasts";
import {useClipboard} from 'use-clipboard-copy';
import { faApple, faGithub, faTwitter, faWordpress, faGoogle, faQq } from '@fortawesome/free-brands-svg-icons'
import MyProfileCard from "@/modules/MyProfileCard/MyProfileCard";


export default function About() {
    const clipboard = useClipboard();

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
                        k={0.5}
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw``}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={regular("copy")}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://qiuyedx.github.io/NavPage");
                            notify_success("秋夜导航站地址已拷贝到剪贴板", "copy_1");
                        }}
                    >
                        分享
                    </AppleCard>

                    <MainCard
                        _tw={tw`bg-blue-400 md:hidden col-span-5 m-4 mb-10 border-8 border-blue-200 border-opacity-50`}
                        h={"80px"}>
                        <div tw={"text-2xl text-white font-bold font-sans mt-4"}>
                            关 于
                        </div>
                    </MainCard>

                    <MyProfileCard/>

                    <AppleCard
                        k={0.5}
                        tw_card={tw`md:col-span-3`}
                        tw_content={tw`tracking-wide`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={faTwitter}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://twitter.com/QiuYeDx");
                            notify_success("我的twitter地址已拷贝到剪贴板", "copy_2");
                        }}
                    >
                        twitter
                    </AppleCard>

                    <AppleCard
                        theme={'black'}
                        k={0.5}
                        hasMask
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-wide`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={faGithub}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://github.com/QiuYeDx");
                            notify_success("我的Github地址已拷贝到剪贴板", "copy_3");
                        }}
                    >
                        Github
                    </AppleCard>

                    <AppleCard
                        theme={'white'}
                        hasMask
                        k={0.5}
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-wider`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={faApple}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://apple.com");
                            notify_success("Apple官网地址已拷贝到剪贴板", "copy_4");
                        }}
                    >
                        Apple
                    </AppleCard>

                    <AppleCard
                        h={"360px"}
                        hasSubBar
                        goto={"https://qiuyedx.com"}
                        k={0.5}
                        tw_card={tw`md:col-span-3`}
                        tw_content={tw`tracking-widest`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        _sub_h3={'秋夜のブログ'}
                        _sub_h4={'秋夜殿下的博客'}
                        icon={<FontAwesomeIcon
                            icon={faWordpress}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://qiuyedx.com");
                            notify_success("我的Blog地址已拷贝到剪贴板", "copy_5");
                        }}
                    >
                        Blog
                    </AppleCard>

                    <AppleCard
                        k={0.5}
                        tw_card={tw`md:col-span-3`}
                        tw_content={tw`tracking-tight md:tracking-wider`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={faGoogle}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://google.com");
                            notify_success("Google地址已拷贝到剪贴板", "copy_6");
                        }}
                    >
                        Google
                    </AppleCard>

                    <AppleCard
                        k={0.5}
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-widest`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={faQq}
                            tw={"w-48 h-48 scale-110 group-hover:scale-90 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("532024989");
                            notify_success("我的QQ号码已拷贝到剪贴板", "copy_7");
                        }}
                    >
                        QQ
                    </AppleCard>
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