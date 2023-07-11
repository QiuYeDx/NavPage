import React, {useEffect, useRef, useState} from 'react';
import {
    ButtonWrapper,
    HeaderWrapper,
    ContentWrapper,
    Wrapper,
    LineWrapper
} from "@/views/PageA/SeleniumPage/Styled.twin";
import {notify_error, notify_success} from "@/hooks/toasts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "twin.macro";
import {useBeforeUnload, useNavigate} from "react-router-dom";
import {H2, InLineTitle} from "@/styles/TextStyles";
import {Gap} from "@/components/Gap/Styled.twin";
import {BackButton, MButton} from "@/components/Button/Styled.twin";
import {PictureDisplay} from "@/components/PictureDisplay/Styled.twin";
import axios from 'axios';
import {app_config} from "@/styles/GlobalConfig";
import TextInput from "@/components/TextInputLine/TextInput";
import Table from "@/components/Table/Table";
import {Tooltip} from "react-tooltip";
import SelectInput from "@/components/TextInputLine/SelectInput";
import {exportToExcel} from "@/components/Table/ExportToExcel";
import {getFormattedDate} from "@/utils/utils";
import {useClipboard} from "use-clipboard-copy";

export default function SeleniumPage() {
    const clipboard = useClipboard();
    const navigate = useNavigate();
    const button_ref = useRef(null);
    const button2_ref = useRef(null);
    const button3_ref = useRef(null);
    const button4_ref = useRef(null);
    const scroll_ref = useRef(null);
    const [apiUrl, setApiUrl] = useState('');   // 有效服务端根地址
    const [text, setText] = useState('');   // 服务端根地址
    const [text2, setText2] = useState(''); // selenium指令
    const [text3, setText3] = useState(''); // xPath元素定位路径
    const [text4, setText4] = useState(''); // 可选参数
    const [text5, setText5] = useState(''); // 指令类型
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);
    const [loading5, setLoading5] = useState(false);
    const [loading6, setLoading6] = useState(false);
    const [finished, setFinished] = useState(false);
    const [finished2, setFinished2] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [invalid2, setInvalid2] = useState(false);
    const [invalid3, setInvalid3] = useState(false);
    const [invalid4, setInvalid4] = useState(false);
    const [invalid5, setInvalid5] = useState(false);
    const [data, setData] = useState(null);
    const [log, setLog] = useState(null);
    const headers_arr = ['ID', 'Time', 'InsID', 'Type', 'State', 'E-log'];

    const handleChange = (event) => {
        setText(event.target.value);
        setInvalid(false);
    };

    const handleChange2 = (event) => {
        setText2(event.target.value);
        setInvalid2(false);
    };

    const handleChange3 = (event) => {
        setText3(event.target.value);
        setInvalid3(false);
    };

    const handleChange4 = (event) => {
        setText4(event.target.value);
        setInvalid4(false);
    };

    const handleChange5 = (event) => {
        setText5(event.target.value);
        setInvalid5(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            button4_ref.current.click();    // 查询状态
            button4_ref.current.focus();
        }
    }

    const handleKeyPress2 = (event) => {
        if (event.key === 'Enter') {
            button2_ref.current.click();
            button2_ref.current.focus();
        }
    }

    const handleKeyPress3 = (event) => {
        if (event.key === 'Enter') {
            button3_ref.current.click();
            button3_ref.current.focus();
        }
    }

    const handleSubmit = (event) => {
        let valid_url = null;
        if (!text) {
            setInvalid(true);
            notify_error('请输入服务端根地址 !', 'init_error');
            return;
        } else {
            valid_url = text.match(/https?:\/\/[^\s/$.?#]*[^\s/$.$].[^\s]*/gi);
            if (!valid_url) {
                setInvalid(true);
                notify_error('请输入有效的URL !', 'init_error_2');
                return;
            }
        }

        let new_url = text;
        if (new_url[new_url.length - 1] === '/')
            new_url.slice(0, -1);
        setApiUrl(new_url);
        setLoading(true);

        const url = new_url + '/initialTable';
        const params = {};

        axios.post(url, {params})
            .then(response => {
                if (response.data.code === '0') {
                    notify_error('服务器内部错误，请练习管理员 !', 'insert_backend_error');
                    return;
                }
                notify_success('数据库初始化成功 !', 'init_success');
                queryInstruction();
                queryLog();
            })
            .catch(error => {
                console.error('Error: ', error);
                notify_error('数据库初始化失败，请重试 !', 'init_error')
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit2 = (event) => {
        if (!text2) {
            setInvalid2(true);
            notify_error('请输入测试语句 !', 'insert_input_error');
            return;
        }

        setLoading2(true);

        const url = apiUrl + '/insertInstruction';

        axios.post(url, text2)
            .then(response => {
                if (response.data.code === '0') {
                    notify_error('服务器内部错误，请练习管理员 !', 'insert_backend_error');
                    return;
                }
                notify_success('插入测试语句成功 !', 'insert_success');
                queryInstruction();
            })
            .catch(error => {
                console.error('Error generating QR code:', error);
                notify_error('插入测试语句失败，请重试 !', 'insert_error')
            })
            .finally(() => {
                setLoading2(false);
            });
    };

    const handleSubmit3 = (event) => {
        if (!text5) {
            setInvalid5(true);
            notify_error('请选择指令类型 !', 'insert_input4_error');
            return;
        } else if (!text3) {
            setInvalid3(true);
            notify_error('请输入xPath元素定位路径 !', 'insert_input3_error');
            return;
        }

        setLoading4(true);

        const url = apiUrl + '/insertInstruction';
        const param = `${text5} ${text3} ${text4}`.trim();   // text5 text3 text4
        axios.post(url, param)
            .then(response => {
                if (response.data.code === '0') {
                    notify_error('服务器内部错误，请练习管理员 !', 'insert2_backend_error');
                    return;
                }
                notify_success('插入指令成功 !', 'insert2_success');
                queryInstruction();
            })
            .catch(error => {
                console.error('Error:', error);
                notify_error('插入指令失败，请重试 !', 'insert2_error');
                setInvalid5(true);
                setInvalid3(true);
            })
            .finally(() => {
                setLoading4(false);
            });
    };

    const handleQuery = () => {
        let valid_url = null;
        if (!text) {
            setInvalid(true);
            notify_error('请输入服务端根地址 !', 'init_error');
            return;
        } else {
            valid_url = text.match(/https?:\/\/[^\s/$.?#]*[^\s/$.$].[^\s]*/gi);
            if (!valid_url) {
                setInvalid(true);
                notify_error('请输入有效的URL !', 'init_error_2');
                return;
            }
        }

        let new_url = text;
        if (new_url[new_url.length - 1] === '/')
            new_url = new_url.slice(0, -1);
        setApiUrl(new_url);

        setLoading5(true);

        const url = new_url + '/queryInstruction';
        const param = {};
        axios.get(url, param)
            .then(res => {
                if (res.data.code === '0') {
                    notify_error('数据库内部错误，请练习管理员 !', 'query_backend_error');
                    return;
                }
                if (res.data.code === '1') {
                    setData([]);
                    notify_error('数据库为空，请先插入语句 !', 'query_empty');
                    setFinished(true);
                    return;
                }
                setData(res.data.data);
                setFinished(true);
                notify_success('查询指令序列成功 !', 'query_success');
            })
            .catch(error => {
                console.error('Error: ', error);
                setInvalid(true);
                notify_error('查询指令序列失败，请重试 !', 'query_error')
            })
            .finally(() => {
                setLoading5(false);
            })

        const url2 = new_url + '/queryLog';
        const param2 = {};
        axios.get(url2, param2)
            .then(res => {
                if (res.data.code === '0') {
                    notify_error('数据库内部错误，请练习管理员 !', 'query2_backend_error');
                    return;
                }
                if (res.data.code === '1') {
                    setLog([]);
                    notify_error('日志为空，请先执行测试 !', 'query2_empty');
                    setFinished2(true);
                    return;
                }
                setLog(res.data.data);
                setFinished2(true);
                notify_success('查询日志成功 !', 'query2_success');
            })
            .catch(error => {
                console.error('Error: ', error);
                notify_error('查询日志失败，请重试 !', 'query2_error')
            })
    }

    const queryInstruction = () => {
        if (apiUrl === '')
            return 'Error: No apiUrl !';
        const url = apiUrl + '/queryInstruction';
        const param = {};
        axios.get(url, param)
            .then(res => {
                if (res.data.code === '0') {
                    notify_error('数据库内部错误，请练习管理员 !', 'query_backend_error');
                    return;
                }
                if (res.data.code === '1') {
                    setData([]);
                    notify_error('数据库为空，请先插入语句 !', 'query_empty');
                    setFinished(true);
                    return;
                }
                setData(res.data.data);
                setFinished(true);
                notify_success('查询指令序列成功 !', 'query_success');
            })
            .catch(error => {
                console.error('Error: ', error);
                notify_error('查询指令序列失败，请重试 !', 'query_error')
            })
    }

    const queryLog = () => {
        if (apiUrl === '')
            return 'Error: No apiUrl !';
        const url = apiUrl + '/queryLog';
        const param = {};
        axios.get(url, param)
            .then(res => {
                if (res.data.code === '0') {
                    notify_error('数据库内部错误，请练习管理员 !', 'query2_backend_error');
                    return;
                }
                if (res.data.code === '1') {
                    setLog([]);
                    notify_error('日志为空，请先执行测试 !', 'query2_empty');
                    setFinished2(true);
                    return;
                }
                setLog(res.data.data);
                setFinished2(true);
                notify_success('查询日志成功 !', 'query2_success');
            })
            .catch(error => {
                console.error('Error: ', error);
                notify_error('查询日志失败，请重试 !', 'query2_error')
            })
    }

    const handleStartTest = () => {
        setLoading3(true);
        axios.post(apiUrl + '/executeTest', {}).then(res => {
            if (res.data.code === '0') {
                notify_error('数据库内部错误，请练习管理员 !', 'query_backend_error');
                return;
            }
            notify_success('测试完毕 !', 'test_success');
            queryLog();
            setTimeout(() => {
                scroll_ref.current.scrollIntoView({behavior: 'smooth'});
            }, 100);
        })
            .finally(() => {
                setLoading3(false);
            })
    }

    const handleExportToExcel = () => {
        let ans = log.reduce((result, sub_arr, index) => {
            result[index] = headers_arr.reduce((res, key, i) => {
                res[key] = sub_arr[i];
                return res;
            }, {});
            return result;
        }, []);
        exportToExcel(ans, 'log_' + getFormattedDate());
        notify_success('导出成功 !', 'export_success');
    }

    const handleCopyInstructions = () => {
        console.log(data);
        let ans = data.reduce((result, arr, i) => {
            if(i > 0)
                result += '# ';
            result += arr.reduce((res, value, index) => {
                if(index > 0 && value && value !== ''){
                    if(index > 1)
                        res += ' ';
                    res += value;
                }
                return res;
            }, "");
            return result;
        }, "");
        clipboard.copy(ans);
        notify_success('指令序列Copied !', 'copy_success');
    }

    useBeforeUnload(() => {
        // 离开页面前保存状态
        if (!finished)
            return;
        sessionStorage.setItem('selenium_states', (JSON.stringify({
            text,
            text2,
            text3,
            text4,
            text5,
            data,
            log,
            apiUrl,
            loading,
            loading2,
            loading3,
            loading4,
            loading5,
            loading6,
            finished,
            finished2,
            invalid,
            invalid2,
            invalid3,
            invalid4,
            invalid5,
        })));
    });

    useEffect(() => {
        // return () => { // 总是每次更新状态后保存上一个状态的值，而不是保存最新的状态
        // 保存状态
        if (data === null)
            return;
        if (!finished)
            return;
        sessionStorage.setItem('selenium_states', (JSON.stringify({
            text,
            text2,
            text3,
            text4,
            text5,
            data,
            log,
            apiUrl,
            loading,
            loading2,
            loading3,
            loading4,
            loading5,
            loading6,
            finished,
            finished2,
            invalid,
            invalid2,
            invalid3,
            invalid4,
            invalid5,
        })));
        // };
    }, [text,
        text2,
        text3,
        text4,
        text5,
        data,
        log,
        apiUrl,
        loading,
        loading2,
        loading3,
        loading4,
        loading5,
        loading6,
        finished,
        finished2,
        invalid,
        invalid2,
        invalid3,
        invalid4,
        invalid5]);

    useEffect(() => {
        if (sessionStorage.getItem('selenium_states')) {
            const last_states = JSON.parse((sessionStorage.getItem('selenium_states')));
            setText(last_states.text ? last_states.text : '');
            setText2(last_states.text2 ? last_states.text2 : '');
            setText3(last_states.text3 ? last_states.text3 : '');
            setText4(last_states.text4 ? last_states.text4 : '');
            setText5(last_states.text5 ? last_states.text5 : '');
            setData(last_states.data ? last_states.data : null);
            setLog(last_states.log ? last_states.log : null);
            setApiUrl(last_states.apiUrl ? last_states.apiUrl : null);
            setLoading(last_states.loading);
            setLoading2(last_states.loading2);
            setLoading3(last_states.loading3);
            setLoading4(last_states.loading4);
            setLoading5(last_states.loading5);
            setLoading6(last_states.loading6);
            setFinished(last_states.finished);
            setFinished2(last_states.finished2);
            setInvalid(last_states.invalid);
            setInvalid2(last_states.invalid2);
            setInvalid3(last_states.invalid3);
            setInvalid4(last_states.invalid4);
            setInvalid5(last_states.invalid5);
        }
        queryInstruction();
        queryLog();
    }, []); // 依赖项为空数组，表示仅在组件挂载和卸载时执行一次

    return (
        <div tw={'col-span-4'}>
            <Wrapper>
                <HeaderWrapper>
                    <ButtonWrapper>
                        <BackButton onClick={() => {
                            navigate('/tools');
                            window.scroll(0, 0);
                        }}>
                            <FontAwesomeIcon icon={solid("arrow-left")} tw={'md:pr-4 align-middle relative -top-px'}/>
                        </BackButton>
                    </ButtonWrapper>
                    <H2>Selenium</H2>
                </HeaderWrapper>

                <div tw={'flex flex-row flex-wrap justify-between items-center gap-x-5'}>
                    <ContentWrapper>
                        <LineWrapper>
                            <InLineTitle tw={'mb-2'}>初始化{finished ? (data && data.length > 0 ?
                                    <FontAwesomeIcon icon={solid("database")}
                                                     tw={'text-green-400 pl-1 pr-1 duration-500 ease-out'}/> :
                                    <FontAwesomeIcon icon={solid("database")}
                                                     tw={'text-orange-400 pl-1 pr-1 duration-500 ease-out'}/>) :
                                <FontAwesomeIcon icon={solid("database")}
                                                 tw={'text-red-400 pl-1 pr-1 duration-500 ease-out'}/>}数据库</InLineTitle>
                        </LineWrapper>
                        <LineWrapper>
                            <TextInput
                                icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                                placeholder={' '}
                                desc={'输入服务端根地址'}
                                id={'input_text'}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                invalid={invalid}
                                text={text}
                                setText={setText}
                                iconOnClick={() => {
                                    setText && setText('')
                                }}
                                data_tooltip_id={"url_tooltip"}
                                data_tooltip_content={"e.g. https://api.qiuyedx.com:8085"}
                                data_tooltip_variant={"info"}
                            />
                        </LineWrapper>
                        <Tooltip id="url_tooltip" offset={20} openOnClick={true} place="top"
                                 tw={'bg-blue-400 max-w-xs md:max-w-lg rounded-2xl absolute z-200'} hidden={!!text}/>
                        <LineWrapper tw={'mt-2'}>
                            <MButton disabled={loading} h={'36px'} w={'140px'} tw={'rounded-full'}
                                     onClick={handleSubmit} ref={button_ref}>
                                {
                                    loading ?
                                        <>执行中<FontAwesomeIcon icon={solid("gear")} spin tw={'ml-1'}/></>
                                        :
                                        <>初始化<FontAwesomeIcon icon={solid("gear")} fade tw={'ml-1'}/></>
                                }
                            </MButton>
                            <MButton disabled={loading5} h={'36px'} w={'140px'} tw={'rounded-full'}
                                     onClick={handleQuery} ref={button4_ref}>
                                {
                                    loading5 ?
                                        <>查询中<FontAwesomeIcon icon={solid("magnifying-glass")} bounce tw={'ml-1'}/></>
                                        :
                                        <>查询状态<FontAwesomeIcon icon={solid("magnifying-glass")} fade tw={'ml-1'}/></>
                                }
                            </MButton>
                        </LineWrapper>
                    </ContentWrapper>

                    <ContentWrapper>
                        <LineWrapper>
                            <InLineTitle tw={'mb-2'}>批量插入指令</InLineTitle>
                        </LineWrapper>
                        <LineWrapper>
                            <TextInput
                                icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                                placeholder={' '}
                                desc={'输入selenium指令'}
                                id={'input_text2'}
                                onChange={handleChange2}
                                onKeyPress={handleKeyPress2}
                                invalid={invalid2}
                                text={text2}
                                setText={setText2}
                                iconOnClick={() => {
                                    setText2 && setText2('')
                                }}
                                data_tooltip_id={"input2_tooltip"}
                                data_tooltip_content={"指令间用井号加空格分隔 e.g. jump http://39.99.243.8:8688/# wait /html/body/div/form/div[4]/button# input /html/body/div/form/div[1]/input tea"}
                                data_tooltip_variant={"info"}
                            />
                        </LineWrapper>
                        <Tooltip id="input2_tooltip" offset={20} openOnClick={true} place="top"
                                 tw={'bg-blue-400 max-w-xs md:max-w-lg rounded-2xl absolute z-200'} hidden={!!text}/>
                        <LineWrapper tw={'mt-2'}>
                            <MButton disabled={loading2} h={'36px'} w={'140px'} tw={'rounded-full'}
                                     onClick={handleSubmit2} ref={button2_ref}>
                                {
                                    loading2 ?
                                        <>执行中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                        :
                                        <>插入指令<FontAwesomeIcon icon={solid("circle-plus")} fade tw={'ml-1'}/></>
                                }
                            </MButton>
                        </LineWrapper>
                    </ContentWrapper>

                    <ContentWrapper>
                        <LineWrapper>
                            <InLineTitle tw={'mb-2'}>编写单条指令</InLineTitle>
                        </LineWrapper>

                        <LineWrapper>
                            <SelectInput
                                icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                                placeholder={' '}
                                desc={'选择指令类型'}
                                id={'input_text5'}
                                onChange={handleChange5}
                                onKeyPress={handleKeyPress3}
                                invalid={invalid5}
                                text={text5}
                                setText={setText5}
                                iconOnClick={() => {
                                    setText5 && setText5('')
                                }}
                                selectList={['jump', 'wait', 'click', 'input']}
                                closeClassName={'closeClassName'}
                                _t={'36px'}
                                _l={'72%'}
                            />
                        </LineWrapper>

                        <LineWrapper>
                            <TextInput
                                icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                                placeholder={' '}
                                desc={'输入xPath元素定位路径'}
                                id={'input_text3'}
                                onChange={handleChange3}
                                onKeyPress={handleKeyPress3}
                                invalid={invalid3}
                                text={text3}
                                setText={setText3}
                                iconOnClick={() => {
                                    setText3 && setText3('')
                                }}
                            />
                        </LineWrapper>

                        <LineWrapper>
                            <TextInput
                                icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                                placeholder={' '}
                                desc={'输入参数（可选）'}
                                id={'input_text4'}
                                onChange={handleChange4}
                                onKeyPress={handleKeyPress3}
                                invalid={invalid4}
                                text={text4}
                                setText={setText4}
                                iconOnClick={() => {
                                    setText4 && setText4('')
                                }}
                            />
                        </LineWrapper>

                        <LineWrapper tw={'mt-2'}>
                            <MButton disabled={loading4} h={'36px'} w={'140px'} tw={'rounded-full'}
                                     onClick={handleSubmit3} ref={button3_ref}>
                                {
                                    loading4 ?
                                        <>执行中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                        :
                                        <>插入指令<FontAwesomeIcon icon={solid("circle-plus")} fade tw={'ml-1'}/></>
                                }
                            </MButton>
                        </LineWrapper>
                    </ContentWrapper>
                </div>

                <ContentWrapper tw={'min-h-0 h-32'}>
                    <LineWrapper>
                        <InLineTitle tw={''}>开始测试</InLineTitle>
                    </LineWrapper>
                    <LineWrapper tw={''}>
                        <MButton disabled={loading3} h={'36px'} w={'140px'} tw={'rounded-full'}
                                 onClick={handleStartTest}>
                            {
                                loading3 ?
                                    <>测试中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                    :
                                    <>开始测试<FontAwesomeIcon icon={solid("play")} fade tw={'ml-1'}/></>
                            }
                        </MButton>
                    </LineWrapper>
                </ContentWrapper>

                {finished ?
                    <>
                        <Gap tw={'invisible'}/>
                        <Table title={'指令序列'} data={data || []} headers={['ID', 'Type', 'Element', 'Param']}>

                        </Table>
                        <Gap tw={'invisible'}/>
                        <ContentWrapper tw={'min-h-0 h-32'}>
                            <LineWrapper>
                                <InLineTitle tw={''}>复制指令</InLineTitle>
                            </LineWrapper>
                            <LineWrapper tw={''}>
                                <MButton disabled={data === null || (data && data.length === 0)} h={'36px'} w={'140px'} tw={'rounded-full'}
                                         onClick={handleCopyInstructions}>
                                    复制指令<FontAwesomeIcon icon={solid("copy")} fade tw={'ml-1'}/>
                                </MButton>
                            </LineWrapper>
                        </ContentWrapper>
                    </>
                    : ''
                }

                {finished2 ?
                    <>
                        <Gap tw={'invisible'} ref={scroll_ref}/>
                        <Table title={'测试日志'} data={log || []} headers={headers_arr}>

                        </Table>
                        <Gap tw={'invisible'}/>
                        <ContentWrapper tw={'min-h-0 h-32'}>
                            <LineWrapper>
                                <InLineTitle tw={''}>导出日志</InLineTitle>
                            </LineWrapper>
                            <LineWrapper tw={''}>
                                <MButton disabled={loading6 || log === null || (log && log.length === 0)} h={'36px'} w={'140px'} tw={'rounded-full'}
                                         onClick={handleExportToExcel}>
                                    {
                                        loading6 ?
                                            <>导出中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                            :
                                            <>下载数据<FontAwesomeIcon icon={solid("file-export")} fade tw={'ml-1'}/></>
                                    }
                                </MButton>
                            </LineWrapper>
                        </ContentWrapper>
                    </>
                    : ''
                }
            </Wrapper>
        </div>
    );
}