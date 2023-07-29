import React, {useEffect, useRef, useState} from 'react';
import {
    ButtonWrapper,
    HeaderWrapper,
    ContentWrapper,
    Wrapper,
    LineWrapper
} from "@/views/Tools/BilibiliPage/Styled.twin";
import {notify_error, notify_success} from "@/hooks/toasts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {duotone, regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "twin.macro";
import {useBeforeUnload, useNavigate} from "react-router-dom";
import {H2, H3, H4, InLineTitle} from "@/styles/TextStyles";
import {Gap} from "@/components/Gap/Styled.twin";
import {BackButton, MButton} from "@/components/Button/Styled.twin";
import {PictureDisplay} from "@/components/PictureDisplay/Styled.twin";
import axios from 'axios';
import {useClipboard} from "use-clipboard-copy";
import {Tooltip} from 'react-tooltip';
import MyContext from './MyContext';
import Pagination from "./Pagination";
import {faBilibili} from "@fortawesome/free-brands-svg-icons";
import {app_config, log_api_config} from "@/GlobalConfig";
import {blobToDataUrl} from "@/utils/utils";
import TextInput from "@/components/TextInputLine/TextInput";

export default function BilibiliPage() {
    const default_cover = 'images/image-blue-300.png';
    const clipboard = useClipboard();
    const navigate = useNavigate();
    const a_ref = useRef(null);
    const scroll_ref = useRef(null);
    const [text, setText] = useState('');
    const [data, setData] = useState(null);
    const [list, setList] = useState(null);
    const [count, setCount] = useState(0);   // 服务统计
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [cover, setCover] = useState(default_cover);
    const [downloadState, setDownloadState] = useState(new Map());
    const [iosIsDownloading, setIosIsDownloading] = useState(false);
    const handleChange = (event) => {
        setText(event.target.value);
        setInvalid(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            scroll_ref.current.click();
            scroll_ref.current.focus();
        }
    }

    const handleDownloadPic = (event) => {
        if (!data)
            return;
        let a = a_ref.current;
        // a.href = data.cover;
        a.href = cover;
        a.download = data.title;
        a.click();
        notify_success('下载封面成功 !', 'download_pic_success');
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
            blobToDataUrl(blob).then((url) => {
                setCover(url);
            });

            notify_success('解析成功 !', 'resolving_success');

            // 更新服务请求次数
            setCount((await log_api_config.awaitCountAPI('PUT', 'bilibili')).data[0].count);

            setTimeout(() => {
                scroll_ref.current.scrollIntoView({behavior: 'smooth'});
            }, 100);
        } catch (error) {
            if(error.config.url === log_api_config.url.counts){
                console.log('Failed to put counts');
                return error;
            }
            setList(null);
            notify_error('解析失败，请检查URL或重试 !', 'resolving_error');
            setFinished(false);
            setInvalid(true);
            setCover(default_cover);
            setData(null);
            console.error('Failed to resolve video URL:', error);
        } finally {
            setLoading(false);
        }
    }


    const handleSubmit = (event) => {
        let valid_url = null;
        if (!text) {
            setInvalid(true);
            notify_error('请输入有效的URL', 'input_error');
            return;
        } else {
            valid_url = text.match(/https?:\/\/[^\s/$.?#]*[^\s/$.$].[^\s]*/gi);
            if (!valid_url) {
                setInvalid(true);
                notify_error('请输入有效的URL', 'input_error_2');
                return;
            }
        }

        setLoading(true);

        const url = 'https://www.mxnzp.com/api/bilibili/video';
        const params = {
            url: btoa(valid_url[0]),
            app_id: app_config.app_id,
            app_secret: app_config.app_secret,
        };
        fetchData(url, params).then(r => r).catch(e => e);

    };

    useBeforeUnload(() => {
        // 离开页面前保存状态
        if(data === null)
            return;
        let downloadStateArray = Array.from(downloadState);
        sessionStorage.setItem('bilibili_states', (JSON.stringify({
            text,
            data,
            list,
            loading,
            finished,
            invalid,
            cover,
            downloadStateArray,
            iosIsDownloading
        })));
    });

    useEffect(() => {
        // return () => {
            // 保存状态
            if(data === null)
                return;
            let downloadStateArray = Array.from(downloadState);
            sessionStorage.setItem('bilibili_states', (JSON.stringify({
                text,
                data,
                list,
                loading,
                finished,
                invalid,
                cover,
                downloadStateArray,
                iosIsDownloading
            })));
        // };
    }, [text, data, list, loading, finished, invalid, cover, downloadState]);

    useEffect(() => {
        if(sessionStorage.getItem('bilibili_states')){
            const last_states = JSON.parse((sessionStorage.getItem('bilibili_states')));
            setText(last_states.text ? last_states.text : '');
            setData(last_states.data ? last_states.data : null);
            setList(last_states.list ? last_states.list : null);
            setLoading(last_states.loading);
            setFinished(last_states.finished);
            setInvalid(last_states.invalid);
            setCover(last_states.cover);
            setDownloadState(new Map(last_states.downloadStateArray));
            setIosIsDownloading(last_states.iosIsDownloading);
        }
        // 在组件挂载时启动定时器
        // const timer = setInterval(() => {
        //     // 定时器任务逻辑
        //     // let obj = sessionStorage.getItem('tiktok_states');
        //     // if(obj && JSON.stringify(Array.from(downloadState)) !== JSON.stringify(JSON.parse(decodeURIComponent(obj)).downloadStateArray)){
        //     //     console.log('update download state');
        //     if(sessionStorage.getItem('bilibili_states'))
        //         setDownloadState(new Map(JSON.parse(decodeURIComponent(sessionStorage.getItem('bilibili_states'))).downloadStateArray));
        //     // }
        //
        // }, 1000);

        // 在组件卸载时清除定时器
        return () => {
            // clearInterval(timer);
        };
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
                    <H2>bilibili视频解析</H2>
                </HeaderWrapper>
                <ContentWrapper>
                    <LineWrapper>
                        <InLineTitle>
                            输入<FontAwesomeIcon icon={faBilibili} tw={"text-pink-400 pl-1 pr-1 duration-500 ease-out"}/>链接
                        </InLineTitle>
                    </LineWrapper>

                    <LineWrapper>
                        <TextInput
                            icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                            placeholder={' '}
                            desc={'输入bilibili视频URL'}
                            id={'input_bilibili'}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            invalid={invalid}
                            text={text}
                            setText={setText}
                            iconOnClick={() => {setText && setText('')}}
                            data_tooltip_id={"url_tooltip"}
                            data_tooltip_content={"直接粘贴B站分享文本即可"}
                            data_tooltip_variant={"info"}
                        />
                    </LineWrapper>
                    <Tooltip id="url_tooltip" offset={20} openOnClick={true} place="top" tw={'bg-blue-400 max-w-xs md:max-w-lg rounded-2xl absolute z-200'} hidden={!!text}/>

                    <LineWrapper tw={'mt-2'}>
                        <MButton disabled={loading} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleSubmit}
                                 ref={scroll_ref}>
                            {
                                loading ?
                                    <>解析中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                    :
                                    <>解析链接<FontAwesomeIcon icon={solid("hand-spock")} shake tw={'ml-1'}/></>
                            }
                        </MButton>
                    </LineWrapper>
                </ContentWrapper>
                    {/*<Gap/>*/}
                <ContentWrapper>
                    <LineWrapper>
                        <InLineTitle tw={'mb-2'}>获取<FontAwesomeIcon icon={solid("link")} tw={"text-blue-400 pl-1 pr-1 duration-500 ease-out"}/>结果</InLineTitle>
                    </LineWrapper>
                    <LineWrapper>
                        <PictureDisplay height={150} width={256} src={cover}/>
                    </LineWrapper>
                    <Gap tw={'invisible'}/>
                    <LineWrapper>
                        <TextInput
                            icon={<FontAwesomeIcon icon={solid("copy")} tw={'ml-1'}/>}
                            placeholder={'待解析'}
                            desc={'视频标题'}
                            id={'input_title_main'}
                            text={data ? data.title : ''}
                            iconOnClick={() => {
                                if (data) {
                                    clipboard.copy(data.title);
                                    notify_success('视频标题Copied !', 'title_copy');
                                } else
                                    notify_error('视频标题Copy失败 !', 'title_copy_error');
                            }}
                            data_tooltip_id={"title_tooltip"}
                            data_tooltip_content={data ? data.title : ''}
                            data_tooltip_variant={"info"}
                            readOnly
                        />
                        <Tooltip id="title_tooltip" offset={15} tw={'bg-blue-400 max-w-xs md:max-w-lg rounded-2xl absolute z-200'}/>
                    </LineWrapper>
                    <LineWrapper>
                        <TextInput
                            icon={<FontAwesomeIcon icon={solid("copy")} tw={'ml-1'}/>}
                            placeholder={'待解析'}
                            desc={'视频描述'}
                            id={'input_desc_main'}
                            text={data ? (data.desc === '' ? '无描述' : data.desc) : ''}
                            iconOnClick={() => {
                                if (data) {
                                    clipboard.copy(data.desc);
                                    notify_success('视频描述Copied !', 'description_copy');
                                } else
                                    notify_error('视频描述Copy失败 !', 'description_copy_error');
                            }}
                            data_tooltip_id={"desc_tooltip"}
                            data_tooltip_content={data ? data.desc : ''}
                            data_tooltip_variant={"info"}
                            readOnly
                        />
                        <Tooltip id="desc_tooltip" offset={15} tw={'bg-blue-400 max-w-xs md:max-w-lg rounded-2xl absolute z-200'}/>
                    </LineWrapper>
                    <LineWrapper tw={'mt-2'}>
                        <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:mr-6'}
                                 onClick={() => {
                                     clipboard.copy(data ? data.cover : '');
                                     notify_success('封面URL Copied !', 'cover_url_copy');
                                 }}>
                            {
                                !finished ?
                                    <>暂无解析<FontAwesomeIcon icon={solid("copy")} fade tw={'ml-1'}/></>
                                    :
                                    <>封面URL<FontAwesomeIcon icon={solid("copy")} beat tw={'ml-1'}/></>
                            }
                        </MButton>
                        <MButton disabled={!finished || iosIsDownloading} h={'36px'} w={'140px'} tw={'rounded-full md:ml-6'}
                                 onClick={handleDownloadPic}>
                            {
                                !finished ?
                                    <>暂无解析<FontAwesomeIcon icon={solid("image")} fade tw={'ml-1'}/></>
                                    :
                                    <>下载封面<FontAwesomeIcon icon={solid("download")} beat tw={'ml-1'}/></>
                            }
                        </MButton>
                        <a tw={'hidden'} ref={a_ref} target="_blank" rel="noopener noreferrer"/>
                    </LineWrapper>
                </ContentWrapper>
                <MyContext.Provider value={{finished, a_ref, downloadState, setDownloadState, iosIsDownloading, setIosIsDownloading}}>
                    {list ? <Pagination data={list.map((item, index) => {
                        item.index = index;
                        return item;
                    })}/> : ''}
                </MyContext.Provider>

            </Wrapper>
        </div>
    );
}