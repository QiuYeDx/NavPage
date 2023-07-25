import React from 'react';
import {
    WrapperMiddle, WrapperLeft,
    WrapperRight, WrapperMain
} from "@/layout/MainWrapper";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import 'twin.macro';
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import AppleCard from "@/components/AppleCard/AppleCard";
import {notify_error, notify_success} from "@/hooks/toasts";
import {useClipboard} from "use-clipboard-copy";
import {H1, P} from "@/styles/TextStyles";
import {ErrorWrapper} from "@/views/Error/Styled.twin";

export default function Home() {
    const clipboard = useClipboard();
    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain>
                    <ErrorWrapper tw={'col-span-4 h-80 flex flex-col gap-4 pt-8 mt-4 mx-4 md:mx-16 px-0'}>
                        <FontAwesomeIcon icon={solid("truck-ramp-box")} fade size="10x" color={"rgb(255,242,241)"}/>
                        <H1 color={"rgb(255,242,241)"}>主页建设中</H1>
                        <P tw={'text-lg'} color={"rgb(255,242,241)"}>晚些时候再来吧 <FontAwesomeIcon
                            icon={solid("face-sad-tear")}/></P>
                    </ErrorWrapper>

                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}