import React from 'react';
import {WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight} from "@/layout/MainWrapper";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import "twin.macro";
import tw from "twin.macro";
import {notify_error} from "@/hooks/toasts";
import {useLocation, useParams} from "react-router-dom";
import QRPage from './QRPage/QRPage';
import Error from "@/views/Error/Error";
import BilibiliPage from "@/views/Tools/BilibiliPage/BilibiliPage";
import TiktokPage from "@/views/Tools/TiktokPage/TiktokPage";
import SeleniumPage from "@/views/Tools/SeleniumPage/SeleniumPage";

export default function ToolView() {
    const location = useLocation();
    const params = useParams();

    const toolIds = {
        'QRPage': <QRPage/>,
        'bilibili': <BilibiliPage/>,
        'tiktok': <TiktokPage/>,
        'Selenium': <SeleniumPage/>
    }
    const ToolView = (toolId) => {
        if (!toolIds[toolId])
            notify_error("未找到该工具！", "error_notFindToolPage");
        return (
            <WrapperMain>
                {toolIds[toolId] ? toolIds[toolId] : <Error/>}
            </WrapperMain>
        );
    };
    const isValid = (toolId) => toolIds[toolId];

    return (
        <Wrapper>
            {isValid(params.toolId) || location.pathname === '/tools' ?
                <WrapperTop>

                </WrapperTop> : ''}
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                {ToolView(params.toolId)}
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}