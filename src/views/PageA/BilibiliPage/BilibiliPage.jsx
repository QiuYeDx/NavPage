import React, {useEffect, useRef, useState} from 'react';
import {
    ButtonWrapper,
    HeaderWrapper,
    ContentWrapper,
    Wrapper,
    LineWrapper
} from "@/views/PageA/BilibiliPage/Styled.twin";
import {notify_error, notify_success} from "@/hooks/toasts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {duotone, regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "twin.macro";
import {useNavigate} from "react-router-dom";
import {H2, InLineTitle} from "@/styles/TextStyles";
import {TextInputLine} from "@/components/TextInputLine/Styled.twin";
import {Gap} from "@/components/Gap/Styled.twin";
import {BackButton, MButton} from "@/components/Button/Styled.twin";
import {PictureDisplay} from "@/components/PictureDisplay/Styled.twin";
import axios from 'axios';
import {useClipboard} from "use-clipboard-copy";
import {isURL} from "@/utils/utils";
import { Tooltip } from 'react-tooltip';
import MyContext from './MyContext';
import Pagination from "./Pagination";

export default function BilibiliPage() {
    const default_cover = 'images/image-blue-300.png';
    const clipboard = useClipboard();
    const navigate = useNavigate();
    const a_ref = useRef(null);
    const scroll_ref = useRef(null);
    const [text, setText] = useState('');
    const [data, setData] = useState(null);
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [cover, setCover] = useState(default_cover);
    const handleChange = (event) => {
        setText(event.target.value);
        setInvalid(false);
    };
    const handleDownloadPic = (event) => {
        if(!data)
            return;
        let a = a_ref.current;
        a.href = data.cover;
        a.click();
    };

    async function fetchData(url, params) {
        try {
            const response = await axios.get(url, {params});
            setData(response.data.data);
            setList(response.data.data.list);
            setFinished(true);

            const coverResponse = await axios.get(response.data.data.cover, {
                responseType: 'blob',
            });
            const blob = coverResponse.data;
            setCover(URL.createObjectURL(blob));

            notify_success('解析成功 !', 'resolving_success');

            setTimeout(() => {
                scroll_ref.current.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            setList(null);
            notify_error('解析失败，请检查URL或重试 !', 'resolving_error');
            setFinished(false);
            setInvalid(true);
            setCover(default_cover);
            setData(null);
            console.error('Error resolving video URL:', error);
        } finally {
            setLoading(false);
        }
    }


    const handleSubmit = (event) => {
        // if(!text){
        //     setInvalid(true);
        //     notify_error('请输入有效的URL', 'input_error');
        //     return;
        // }else if(!isURL(text)){
        //     setInvalid(true);
        //     notify_error('请输入有效的URL', 'input_error_2');
        //     return;
        // }
        let valid_url = null;
        if(!text){
            setInvalid(true);
            notify_error('请输入有效的URL', 'input_error');
            return;
        }else {
            valid_url = text.match(/https?:\/\/[^\s/$.?#]*[^\s/$.$].[^\s]*/gi);
            if(!valid_url){
                setInvalid(true);
                notify_error('请输入有效的URL', 'input_error_2');
                return;
            }
        }

        setLoading(true);

        const url = 'https://www.mxnzp.com/api/bilibili/video';
        // const url = 'http://127.0.0.1:8000/test_api';
        const params = {
            url: btoa(valid_url[0]),
            app_id: 'jyninllnnkfkllpv',
            app_secret: 'bWF3clZ2RENRMmx3aG95dVVaU1NKQT09',
        };

        // fetchData(url, params).then(r => console.log(r)).catch(e => console.log(e));
        fetchData(url, params).then(r => r).catch(e => e);

    };

    const showAllAns = () => {

    }

    useEffect(() => {
    });
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
                    <H2>bilibili视频解析</H2>
                </HeaderWrapper>
                <ContentWrapper>
                    <LineWrapper>
                        <InLineTitle tw={'after:content-[\'*\'] after:ml-0.5 after:text-red-500'}>1.输入视频稿件链接</InLineTitle>
                    </LineWrapper>

                    <LineWrapper>
                        <InLineTitle fontSize={28} lineHeight={40} tw={'text-gray-600 font-medium -mr-2 -ml-2 text-right'}>
                            URL
                        </InLineTitle>
                        <TextInputLine
                            placeholder={'输入bilibili视频URL'} maxLength={2000} value={text}
                            onChange={handleChange}
                            invalid={invalid}
                            data-tooltip-id="url_tooltip"
                            data-tooltip-content="直接粘贴B站分享文本即可^_^"
                            data-tooltip-variant="info"
                        />
                        <InLineTitle
                            fontSize={28}
                            lineHeight={40}
                            tw={'text-gray-600 font-light -mr-2 -ml-2 md:hover:text-blue-500 active:text-blue-500 md:active:text-blue-300 text-left'}
                            onClick={() => {
                                setText('');
                            }}
                        >
                            <FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>
                        </InLineTitle>
                    </LineWrapper>
                    <Tooltip id="url_tooltip" place="bottom" tw={'bg-blue-400 max-w-xs md:max-w-lg'}/>
                    <Gap/>
                    <LineWrapper>
                        <InLineTitle>2.点击解析</InLineTitle>
                    </LineWrapper>

                    <LineWrapper>
                        <MButton disabled={loading} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleSubmit} ref={scroll_ref}>
                            {
                                loading ?
                                    <>解析中...<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                    :
                                    <>解析链接<FontAwesomeIcon icon={solid("hand-spock")} shake tw={'ml-1'}/></>
                            }
                        </MButton>
                    </LineWrapper>
                    <Gap/>
                    <LineWrapper>
                        <InLineTitle>3.获取结果</InLineTitle>
                    </LineWrapper>
                    <LineWrapper>
                        <PictureDisplay height={150} width={256} src={cover}/>
                    </LineWrapper>
                    <LineWrapper>
                        <InLineTitle fontSize={28} lineHeight={40} tw={'text-gray-600 font-medium -mr-2 -ml-2 text-right'}>
                            标题
                        </InLineTitle>
                        <TextInputLine
                            placeholder={'视频标题'} maxLength={2000} value={data ? data.title : ''}
                            readOnly
                            data-tooltip-id="title_tooltip"
                            data-tooltip-content={data ? data.title : '视频标题'}
                            data-tooltip-variant="info"
                        />
                        <InLineTitle
                            fontSize={28}
                            lineHeight={40}
                            tw={'text-gray-600 font-light -mr-2 -ml-2 md:hover:text-blue-500 active:text-blue-500 md:active:text-blue-300 text-left'}
                            onClick={() => {
                                if(data){
                                    clipboard.copy(data.title);
                                    notify_success('视频标题Copied !', 'title_copy');
                                }else
                                    notify_error('视频标题Copy失败 !', 'title_copy_error');
                            }}
                        >
                            <FontAwesomeIcon icon={solid("copy")} tw={'ml-1'}/>
                        </InLineTitle>
                        <Tooltip id="title_tooltip" tw={'bg-blue-400 max-w-xs md:max-w-lg'}/>
                    </LineWrapper>
                    <LineWrapper>
                        <InLineTitle fontSize={28} lineHeight={40} tw={'text-gray-600 font-medium -mr-2 -ml-2 text-right'}>
                            描述
                        </InLineTitle>
                        <TextInputLine
                            placeholder={'视频描述'} maxLength={2000} value={data ? data.desc : ''}
                            readOnly
                            data-tooltip-id="desc_tooltip"
                            data-tooltip-content={data ? data.desc : '视频描述'}
                            data-tooltip-variant="info"
                        />
                        <InLineTitle
                            fontSize={28}
                            lineHeight={40}
                            tw={'text-gray-600 font-light -mr-2 -ml-2 md:hover:text-blue-500 active:text-blue-500 md:active:text-blue-300 text-left'}
                            onClick={() => {
                                if(data){
                                    clipboard.copy(data.desc);
                                    notify_success('视频描述Copied !', 'description_copy');
                                }else
                                    notify_error('视频描述Copy失败 !', 'description_copy_error');
                            }}
                        >
                            <FontAwesomeIcon icon={solid("copy")} tw={'ml-1'}/>
                        </InLineTitle>
                        <Tooltip id="desc_tooltip" tw={'bg-blue-400 max-w-xs md:max-w-lg'}/>
                    </LineWrapper>
                    <LineWrapper tw={'mt-4'}>
                        <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:mr-6'} onClick={() => {
                            clipboard.copy(data ? data.cover : '');
                            notify_success('封面URL Copied !', 'cover_url_copy');
                        }}>
                            {
                                !finished ?
                                    <>暂无解析<FontAwesomeIcon icon={solid("copy")} flip tw={'ml-1'}/></>
                                    :
                                    <>拷贝封面URL<FontAwesomeIcon icon={solid("copy")} beat tw={'ml-1'}/></>
                            }
                        </MButton>
                        <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:ml-6'} onClick={handleDownloadPic}>
                            {
                                !finished ?
                                    <>暂无解析<FontAwesomeIcon icon={solid("image")} flip tw={'ml-1'}/></>
                                    :
                                    <>下载封面<FontAwesomeIcon icon={solid("download")} beat tw={'ml-1'}/></>
                            }
                        </MButton>
                        <a tw={'hidden'} ref={a_ref} target="_blank" rel="noopener noreferrer"/>
                    </LineWrapper>
                </ContentWrapper>
                <MyContext.Provider value={{finished, a_ref}}>
                    {list ? <Pagination data={list.map((item, index) => {item.index = index; return item;})}/> : ''}
                </MyContext.Provider>

            </Wrapper>
        </div>
    );
}