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
import React, {useEffect, useState} from "react";
import {log_api_config} from "@/GlobalConfig";
import axios from "axios";
import Table from "@/components/Table/Table";
import {formatDate} from "@/utils/utils";

export default function Dashboard() {
    const clipboard = useClipboard();
    const [visitData, setVisitData] = useState(null);

    const updateVisitData = () => {
        axios.get(log_api_config.url.url_counts, {
            params: {
                domain: log_api_config.domain,
            }
        }).then((res) => {
            if(process.env.NODE_ENV === 'development')
                console.log(res);
            setVisitData(res.data);
        }).catch((e) => {
            console.log(e);
        })
    };

    useEffect(() => {
        updateVisitData();
    }, []);

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
                            updateVisitData();
                            notify_success("已更新当前访问量 !", "update_visit_count_1");
                        }}
                    >
                        {visitData ? visitData[0].sum_count : '0'}
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