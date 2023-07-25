import {useClipboard} from "use-clipboard-copy";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import {WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight} from "@/layout/MainWrapper";
import AppleCard from "@/components/AppleCard/AppleCard";
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {notify_success} from "@/hooks/toasts";
import {faApple, faGithub, faQq, faTwitter, faWordpress} from "@fortawesome/free-brands-svg-icons";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import React, {useEffect, useRef, useState} from "react";
import {log_api_config} from "@/GlobalConfig";
import axios from "axios";
import Table from "@/components/Table/Table";
import {formatDate} from "@/utils/utils";
import gsap from "gsap";

export default function Dashboard() {
    const clipboard = useClipboard();
    const ref = useRef(null);
    const renderedVisitData = useRef(0);
    const [visitData, setVisitData] = useState(null);
    const [prevVisitData, setPrevVisitData] = useState(null); // 新增一个状态用于保存前一个visitData的值


    const updateVisitData = () => {
        console.log('update!');
        axios.get(log_api_config.url.url_counts, {
            params: {
                domain: log_api_config.domain,
            }
        }).then((res) => {
            if(process.env.NODE_ENV === 'development')
                console.log(res);
            if (visitData) {
                setPrevVisitData(visitData); // 保存前一个visitData的值
            }
            setVisitData(res.data);
        }).catch((e) => {
            console.log(e);
        })
    };

    const renderVisitData = () => {
        console.log('render!', prevVisitData, visitData);
        if (!visitData) return null;
        // 使用GSAP的fromTo方法来实现从旧值到新值的过渡效果
        if (prevVisitData) {
            console.log('gsap!', prevVisitData, visitData);
            gsap.fromTo(
                ref.current, // 您需要在组件中创建一个ref来保存展示数据的DOM元素
                { textContent: prevVisitData[0].sum_count}, // 从前一个visitData的值开始
                { textContent: visitData[0].sum_count, duration: 2.5, snap: {textContent: 1}, ease: 'power2.out' } // 到达新的visitData的值，持续1秒
            );
        } else {
            console.log('else!', prevVisitData, visitData);
            setPrevVisitData(JSON.parse(JSON.stringify(visitData)).map((obj) => {
                obj.sum_count = 0;
                return obj;
            }));
        }
        console.log('ref: ', ref);
    }

    useEffect(() => {
        console.log('effect! []', prevVisitData, visitData);
        updateVisitData();
    }, []);

    useEffect(() => {
        console.log('effect! [visitData]', prevVisitData, visitData);
        renderVisitData();
    }, [visitData, prevVisitData]);

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain tw={'grid-cols-5'}>
                    <AppleCard
                        theme={'defaults'}
                        h={"360px"}
                        k={0.5}
                        topTextA={"统计"}
                        topTextB={"当前访问量"}
                        subTextA={"全站访问次数"}
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-wide`}
                        icon={<FontAwesomeIcon icon={solid("eye")}
                                               tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            renderVisitData();
                            notify_success("已更新当前访问量 !", "update_visit_count_1");
                        }}
                    >
                        {/*{visitData ? visitData[0].sum_count : <FontAwesomeIcon icon={solid("spinner")} spin /> }*/}
                        {/*{renderedVisitData.current}*/}
                        <span ref={ref}></span>
                    </AppleCard>

                    <div tw={'col-span-5 md:col-span-3 m-4'}>
                        <Table h={'360px'} headers={['URL', 'Count', 'Last Time']}
                               data={visitData && visitData.map((obj) => {
                                   obj.ltime = formatDate(obj.ltime)
                                   return obj;
                               })}
                               keys={['url', 'count', 'ltime']} />
                    </div>
                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}