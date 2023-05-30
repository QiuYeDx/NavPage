import React from 'react';
import {
    WrapperMiddle , WrapperLeft,
    WrapperRight, WrapperTop,
    WrapperMain
} from './Styled.twin';
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import MainCard from "@/components/MainCard/MainCard";
import 'twin.macro';
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import AppleCard from "@/components/AppleCard/AppleCard";
import {notify_error, notify_success} from "@/hooks/toasts";
import {useClipboard} from "use-clipboard-copy";

export default function Home(){
    const clipboard = useClipboard();
    const componentCount = 9;
    const components = [];
    for (let i = 0; i < componentCount; i++) {
        components.push(<AppleCard
            key={i}
            theme={'gradient_blue'}
            h={"360px"}
            k={0.5}
            tw_card={tw`md:col-span-2`}
            tw_content={tw`tracking-wide text-7xl`}
            icon={<FontAwesomeIcon icon={solid("share-nodes")}
                                   tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
            />}
            onClick={() => {
                clipboard.copy("https://qiuyedx.github.io/NavPage");
                notify_success("秋夜导航站地址Copied !", "copy_1");
            }}
        >
            Share {i + 1}
        </AppleCard>);
    }
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
                            主 页
                        </div>
                    </MainCard>

                    {/*<MainCard _tw={tw`bg-white md:col-span-3 col-span-5 m-4`} h={"360px"} >*/}

                    {/*</MainCard>*/}

                    {/*<MainCard _tw={tw`bg-white md:col-span-2 col-span-5 m-4`} h={"360px"}>*/}
                    {/*</MainCard>*/}
                    {components}

                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}