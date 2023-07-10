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

export default function SeleniumPage() {
    const navigate = useNavigate();
    const button_ref = useRef(null);
    const button2_ref = useRef(null);
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [finished, setFinished] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [invalid2, setInvalid2] = useState(false);
    const [data, setData] = useState(null);

    const handleChange2 = (event) => {
        setText2(event.target.value);
        setInvalid2(false);
    };

    const handleKeyPress2 = (event) => {
        if (event.key === 'Enter') {
            button2_ref.current.click();
            button2_ref.current.focus();
        }
    }

    const handleSubmit = (event) => {
        setLoading(true);

        const url = 'http://172.22.35.12:8085/initialTable';
        const params = {
        };

        axios.post(url, {params})
            .then(response => {
                if(response.data.code === '0'){
                    notify_error('服务器内部错误，请练习管理员 !', 'insert_backend_error');
                    return;
                }
                notify_success('数据库初始化成功 !', 'init_success');
                queryInstruction();
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
        if(!text2){
            setInvalid2(true);
            notify_error('请输入测试语句 !', 'qrcode_input_error2');
            return;
        }

        setLoading2(true);

        const url = 'http://172.22.35.12:8085/insertInstruction';

        axios.post(url, text2)
            .then(response => {
                if(response.data.code === '0'){
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

    const queryInstruction = () => {
        const url = 'http://172.22.35.12:8085/queryInstruction';
        const param = {};
        axios.get(url, param)
            .then(res => {
                if(res.data.code === '0'){
                    notify_error('数据库内部错误，请练习管理员 !', 'query_backend_error');
                    return;
                }
                if(res.data.code === '1'){
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

    const handleStartTest = () => {
        setLoading3(true);
        axios.post('http://172.22.35.12:8085/executeTest', {

        }).then(res => {
            if(res.data.code === '0'){
                notify_error('数据库内部错误，请练习管理员 !', 'query_backend_error');
                return;
            }
            notify_success('测试完毕 !', 'test_success');
        })
            .finally(() => {
                setLoading3(false);
            })
    }

    useBeforeUnload(() => {
        // 离开页面前保存状态
        if(!finished)
            return;
        sessionStorage.setItem('selenium_states', (JSON.stringify({
            text,
            text2,
            data,
            loading,
            loading2,
            loading3,
            finished,
            invalid,
            invalid2,
        })));
    });

    useEffect(() => {
        // return () => { // 总是每次更新状态后保存上一个状态的值，而不是保存最新的状态
        // 保存状态
        if(data === null)
            return;
        if(!finished)
            return;
        sessionStorage.setItem('selenium_states', (JSON.stringify({
            text,
            text2,
            data,
            loading,
            loading2,
            loading3,
            finished,
            invalid,
            invalid2,
        })));
        // };
    }, [text,
        text2,
        data,
        loading,
        loading2,
        loading3,
        finished,
        invalid,
        invalid2,]);

    useEffect(() => {
        if(sessionStorage.getItem('selenium_states')){
            const last_states = JSON.parse((sessionStorage.getItem('selenium_states')));
            setText(last_states.text ? last_states.text : '');
            setText2(last_states.text2 ? last_states.text2 : '');
            setData(last_states.data ? last_states.data : null);
            setLoading(last_states.loading);
            setLoading2(last_states.loading2);
            setLoading3(last_states.loading3);
            setFinished(last_states.finished);
            setInvalid(last_states.invalid);
            setInvalid2(last_states.invalid2);
        }
        queryInstruction();
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
                <ContentWrapper tw={'min-h-0 h-32'}>
                    <LineWrapper>
                        <InLineTitle tw={''}>初始化{finished ? (data && data.length > 0 ? <FontAwesomeIcon icon={solid("database")} tw={'text-green-400 pl-1 pr-1 duration-500 ease-out'}/> : <FontAwesomeIcon icon={solid("database")} tw={'text-orange-400 pl-1 pr-1 duration-500 ease-out'}/>) : <FontAwesomeIcon icon={solid("database")} tw={'text-red-400 pl-1 pr-1 duration-500 ease-out'}/>}数据库</InLineTitle>
                    </LineWrapper>

                    <LineWrapper tw={''}>
                        <MButton disabled={loading} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleSubmit} ref={button_ref}>
                            {
                                loading ?
                                    <>执行中<FontAwesomeIcon icon={solid("gear")} spin tw={'ml-1'}/></>
                                    :
                                    <>初始化<FontAwesomeIcon icon={solid("gear")} fade tw={'ml-1'}/></>
                            }
                        </MButton>
                    </LineWrapper>
                </ContentWrapper>
                    {/*<Gap/>*/}
                <ContentWrapper>
                    <LineWrapper>
                        <InLineTitle tw={'mb-2'}>插入语句</InLineTitle>
                    </LineWrapper>
                    <LineWrapper>
                        <TextInput
                            icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                            placeholder={' '}
                            desc={'输入测试语句'}
                            id={'input_text2'}
                            onChange={handleChange2}
                            onKeyPress={handleKeyPress2}
                            invalid={invalid2}
                            text={text2}
                            setText={setText2}
                            iconOnClick={() => {setText2 && setText2('')}}
                        />
                    </LineWrapper>
                    <LineWrapper tw={'mt-2'}>
                        <MButton disabled={loading2} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleSubmit2} ref={button2_ref}>
                            {
                                loading2 ?
                                    <>执行中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                    :
                                    <>插入语句<FontAwesomeIcon icon={solid("circle-plus")} fade tw={'ml-1'}/></>
                            }
                        </MButton>
                    </LineWrapper>
                </ContentWrapper>
                <ContentWrapper tw={'min-h-0 h-32'}>
                    <LineWrapper>
                        <InLineTitle tw={''}>开始测试</InLineTitle>
                    </LineWrapper>
                    <LineWrapper tw={''}>
                        <MButton disabled={loading3} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleStartTest}>
                            {
                                loading3 ?
                                    <>测试中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                    :
                                    <>开始测试<FontAwesomeIcon icon={solid("play")} fade tw={'ml-1'}/></>
                            }
                        </MButton>
                    </LineWrapper>
                </ContentWrapper>
                {/*<ContentWrapper>*/}
                {finished ?
                    <>
                        <Gap tw={'invisible'}/>
                        <Table columns={4} rows={10} title={'指令序列'} data={data || []} headers={['ID', 'Type', 'Element', 'Param']}>

                        </Table>
                        <Gap tw={'invisible'}/>
                    </>
                    : ''
                }
                {/*</ContentWrapper>*/}

            </Wrapper>
        </div>
    );
}