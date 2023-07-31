import React, {useEffect, useRef, useState} from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid, regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {
    WrapperLeft, WrapperMain, WrapperMiddle,
    WrapperRight
} from "@/layout/MainWrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import MainCard from "@/components/MainCard/MainCard"
import AppleCard from "@/components/AppleCard/AppleCard"
import {notify_error, notify_success} from "@/hooks/toasts";
import {useClipboard} from 'use-clipboard-copy';
import {faApple, faGithub, faTwitter, faWordpress, faGoogle, faQq} from '@fortawesome/free-brands-svg-icons'
import MyProfileCard from "@/modules/MyProfileCard/MyProfileCard";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import {log_api_config} from "@/GlobalConfig";
import axios from "axios";
import NumberAnimation from "@/styles/NumberAnimation";

export default function About() {
    const clipboard = useClipboard();
    const [likeCount, setLikeCount] = useState(null);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        try {
            const res = await log_api_config.awaitCountAPI('GET', 'like');
            setLikeCount(res.data[0].count);
            return 'Succeed to fetch like count';
        } catch (err) {
            if(process.env.NODE_ENV === 'development')
                console.log(err);
            setIsError(true);
            return 'Failed to fetch like count';
        }
    }

    useEffect(() => {
        fetchData().then(r => console.log(r)).catch(e => console.log(e));
    }, []);

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain tw={'grid-cols-5'}>
                    <MyProfileCard onlyMobile/>

                    <AppleCard
                        theme={'defaults'}
                        h={"360px"}
                        k={0.5}
                        topTextA={"Like"}
                        topTextB={"当前点赞数"}
                        subTextA={"支持一下"}
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-wide`}
                        icon={<FontAwesomeIcon icon={solid("thumbs-up")}
                                               tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={async () => {
                            // 更新点赞次数
                            try {
                                const res = await log_api_config.awaitCountAPI('PUT', 'like');
                                setLikeCount(res.data[0].count);
                                notify_success("已点赞, 感谢您的支持 !", "like_1");
                            } catch (err) {
                                notify_error("点赞失败, 但还是感谢您的支持 !", "like_error_1");
                            }
                        }}
                    >
                        {likeCount ? <NumberAnimation fromValue={0} toValue={likeCount} duration={2} step={1} /> :
                            isError ? <FontAwesomeIcon icon={solid("exclamation")} shake/> :
                                <FontAwesomeIcon icon={solid("spinner")} spin/>
                        }
                    </AppleCard>
                    <MainCard
                        _tw={tw`bg-blue-400 md:hidden col-span-5 m-4 mb-10 border-8 border-blue-200 border-opacity-50 hidden md:block`}
                        h={"80px"}>
                        <div tw={"text-2xl text-white font-bold font-sans mt-4"}>
                            关 于
                        </div>
                    </MainCard>

                    <MyProfileCard notMobile/>
                    <AppleCard
                        k={0.5}
                        hasSubBar
                        goto={'https://twitter.com/QiuYeDx'}
                        topTextA={"社交"}
                        topTextB={"我的推特空间"}
                        tw_card={tw`md:col-span-3`}
                        tw_content={tw`tracking-wide text-7xl md:text-8xl`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        _sub_h3={'QiuYeDx'}
                        _sub_h4={'秋夜殿下的推特空间'}
                        logo_url={'images/twitter.png'}
                        icon={<FontAwesomeIcon
                            icon={faTwitter}
                            tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://twitter.com/QiuYeDx");
                            notify_success("我的twitter地址Copied !", "copy_2");
                        }}
                    >
                        Twitter
                    </AppleCard>

                    <AppleCard
                        k={0.5}
                        topTextA={"通讯"}
                        topTextB={"我的企鹅账号"}
                        subTextA={"欢迎扩列"}
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-widest`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={faQq}
                            tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("532024989");
                            notify_success("我的QQ号码Copied !", "copy_7");
                        }}
                    >
                        QQ
                    </AppleCard>

                    <AppleCard
                        theme={'white'}
                        hasMask
                        k={0.5}
                        topTextA={"灵感"}
                        topTextB={"我的设计灵感"}
                        subTextA={"取之不尽"}
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-wider`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={faApple}
                            tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://apple.com");
                            notify_success("Apple官网地址Copied !", "copy_4");
                        }}
                    >
                        Apple
                    </AppleCard>

                    <AppleCard
                        hasSubBar
                        theme={'purple'}
                        goto={"https://qiuyedx.com"}
                        k={0.5}
                        topTextA={"博客"}
                        topTextB={"我的创作空间"}
                        tw_card={tw`md:col-span-3`}
                        tw_content={tw`tracking-widest`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        _sub_h3={'秋夜のブログ'}
                        _sub_h4={'秋夜殿下的博客'}
                        icon={<FontAwesomeIcon
                            icon={faWordpress}
                            tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://qiuyedx.com");
                            notify_success("我的Blog地址Copied !", "copy_5");
                        }}
                    >
                        Blog
                    </AppleCard>

                    <AppleCard
                        theme={'green'}
                        k={0.5}
                        hasSubBar
                        goto={"https://share.qiuyedx.com"}
                        topTextA={"网盘"}
                        topTextB={"我的网络存储"}
                        tw_card={tw`md:col-span-3`}
                        tw_content={tw`tracking-tight md:tracking-wider text-7xl font-black`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        _sub_h3={'次元空间'}
                        _sub_h4={'秋夜殿下的网络存储'}
                        logo_url={'images/Alist_M.jpeg'}
                        icon={
                            <FontAwesomeIcon
                                icon={solid("server")}
                                tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                            />}
                        onClick={() => {
                            clipboard.copy("https://share.qiuyedx.com");
                            notify_success("次元空间地址Copied !", "copy_6");
                        }}
                    >
                        次元空间
                    </AppleCard>

                    <AppleCard
                        theme={'black'}
                        k={0.5}
                        topTextA={"代码"}
                        topTextB={"我的代码仓库"}
                        subTextA={"灵感碰撞"}
                        hasMask
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-widest md:tracking-wider text-7xl md:text-8xl`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon
                            icon={faGithub}
                            tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            clipboard.copy("https://github.com/QiuYeDx");
                            notify_success("我的Github地址Copied !", "copy_3");
                        }}
                    >
                        Github
                    </AppleCard>

                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}