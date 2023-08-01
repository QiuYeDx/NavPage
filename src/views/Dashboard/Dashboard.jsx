import {useClipboard} from "use-clipboard-copy";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import {WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight} from "@/layout/MainWrapper";
import AppleCard from "@/components/AppleCard/AppleCard";
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {notify_error, notify_success} from "@/hooks/toasts";
import {faApple, faBilibili, faGithub, faQq, faTwitter, faWordpress} from "@fortawesome/free-brands-svg-icons";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import React, {useEffect, useRef, useState} from "react";
import {log_api_config} from "@/GlobalConfig";
import axios from "axios";
import Table from "@/components/Table/Table";
import {formatDate} from "@/utils/utils";
import NumberAnimation from "@/styles/NumberAnimation";
import {ContentWrapper, LineWrapper} from "@/views/Dashboard/Styled.twin";
import {InLineTitle} from "@/styles/TextStyles";
import TextInput from "@/components/TextInputLine/TextInput";
import SelectInput from "@/components/TextInputLine/SelectInput";
import {MButton} from "@/components/Button/Styled.twin";
import Picture from "@/components/PictureDisplay/Pictrue";

export default function Dashboard() {
    const [visitData, setVisitData] = useState(null);
    const [logData, setLogData] = useState(null);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [text, setText] = useState('');   //  每页显示几条日志
    const [text2, setText2] = useState('');    //  显示第几页, [1, 2, ...]
    const [isError, setIsError] = useState(false);   //  text是否加载失败
    const [isError2, setIsError2] = useState(false);    //  text2是否加载失败
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [invalid2, setInvalid2] = useState(false);
    const button_ref = useRef(null);

    const updateLogData = async (
        n_per_page = parseInt(text, 10) ? parseInt(text, 10) : 30,
        p_index = parseInt(text2, 10) ? parseInt(text2, 10) : 1
    ) => {
        try {
            const res = await log_api_config.awaitLogsAPI('GET', n_per_page, p_index);
            setLogData(res.data);
            return 'Succeed to updateLogData';
        } catch (e) {
            // if (process.env.NODE_ENV === 'development')
            //     console.error(e);
            setIsError2(true);
            throw new Error('Failed to updateLogData');
        }
    };

    const updateVisitData = async () => {
        try {
            const res = await log_api_config.awaitUrlCountAPI('GET');
            setVisitData(res.data);
            return 'Succeed to updateVisitData';
        } catch (e) {
            // if (process.env.NODE_ENV === 'development')
            //     console.error(e);
            setIsError(true);
            throw new Error('Failed to updateVisitData');
        }
    };

    const handleChange = (event) => {
        setText(event.target.value);
        setInvalid(false);
    };

    const handleChange2 = (event) => {
        setText2(event.target.value);
        setInvalid2(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            button_ref.current.click();
            button_ref.current.focus();
        }
    }

    const handleSubmit = () => {
        updateLogData().then(r => {
            setFlag2(!flag2);
            notify_success("日志查询成功 !", "search_log_1");
        }).catch(e => console.error(e));

    }

    useEffect(() => {
        updateVisitData().then(r => console.log(r)).catch(e => console.warn(e));
        updateLogData().then(r => console.log(r)).catch(e => console.warn(e));
    }, []);

    useEffect(() => {
        setText2('');
    }, [text]);

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
                            updateVisitData().then(r => notify_success("已更新当前访问量 !", "update_visit_count_1")).catch(e => notify_error("更新当前访问量失败 !", "error_update_visit_count_1"));
                            setFlag(!flag);
                        }}
                    >
                        {visitData ? <NumberAnimation freshFlag={flag} fromValue={0} toValue={visitData[0].sum_count}
                                                      duration={2} step={1}/> :
                            isError ? <FontAwesomeIcon icon={solid("exclamation")} shake/> :
                                <FontAwesomeIcon icon={solid("spinner")} spin/>
                        }
                    </AppleCard>

                    <div tw={'col-span-5 md:col-span-3 m-4'}>
                        <Table h={'360px'} headers={['URL', 'Count', 'Last Time']}
                               data={visitData && visitData.map((obj) => {
                                   obj.ltime = formatDate(obj.ltime)
                                   return obj;
                               })}
                               keys={['url', 'count', 'ltime']}
                               isError={isError}
                        />
                    </div>

                    <AppleCard
                        theme={'defaults'}
                        h={"360px"}
                        k={0.5}
                        topTextA={"统计"}
                        topTextB={"日志总数量"}
                        subTextA={"后台API日志"}
                        tw_card={tw`md:col-span-2`}
                        tw_content={tw`tracking-wide`}
                        icon={<FontAwesomeIcon icon={solid("feather-pointed")}
                                               tw={"w-48 h-48 scale-110 group-active:scale-95 md:group-hover:scale-95 duration-500 ease-out"}
                        />}
                        onClick={() => {
                            updateLogData().then(r => notify_success("已更新日志总数量 !", "update_log_count_1")).catch(e => notify_error("更新日志总数量失败 !", "error_update_log_count_1"));
                            setFlag2(!flag2);
                        }}
                    >
                        {logData && logData[0] ? <NumberAnimation freshFlag={flag2} fromValue={0} toValue={logData[0].total_count} duration={2} step={1}/> :
                            isError2 ? <FontAwesomeIcon icon={solid("exclamation")} shake/> :
                                <FontAwesomeIcon icon={solid("spinner")} spin/>}
                    </AppleCard>

                    <ContentWrapper tw={'col-span-5 md:col-span-3 m-4 relative'}>
                        <LineWrapper>
                            <InLineTitle>
                                查询<FontAwesomeIcon icon={solid("layer-group")} tw={"text-blue-400 pl-1 pr-1 duration-500 ease-out"}/>日志
                            </InLineTitle>
                        </LineWrapper>

                        <LineWrapper>
                            <SelectInput
                                icon={<FontAwesomeIcon icon={solid("delete-left")} />}
                                placeholder={' '}
                                desc={'选择每页显示几条日志, 默认30'}
                                id={'input_text'}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                invalid={invalid}
                                text={text}
                                setText={setText}
                                iconOnClick={() => {
                                    setText && setText('30')
                                }}
                                selectList={['10', '20', '30', '50', '100', '150', '200']}
                                closeClassName={'closeClassName'}
                                animate={'tr.3'}
                            />
                        </LineWrapper>

                        <LineWrapper>
                            <SelectInput
                                icon={<FontAwesomeIcon icon={solid("delete-left")} />}
                                placeholder={' '}
                                desc={'选择显示第几页, 默认1'}
                                id={'input_text2'}
                                onChange={handleChange2}
                                onKeyPress={handleKeyPress}
                                invalid={invalid2}
                                text={text2}
                                setText={setText2}
                                iconOnClick={() => {
                                    setText2 && setText2('1')
                                }}
                                selectList={logData && logData[0] ?
                                    Array.from({ length: logData && logData[0] ? (parseInt(text, 10) ? Math.ceil(logData[0].total_count / parseInt(text, 10)) : Math.ceil(logData[0].total_count / 30)) : 1}, (_, index) => index + 1)
                                    : ['1']}
                                closeClassName={'closeClassName'}
                                animate={'tr.3'}
                            />
                        </LineWrapper>

                        <LineWrapper tw={'mt-2'}>
                            <MButton disabled={loading} h={'36px'} w={'140px'} tw={'rounded-full'}
                                     onClick={handleSubmit} ref={button_ref}>
                                {
                                    loading ?
                                        <>查询中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                        :
                                        <>查询日志<FontAwesomeIcon icon={solid("magnifying-glass")} fade tw={'ml-1'}/></>
                                }
                            </MButton>
                        </LineWrapper>
                    </ContentWrapper>

                    <div tw={'col-span-5 md:col-span-5 m-4'}>
                        {/* 暂时先不显示IP */}
                        <Table h={'360px'} headers={['ID', 'Time', 'API', 'Method', 'Log']}
                               data={logData && logData.map((obj) => {
                                   obj.time = formatDate(obj.time)
                                   return obj;
                               })}
                               keys={['id', 'time', 'api', 'method', 'log']}
                               isError={isError2}
                        />
                    </div>
                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}