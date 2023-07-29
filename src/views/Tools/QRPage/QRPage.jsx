import React, {useEffect, useRef, useState} from 'react';
import {
    ButtonWrapper,
    HeaderWrapper,
    ContentWrapper,
    Wrapper,
    LineWrapper
} from "@/views/Tools/QRPage/Styled.twin";
import {notify_error, notify_success} from "@/hooks/toasts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "twin.macro";
import {useBeforeUnload, useLocation, useNavigate} from "react-router-dom";
import {H2, InLineTitle} from "@/styles/TextStyles";
import {BackButton, MButton} from "@/components/Button/Styled.twin";
import {PictureDisplay} from "@/components/PictureDisplay/Styled.twin";
import axios from 'axios';
import {app_config, log_api_config} from "@/GlobalConfig";
import TextInput from "@/components/TextInputLine/TextInput";
import Picture from "@/components/PictureDisplay/Pictrue";

export default function QRPage() {
    const navigate = useNavigate();
    const a_ref = useRef(null);
    const button_ref = useRef(null);
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);  // 服务统计
    const [data, setData] = useState('images/qrcode-solid-md.png');
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [picLoading, setPicLoading] = useState(false);

    const handleChange = (event) => {
        setText(event.target.value);
        setInvalid(false);
    };
    const handleDownload = (event) => {
        if(!data)
            return;
        let a = a_ref.current;
        a.href = data;
        a.download = "qrcode-solid-md.png";
        a.click();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            button_ref.current.click();
            button_ref.current.focus();
        }
    }

    const handleSubmit = (event) => {
        if(!text){
            setInvalid(true);
            notify_error('请输入内容 !', 'qrcode_input_error');
            return;
        }

        setLoading(true);
        setPicLoading(true);

        const url = 'https://www.mxnzp.com/api/qrcode/create/single';
        const params = {
            content: text,
            size: 500,
            type: 1,
            app_id: app_config.app_id,
            app_secret: app_config.app_secret,
        };

        axios.get(url, {params})
            .then(response => {
                const qrCodeBase64 = response.data.data.qrCodeBase64;
                setData(qrCodeBase64);
                notify_success('QR码获取成功 !', 'qrcode_get_success');

                // 更新服务请求次数
                log_api_config.awaitCountAPI('PUT', 'qrcode').then(res => {
                    setCount(res.data[0].count);
                }).catch(err => console.error('Failed to put qrcode count'));
            })
            .catch(error => {
                console.error('Failed to generate QR code:', error);
                notify_error('QR码获取失败，请重试 !', 'qrcode_get_error')
            })
            .finally(() => {
                setLoading(false);
                setPicLoading(false);
                setFinished(true);
            });
    };

    useBeforeUnload(() => {
        // 离开页面前保存状态
        if(!finished)
            return;
        sessionStorage.setItem('qrcode_states', (JSON.stringify({
            text,
            data,
            loading,
            finished,
            invalid,
        })));
    });

    useEffect(() => {
        // return () => { // 总是每次更新状态后保存上一个状态的值，而不是保存最新的状态
        // 保存状态
        if(!finished)
            return;
        let str_data = data.toString();
        sessionStorage.setItem('qrcode_states', (JSON.stringify({
            text,
            data,
            loading,
            finished,
            invalid,
        })));
        // };
    }, [text, data, loading, finished, invalid]);

    useEffect(() => {
        if(sessionStorage.getItem('qrcode_states')){
            const last_states = JSON.parse((sessionStorage.getItem('qrcode_states')));
            setText(last_states.text ? last_states.text : '');
            setData(last_states.data ? last_states.data : 'images/qrcode-solid-md.png');
            setLoading(last_states.loading);
            setFinished(last_states.finished);
            setInvalid(last_states.invalid);
        }
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
                    <H2>二维码生成器</H2>
                </HeaderWrapper>
                <ContentWrapper>
                    <LineWrapper>
                        <InLineTitle tw={'mb-2'}>输入<FontAwesomeIcon icon={solid("keyboard")} tw={'text-blue-400 pl-1 pr-1 duration-500 ease-out'}/>内容</InLineTitle>
                    </LineWrapper>

                    <LineWrapper>
                        <TextInput
                            icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                            placeholder={' '}
                            desc={'输入文本或URL'}
                            id={'input_text'}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            invalid={invalid}
                            text={text}
                            setText={setText}
                            iconOnClick={() => {setText && setText('')}}
                        />
                    </LineWrapper>

                    <LineWrapper tw={'mt-2'}>
                        <MButton disabled={loading} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleSubmit} ref={button_ref}>
                            {
                                loading ?
                                    <>获取中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                    :
                                    <>获取QR码<FontAwesomeIcon icon={regular("hand-spock")} shake tw={'ml-1'}/></>
                            }
                        </MButton>
                    </LineWrapper>
                </ContentWrapper>
                    {/*<Gap/>*/}
                <ContentWrapper>
                    <LineWrapper>
                        <InLineTitle tw={'mb-2'}>获取<FontAwesomeIcon icon={solid("qrcode")} tw={"text-blue-400 pl-1 pr-1 duration-500 ease-out"}/>结果</InLineTitle>
                    </LineWrapper>
                    <LineWrapper>
                        <Picture url={data} loadingFlag={picLoading} />
                    </LineWrapper>
                    <LineWrapper tw={'mt-2'}>
                        <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleDownload}>
                            {
                                !finished ?
                                    <>暂无QR码<FontAwesomeIcon icon={solid("xmark")} shake tw={'ml-1'}/></>
                                    :
                                    <>保存QR码<FontAwesomeIcon icon={solid("download")} beat tw={'ml-1'}/></>
                            }
                        </MButton>
                        <a tw={'hidden'} ref={a_ref}/>
                    </LineWrapper>
                </ContentWrapper>
            </Wrapper>
        </div>
    );
}