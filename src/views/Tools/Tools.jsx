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
import {log_api_config} from "@/GlobalConfig";
import SwitchFadeTransition from "@/styles/transition/SwitchFadeTransition";

export default function Tools() {
    const navigate = useNavigate();
    const location = useLocation();
    const [counts, setCounts] = useState([]);
    const [canShowSubTextA, setCanShowSubTextA] = useState(false); // 是否显示工具的使用次数
    const DELAY = 4000; // 间隔多久改变canShowSubTextA
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
            throw 'Failed to fetch counts'; // 这里不知道为什么如果抛出Error类就会显示奇怪的东西
        }
    };

    useEffect(() => {
        fetchData().then(r => console.log(r)).catch(e => console.warn(e));

        const interval = setInterval(() => {
            if(!(location.pathname === '/tools/bilibili')){
                setCanShowSubTextA(prevState => !prevState);
            }
        }, DELAY);

        return () => clearInterval(interval); // 清除定时器
    }, []);

    const Overview = (
        <WrapperMain>
            <AppleCard
                theme={'pink'}
                k={0.5}
                topTextA={"在线工具"}
                topTextB={"bilibili视频解析"}
                subTextA={<SwitchFadeTransition
                    isOn={counts[0] && canShowSubTextA}
                    onContent={counts[0] && `已使用${counts[0]}次`}
                    offContent={"封面 | 视频 下载"}
                    fadeStyle={'up'}
                    className={'fadeBiliSubTextA'}
                />}
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
                subTextA={<SwitchFadeTransition
                    isOn={counts[1] && canShowSubTextA}
                    onContent={counts[1] && `已使用${counts[1]}次`}
                    offContent={"封面 | 视频 下载"}
                    fadeStyle={'up'}
                    className={'fadeBiliSubTextA'}
                />}
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
                subTextA={<SwitchFadeTransition
                    isOn={counts[2] && canShowSubTextA}
                    onContent={counts[2] && `已使用${counts[2]}次`}
                    offContent={"QR码"}
                    fadeStyle={'up'}
                    className={'fadeBiliSubTextA'}
                />}
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
                subTextA={<SwitchFadeTransition
                    isOn={counts[3] && canShowSubTextA}
                    onContent={counts[3] && `已使用${counts[3]}次`}
                    offContent={"自动化测试"}
                    fadeStyle={'up'}
                    className={'fadeBiliSubTextA'}
                />}
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

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                {Overview}
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}