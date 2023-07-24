import React, {useEffect, useState} from 'react';
import {WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight} from "@/layout/MainWrapper";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import "twin.macro";
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {faBilibili, faTiktok} from '@fortawesome/free-brands-svg-icons'
import {notify_error} from "@/hooks/toasts";
import AppleCard from "@/components/AppleCard/AppleCard";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import QRPage from './QRPage/QRPage';
import Error from "@/views/Error/Error";
import BilibiliPage from "@/views/Tools/BilibiliPage/BilibiliPage";
import TiktokPage from "@/views/Tools/TiktokPage/TiktokPage";
import SeleniumPage from "@/views/Tools/SeleniumPage/SeleniumPage";
import {log_api_config} from "@/GlobalConfig";

export default function Tools() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [counts, setCounts] = useState([]);
    const [biilibiliCount, setBilibiliCount] = useState(0);
    const [tiktokCount, setTiktokCount] = useState(0);
    const [qrcodeCount, setQrcodeCount] = useState(0);
    const [seleniumCount, setSeleniumCount] = useState(0);

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
                // tw_card={tw`md:col-span-4`}
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

    const fetchData = async () => {
        const list = ['bilibili', 'tiktok', 'qrcode', 'selenium'];
        try {
            const res_arr = await Promise.all(list.map(v => log_api_config.awaitCountAPI('GET', v)));
            setCounts(res_arr.map(res => res.data && res.data[0] && res.data[0].count));
            return 'Succeed to fetch counts';
        } catch (err) {
            if(process.env.NODE_ENV === 'development')
                console.log(err);
            return 'Failed to fetch counts';
        }
    };

    useEffect(() => {
        fetchData().then(r => console.log(r)).catch(e => console.log(e));
    }, []);

    const Overview = (
        <WrapperMain>
            <AppleCard
                theme={'pink'}
                k={0.5}
                topTextA={"在线工具"}
                topTextB={"bilibili视频解析"}
                subTextA={(counts[0] && `已使用${counts[0]}次`) || "封面 | 视频 下载"}
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
                subTextA={(counts[1] && `已使用${counts[1]}次`) || "封面 | 视频 下载"}
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
                subTextA={(counts[2] && `已使用${counts[2]}次`) || "QR码"}
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

            <AppleCard
                theme={'purple'}
                k={0.5}
                topTextA={"在线工具"}
                topTextB={"Selenium"}
                subTextA={(counts[3] && `已使用${counts[3]}次`) || "自动化测试"}
                tw_card={tw`md:col-span-2`}
                tw_content={tw`tracking-wide`}
                tw_background={tw``}
                tw_subbar={tw``}
                icon={<FontAwesomeIcon icon={solid("code-compare")}
                                       tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                />}
                onClick={() => {
                    navigate("/tools/Selenium");
                    window.scroll(0, 0);
                }}
            >
            </AppleCard>
            {components}
        </WrapperMain>
    );

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
                {location.pathname === '/tools' ? Overview : ToolView(params.toolId)}
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}