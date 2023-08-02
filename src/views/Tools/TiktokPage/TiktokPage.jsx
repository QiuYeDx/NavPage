import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    ButtonWrapper,
    HeaderWrapper,
    ContentWrapper,
    Wrapper,
    LineWrapper
} from "@/views/Tools/TiktokPage/Styled.twin";
import {notify_error, notify_loading, notify_success} from "@/hooks/toasts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "twin.macro";
import {useBeforeUnload, useNavigate} from "react-router-dom";
import {H2, InLineTitle} from "@/styles/TextStyles";
import {Gap} from "@/components/Gap/Styled.twin";
import {BackButton, MButton} from "@/components/Button/Styled.twin";
import {PictureDisplay} from "@/components/PictureDisplay/Styled.twin";
import axios from 'axios';
import {useClipboard} from "use-clipboard-copy";
import {Tooltip} from 'react-tooltip';
import FadeInOnViewport from "@/components/FadeInOnViewport/FadeInOnViewport";
import {faTiktok} from "@fortawesome/free-brands-svg-icons";
import {blobToDataUrl, downloadWithProgress} from "@/utils/utils";
import toast from "react-hot-toast";
import {app_config, log_api_config} from "@/GlobalConfig";
import TextInput from "@/components/TextInputLine/TextInput";
import Picture from "@/components/PictureDisplay/Pictrue";

export default function TiktokPage() {
    const default_cover = 'images/image-blue-300.svg';
    const clipboard = useClipboard();
    const navigate = useNavigate();
    const a_ref = useRef(null);
    const scroll_ref = useRef(null);
    const [text, setText] = useState('');
    const [data, setData] = useState(null);
    const [count, setCount] = useState(0);   // 服务统计
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [cover, setCover] = useState(default_cover);
    const [dyCover, setDyCover] = useState(default_cover);
    const [downloadState, setDownloadState] = useState(new Map());

    const handleChange = useCallback((event) => {
        setText(event.target.value);
        setInvalid(false);
    }, []);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            scroll_ref.current.click();
            scroll_ref.current.focus();
        }
    }, []);

    const showDownloadProgress = (progress, id) => {
        notify_loading(<span>正在下载视频: <span tw={'font-mono'} style={{color: 'rgb(96, 165, 250)', width: '66px', display: 'inline-block', 	textAlign: 'right'}}>{progress}%</span></span>, 'downloading_video' + id);
    };

    const finished_callback = (id) => {
        toast.dismiss('downloading_video' + id);
        notify_success('视频下载完毕 !', 'finished_video' + id);
    }

    async function fetchData(url, params) {
        try {
            const response = await axios.get(url, {params});
            setData(response.data.data);
            setFinished(true);

            const coverResponse = await axios.get(response.data.data.cover, {
                responseType: 'blob',
            });
            const blob = coverResponse.data;
            blobToDataUrl(blob).then((url) => {
                setCover(url);
            });

            const dyCoverResponse = await axios.get(response.data.data.coverDynamic, {
                responseType: 'blob',
            });
            const blob_dyCover = dyCoverResponse.data;
            blobToDataUrl(blob_dyCover).then((url) => {
                setDyCover(url);
            });

            notify_success('解析成功 !', 'resolving_success');

            try{
                // 更新服务请求次数
                setCount((await log_api_config.awaitCountAPI('PUT', 'tiktok')).data[0].count);
            } catch (e){
                console.warn(e);
            }

            setTimeout(() => {
                scroll_ref.current.scrollIntoView({behavior: 'smooth'});
            }, 100);
        } catch (error) {
            notify_error('解析失败，请检查URL或重试 !', 'resolving_error');
            setFinished(false);
            setInvalid(true);
            setCover(default_cover);
            setDyCover(default_cover);
            setData(null);
            console.error('Error resolving video URL:', error);
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

        const url = 'https://www.mxnzp.com/api/douyin/video';
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
        sessionStorage.setItem('tiktok_states', (JSON.stringify({
            text,
            data,
            loading,
            finished,
            invalid,
            cover,
            dyCover,
            downloadStateArray
        })));
    });

    useEffect(() => {
        // return () => { // 总是每次更新状态后保存上一个状态的值，而不是保存最新的状态
            // 保存状态
            if(data === null)
                return;
            let downloadStateArray = Array.from(downloadState);
            sessionStorage.setItem('tiktok_states', (JSON.stringify({
                text,
                data,
                loading,
                finished,
                invalid,
                cover,
                dyCover,
                downloadStateArray
            })));
        // };
    }, [text, data, loading, finished, invalid, cover, dyCover, downloadState]);

    useEffect(() => {
        if(sessionStorage.getItem('tiktok_states')){
            const last_states = JSON.parse((sessionStorage.getItem('tiktok_states')));
            setText(last_states.text ? last_states.text : '');
            setData(last_states.data ? last_states.data : null);
            setLoading(last_states.loading);
            setFinished(last_states.finished);
            setInvalid(last_states.invalid);
            setCover(last_states.cover);
            setDyCover(last_states.dyCover);
            setDownloadState(new Map(last_states.downloadStateArray));
        }
        // 在组件挂载时启动定时器
        const timer = setInterval(() => {
            // 定时器任务逻辑
            // let obj = sessionStorage.getItem('tiktok_states');
            // if(obj && JSON.stringify(Array.from(downloadState)) !== JSON.stringify(JSON.parse(decodeURIComponent(obj)).downloadStateArray)){
            //     console.log('update download state');
            if(sessionStorage.getItem('tiktok_states'))
                setDownloadState(new Map(JSON.parse(decodeURIComponent(sessionStorage.getItem('tiktok_states'))).downloadStateArray));
            // }

        }, 1000);

        // 在组件卸载时清除定时器
        return () => {
            clearInterval(timer);
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
                    <H2>Tiktok视频解析</H2>
                </HeaderWrapper>
                <ContentWrapper>
                    <LineWrapper>
                        <InLineTitle>
                            输入<FontAwesomeIcon icon={faTiktok} tw={"pl-1 pr-1 duration-500 ease-out"}/>口令
                        </InLineTitle>
                    </LineWrapper>

                    <LineWrapper>
                        <TextInput
                            icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
                            placeholder={' '}
                            desc={'输入抖音分享口令'}
                            id={'input_tiktok'}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            invalid={invalid}
                            text={text}
                            setText={setText}
                            iconOnClick={() => {setText && setText('')}}
                            data_tooltip_id={"url_tooltip"}
                            data_tooltip_content={"直接粘贴Tiktok分享口令即可"}
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
                    <LineWrapper tw={'flex-wrap'}>
                        {/* 150 * 256 => 384 * 216 => 288 * 162*/}
                        <Picture h={data ? '288px' : '150px'} w={data ? '162px' : '256px'} url={cover} />
                    </LineWrapper>
                    {/*<Gap tw={'invisible'}/>*/}
                    <div tw={'invisible'}> </div>
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
                    <LineWrapper tw={'mt-2'}>
                        <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:mr-6'}
                                 onClick={() => {
                                     clipboard.copy(data ? data.cover : '');
                                     notify_success('静态封面URL Copied !', 'cover_url_copy');
                                 }}>
                            {
                                !finished ?
                                    <>暂无解析<FontAwesomeIcon icon={solid("image")} fade tw={'ml-1'}/></>
                                    :
                                    <>静态封面<FontAwesomeIcon icon={solid("copy")} beat tw={'ml-1'}/></>
                            }
                        </MButton>
                        <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:ml-6'}
                                 onClick={() => {
                                     clipboard.copy(data ? data.coverDynamic : '');
                                     notify_success('动态封面URL Copied !', 'dyCover_url_copy');
                                 }}>
                            {
                                !finished ?
                                    <>暂无解析<FontAwesomeIcon icon={solid("image")} fade tw={'ml-1'}/></>
                                    :
                                    <>动态封面<FontAwesomeIcon icon={solid("copy")} beat tw={'ml-1'}/></>
                            }
                        </MButton>
                        <a tw={'hidden'} ref={a_ref} target="_blank" rel="noopener noreferrer"/>
                    </LineWrapper>
                </ContentWrapper>
                {data ? <FadeInOnViewport>
                    <ContentWrapper>
                        <LineWrapper>
                            <InLineTitle>
                                视频<FontAwesomeIcon icon={solid("layer-group")} tw={"text-blue-400 pl-1 pr-1 duration-500 ease-out"}/>详情
                            </InLineTitle>
                        </LineWrapper>
                        <Gap/>
                        <LineWrapper>
                            <InLineTitle tw={'text-2xl font-medium flex flex-row justify-between min-w-[298px] max-w-[330px]'}>
                                <span tw={'flex flex-row justify-between w-[72px]'}><span>时</span><span>长</span></span>
                                <span tw={'text-blue-500'}>{data && data.durationFormat}</span>
                            </InLineTitle>
                        </LineWrapper>
                        <LineWrapper>
                            <InLineTitle tw={'text-2xl font-medium flex flex-row justify-between min-w-[298px] max-w-[330px]'}>
                                <span>原尺寸</span>
                                <span>
                                    <span tw={'text-blue-500'}>{data && data.width}</span>
                                    <FontAwesomeIcon icon={solid("xmark")}/>
                                    <span tw={'text-blue-500'}>{data && data.height}</span>
                                </span>
                            </InLineTitle>
                        </LineWrapper>
                        <LineWrapper tw={'mt-2'}>
                            <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:mr-6'}
                                     onClick={() => {
                                         clipboard.copy(data.url);
                                         notify_success('视频URL Copied !', 'video_url_copy');
                                     }}>
                                {
                                    !finished ?
                                        <>暂无解析<FontAwesomeIcon icon={solid("copy")} fade tw={'ml-1'}/></>
                                        :
                                        <>视频URL<FontAwesomeIcon icon={solid("copy")} beat tw={'ml-1'}/></>
                                }
                            </MButton>
                            <MButton disabled={!finished || downloadState.get(1)} h={'36px'} w={'140px'} tw={'rounded-full md:ml-6'}
                                     onClick={() => {
                                         if (!data)
                                             return;
                                         let a = a_ref.current;

                                         setDownloadState((downloadState) => {
                                             let newMap = new Map(downloadState);
                                             newMap.set(1, true);
                                             return newMap;
                                         });
                                         downloadWithProgress(data.url, showDownloadProgress, finished_callback, 1).then(blob => {
                                             a.href = URL.createObjectURL(blob);
                                             a.download = data.title + '.mp4';
                                             a.click();
                                             console.log('下载完成');
                                             let old_state = JSON.parse(decodeURIComponent(sessionStorage.getItem('tiktok_states')));
                                             let download_state = new Map(old_state.downloadStateArray);
                                             download_state.set(1, false);
                                             old_state.downloadStateArray = Array.from(download_state);
                                             sessionStorage.setItem('tiktok_states', encodeURIComponent(JSON.stringify(old_state)));

                                             setDownloadState((downloadState) => {
                                                 console.log('修改前', downloadState);
                                                 let newMap2 = new Map(downloadState);
                                                 newMap2.set(1, false);
                                                 console.log('修改后', newMap2);
                                                 return newMap2;
                                             });
                                         });
                                     }}>
                                {
                                    !finished ?
                                        <>暂无解析<FontAwesomeIcon icon={solid("film")} fade tw={'ml-1'}/></>
                                        :
                                        (downloadState.get(1) ? <>下载中...<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></> : <>下载视频<FontAwesomeIcon icon={solid("download")} beat tw={'ml-1'}/></>)
                                }
                            </MButton>
                        </LineWrapper>
                    </ContentWrapper>
                </FadeInOnViewport> : ''}
            </Wrapper>
        </div>
    );
}