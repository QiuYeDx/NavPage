import React, {useEffect, useRef, useState} from 'react';
import {WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight} from "@/layout/MainWrapper";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import tw from "twin.macro";
import 'twin.macro';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {P} from "@/styles/TextStyles";
import {notify_error, notify_success} from "@/hooks/toasts";
import AppleCard from "@/components/AppleCard/AppleCard";
import {useClipboard} from "use-clipboard-copy";
import {useNavigate} from "react-router-dom";
import {createNElements} from "@/utils/utils";
import XList from "@/modules/XList/XList";

export default function Resources() {
    const clipboard = useClipboard();
    const navigate = useNavigate();
    const componentCount = 8;
    const components = [];
    for (let i = 0; i < componentCount; i++) {
        components.push(<AppleCard
            key={i}
            theme={'gradient_blue'}
            h={"360px"}
            k={0.5}
            tw_card={tw`md:col-span-2`}
            tw_content={tw`tracking-wide text-7xl`}
            icon={<FontAwesomeIcon icon={solid("cubes")}
                                   tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
            />}
            onClick={() => {
                clipboard.copy("https://nav.qiuyedx.com");
                notify_success("秋夜导航站地址Copied !", "copy_1");
            }}
        >
            资源 {i + 1}
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

                    <AppleCard
                        key={'CompDisplay'}
                        theme={'gradient_blue'}
                        h={"360px"}
                        k={0.5}
                        tw_card={tw`col-span-4`}
                        tw_content={tw`tracking-wide text-7xl`}
                        icon={<FontAwesomeIcon icon={solid("cubes")}
                                               tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            navigate("/resources/CompDisplay");
                            window.scroll(0, 0);
                        }}
                    >
                        组件展示
                    </AppleCard>

                    <div tw={'col-span-4 h-4'}>

                    </div>
                    <XList gsapClass={'new_res'} offset={240} btnText={'获取'}/>

                    <div tw={'col-span-4 h-4'}>

                    </div>
                    <XList title={'热门资源'} gsapClass={'hot_res'} offset={240} btnText={'获取'}/>

                    {/*{components}*/}
                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}