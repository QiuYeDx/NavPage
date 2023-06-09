import React from 'react';
import {WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight, WrapperTop} from "@/views/PageA/Styled.twin";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import "twin.macro";
import tw from "twin.macro";
import MainCard from "@/components/MainCard/MainCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {faBilibili, faTiktok} from '@fortawesome/free-brands-svg-icons'
import {notify_error, notify_success} from "@/hooks/toasts";
import AppleCard from "@/components/AppleCard/AppleCard";
import {useClipboard} from "use-clipboard-copy";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import QRPage from './QRPage/QRPage';
import Error from "@/views/Error/Error";
import BilibiliPage from "@/views/PageA/BilibiliPage/BilibiliPage";
import TiktokPage from "@/views/PageA/TiktokPage/TiktokPage";

export default function PageA() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const componentCount = 1;
    const components = [];
    for (let i = 0; i < componentCount; i++) {
        components.push(
            <AppleCard
                key={i}
                k={0.5}
                topTextA={"在线工具"}
                topTextB={"预设调色板"}
                subTextA={"常用色彩"}
                tw_card={tw`md:col-span-4`}
                tw_content={tw`tracking-wider`}
                tw_background={tw``}
                tw_subbar={tw``}
                icon={<FontAwesomeIcon icon={solid("palette")}
                                       tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                />}
                onClick={() => {
                    notify_error("暂未完工", "A_5");
                }}
            />
        );
    }

    const Overview = (
        <WrapperMain>
            <MainCard _tw={tw`bg-blue-400 md:hidden col-span-5 m-4 mb-10 border-8 border-blue-200 border-opacity-50`}
                      h={"80px"}>
                <div tw={"w-full pl-12 pr-12 text-2xl text-white font-bold font-sans mt-4"}>
                    工 具
                </div>
            </MainCard>
            <AppleCard
                theme={'pink'}
                k={0.5}
                topTextA={"在线工具"}
                topTextB={"bilibili视频解析"}
                subTextA={"封面 | 视频 下载"}
                tw_card={tw`md:col-span-4`}
                tw_content={tw`tracking-wide`}
                tw_background={tw``}
                tw_subbar={tw``}
                icon={<FontAwesomeIcon icon={faBilibili}
                                       tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                />}
                onClick={() => {
                    navigate("/tools/bilibili");
                    window.scroll(0, 0);
                }}
            >
            </AppleCard>

            <AppleCard
                theme={'black'}
                k={0.5}
                topTextA={"在线工具"}
                topTextB={"Tiktok视频解析"}
                subTextA={"封面 | 视频 下载"}
                hasMask
                tw_card={tw`md:col-span-2`}
                tw_content={tw`tracking-wide`}
                tw_background={tw``}
                tw_subbar={tw``}
                icon={<FontAwesomeIcon icon={faTiktok}
                                       tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                />}
                onClick={() => {
                    navigate("/tools/tiktok");
                    window.scroll(0, 0);
                }}
            >
            </AppleCard>

            <AppleCard
                theme={'white'}
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
                    navigate("/tools/QRPage");
                    window.scroll(0, 0);
                }}
            >
            </AppleCard>
            {components}
        </WrapperMain>
    );

    const ToolView = (toolId) => {
        const toolIds = {
            'QRPage': <QRPage/>,
            'bilibili': <BilibiliPage/>,
            'tiktok': <TiktokPage/>
        }
        if (!toolIds[toolId])
            notify_error("未找到该工具！", "error_notFindToolPage");
        return (
            <WrapperMain>
                {toolIds[toolId] ? toolIds[toolId] : <Error/>}
            </WrapperMain>
        );
    };

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                {location.pathname === '/tools' ? Overview : ToolView(params.toolId)}
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}