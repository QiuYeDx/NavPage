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
import {faApple, faGithub} from "@fortawesome/free-brands-svg-icons";
import {notify_error, notify_success} from "@/hooks/toasts";
import AppleCard from "@/components/AppleCard/AppleCard";
import {useClipboard} from "use-clipboard-copy";

export default function PageA(){
    const clipboard = useClipboard();

    const componentCount = 9;
    const components = [];
    for (let i = 0; i < componentCount; i++) {
        components.push(<AppleCard
            theme={'white'}
            hasMask
            k={0.5}
            topTextA={"在线工具"}
            topTextB={"预设调色板"}
            subTextA={"常用色彩"}
            tw_card={tw`md:col-span-2`}
            tw_content={tw`tracking-wider`}
            tw_background={tw``}
            tw_subbar={tw``}
            icon={<FontAwesomeIcon icon={solid("palette")}
                                   tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
            />}
            onClick={() => {
                notify_error("暂未完工", "A_5");
            }}
        />);
    }
    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain>
                    {/*<MainCard _tw={tw`bg-white md:col-span-5 hidden md:block m-4`} h={"360px"}>*/}

                    {/*</MainCard>*/}

                    <MainCard _tw={tw`bg-blue-400 md:hidden col-span-5 m-4 mb-10 border-8 border-blue-200 border-opacity-50`} h={"80px"}>
                        <div tw={"w-full pl-12 pr-12 text-2xl text-white font-bold font-sans mt-4"}>
                            工 具
                        </div>
                    </MainCard>

                    {/*<MainCard _tw={tw`bg-white md:col-span-3 col-span-5 m-4`} h={"360px"} >*/}

                    {/*</MainCard>*/}

                    {/*<MainCard _tw={tw`bg-white md:col-span-2 col-span-5 m-4`} h={"360px"}>*/}

                    {/*</MainCard>*/}

                    <AppleCard
                        theme={'black'}
                        k={0.5}
                        topTextA={"在线工具"}
                        topTextB={"二维码生成器"}
                        subTextA={"QR码"}
                        hasMask
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-wide`}
                        tw_background={tw``}
                        tw_subbar={tw``}
                        icon={<FontAwesomeIcon icon={solid("qrcode")}
                            tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            notify_success("跳转到「在线生成QR码」", "A_4");
                        }}
                    >

                    </AppleCard>
                    {components}
                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom>
                <P color={"rgba(0,0,0,0.7)"}>Made with&nbsp;
                    <FontAwesomeIcon icon={solid("heart")} color={"red"}/>
                    &nbsp;by QiuYeDx</P>
            </WrapperBottom>
        </Wrapper>
    );
}