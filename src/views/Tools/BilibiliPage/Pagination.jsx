import React, {useContext, useRef, useState} from 'react';
import {ContentWrapper, LineWrapper} from "@/views/Tools/BilibiliPage/Styled.twin";
import {InLineTitle} from "@/styles/TextStyles";
import {Gap} from "@/components/Gap/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {notify_error, notify_loading, notify_success} from "@/hooks/toasts";
import {BackButton, MButton, PageButton} from "@/components/Button/Styled.twin";
import MyContext from './MyContext';
import {useClipboard} from "use-clipboard-copy";
import HoverList from "@/components/HoverList/HoverList";
import {Tooltip} from "react-tooltip";
import {downloadWithProgress, isIOS} from "@/utils/utils";
import toast from "react-hot-toast";
import tw from 'twin.macro';
import 'twin.macro';
import TextInput from "@/components/TextInputLine/TextInput";
import PopupMenu from "@/components/PopupMenu/PopupMenu";

const pageSize = 10; // 每页显示的数据数量

const Pagination = ({data}) => {
    const scroll_ref = useRef();
    const {
        finished,
        a_ref,
        downloadState,
        setDownloadState,
        iosIsDownloading,
        setIosIsDownloading
    } = useContext(MyContext);
    const clipboard = useClipboard();
    const [currentPage, setCurrentPage] = useState(1);
    // const [downloadState, setDownloadState] = useState(new Map());
    // const [iosIsDownloading, setIosIsDownloading] = useState(false);

    const showDownloadProgress = (progress, id) => {
        notify_loading(<span>正在下载视频{id}: <span style={{
            color: 'rgb(96, 165, 250)',
            width: '66px',
            display: 'inline-block',
            textAlign: 'right'
        }}>{progress}%</span></span>, 'downloading_video' + id);
    };

    const finished_callback = (id) => {
        toast.dismiss('downloading_video' + id);
        notify_success('视频' + id + '下载完毕 !', 'finished_video' + id);
    }

    // 计算总页数
    const totalPages = data ? Math.ceil(data.length / pageSize) : 0;

    // 根据当前页数获取对应的数据
    const getDataByPage = () => {
        if (!data) {
            console.log('[Error] data is null.')
            return [];
        }
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    // 生成页码列表
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <PageButton key={i} active={currentPage === i}
                                onClick={() => {
                                    setCurrentPage(i);
                                    setTimeout(() => {
                                        scroll_ref.current.scrollIntoView({behavior: 'smooth'});
                                    }, 100);
                                }}
                    >{i}</PageButton>
                );
            }
        } else {
            pageNumbers.push(
                <LineWrapper>
                    <PageButton key={currentPage}
                                active
                                onClick={() => {
                                    setTimeout(() => {
                                        scroll_ref.current.scrollIntoView({behavior: 'smooth'});
                                    }, 100);
                                }}
                    >{currentPage}</PageButton>
                    <span tw={'text-xl leading-12 text-center align-sub font-bold text-gray-500 pl-1 pr-1'}>of</span>
                    <PageButton key={'totalPages'}
                                onClick={() => {
                                    setCurrentPage(totalPages);
                                    setTimeout(() => {
                                        scroll_ref.current.scrollIntoView({behavior: 'smooth'});
                                    }, 100);
                                }}
                    >{totalPages}</PageButton>
                </LineWrapper>
            );
            pageNumbers.push(
                <PopupMenu closeClassName={'closeClassName'}
                           animate={'b.3'}
                           button={<PageButton key={'morePage'}><FontAwesomeIcon icon={solid("list-ul")}/></PageButton>}
                           menu={<HoverList closeClassName={'closeClassName'}
                                            _b={'12px'}
                                            _l={'-35px'}
                                            validText={`第 ${currentPage} 页`}
                                            list={Array.from({length: totalPages}, (_, index) => '第 ' + (index + 1) + ' 页')}
                                            onClick={(e) => {
                                                if (e.target.id.includes('pageLi_')) {
                                                    setCurrentPage(parseInt(e.target.id.slice(7), 10));
                                                    setTimeout(() => {
                                                        scroll_ref.current.scrollIntoView({behavior: 'smooth'});
                                                    }, 100);
                                                }
                                            }}
                           />}
                />
            );
        }
        return pageNumbers;
    };
    if (currentPage > totalPages)
        setCurrentPage(1);

    return (
        <div>
            <div id="dataContainer">
                <InLineTitle tw={'mt-12 relative'}>共 <span
                    tw={'text-blue-500 pl-1 pr-1 text-center'}>{data ? data.length : ' - '}</span> 个分P
                    <div ref={scroll_ref} tw={'invisible absolute -top-20'}>锚点</div>
                </InLineTitle>
                {/* 这里根据当前页码显示对应的数据 */}
                {getDataByPage().map((item, index) => (
                    <ContentWrapper key={index} tw={' mt-8'}>
                        <ContentWrapper tw={'absolute -top-5 m-0 px-6 md:px-8 py-1 left-auto right-auto min-h-0 shadow-md active:shadow-lg md:active:shadow-md md:hover:shadow-lg'}>
                            <LineWrapper>
                                <InLineTitle tw={'text-[28px]'}>
                                    P<span tw={'text-blue-500 pl-1 pr-1'}>{item.index + 1}</span>
                                </InLineTitle>
                            </LineWrapper>
                        </ContentWrapper>
                        {/*<Gap/>*/}
                        <LineWrapper>
                            <InLineTitle tw={'text-2xl font-medium flex flex-row justify-between min-w-[298px] max-w-[330px]'}>
                                <span tw={'flex flex-row justify-between w-[72px]'}><span>时</span><span>长</span></span>
                                <span tw={'text-blue-500'}>{item.durationFormat}</span>
                            </InLineTitle>
                        </LineWrapper>
                        <LineWrapper>
                            <InLineTitle tw={'text-2xl font-medium flex flex-row justify-between min-w-[298px] max-w-[330px]'}>
                                <span>原尺寸</span>
                                <span>
                                    <span tw={'text-blue-500'}>{item.width}</span>
                                    <FontAwesomeIcon icon={solid("xmark")}/>
                                    <span tw={'text-blue-500'}>{item.height}</span>
                                </span>
                            </InLineTitle>
                        </LineWrapper>
                        {/*<LineWrapper>*/}
                        {/*    <InLineTitle tw={'text-2xl font-medium flex flex-row justify-between min-w-[298px] max-w-[330px]'}>*/}
                        {/*        <span>分辨率</span>*/}
                        {/*        <span tw={'text-blue-500'}>{item.accept[0]}</span>*/}
                        {/*    </InLineTitle>*/}
                        {/*</LineWrapper>*/}
                        <LineWrapper>
                            <TextInput
                                icon={<FontAwesomeIcon icon={solid("copy")} tw={'ml-1'}/>}
                                placeholder={'无分P标题'}
                                desc={'分P视频标题'}
                                id={'input_title_sub' + index}
                                text={item.title || ''}
                                iconOnClick={() => {
                                    if (item) {
                                        clipboard.copy(item.title);
                                        notify_success('P' + (item.index + 1) + ' 视频标题Copied !', 'sub_title_' + (item.index + 1) + '_copy');
                                    } else
                                        notify_error('P' + (item.index + 1) + ' 视频标题 Copy失败 !', 'sub_title_' + (item.index + 1) + '_copy_error');
                                }}
                                data_tooltip_id={"p_title_tooltip" + index}
                                data_tooltip_content={item ? item.title : ''}
                                data_tooltip_variant={"info"}
                                readOnly
                            />
                            <Tooltip id={"p_title_tooltip" + index} place="top"
                                     tw={'bg-blue-400 max-w-xs md:max-w-lg rounded-2xl absolute z-200'}/>
                        </LineWrapper>
                        <LineWrapper tw={'mt-2'}>
                            <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:mr-6'}
                                     onClick={() => {
                                         clipboard.copy(item.url);
                                         notify_success('P' + (item.index + 1) + ' 视频URL Copied !', 'video_url_copy');
                                     }}>
                                {
                                    !finished ?
                                        <>暂无解析<FontAwesomeIcon icon={solid("copy")} fade tw={'ml-1'}/></>
                                        :
                                        <>视频URL<FontAwesomeIcon icon={solid("copy")} beat tw={'ml-1'}/></>
                                }
                            </MButton>
                            <MButton disabled={!finished || downloadState.get(item.index) || iosIsDownloading}
                                     h={'36px'} w={'140px'} tw={'rounded-full md:ml-6'}
                                     onClick={() => {
                                         if (!item)
                                             return;
                                         let a = a_ref.current;
                                         setDownloadState((downloadState) => {
                                             let newMap = new Map(downloadState);
                                             newMap.set(item.index, true);
                                             return newMap;
                                         });
                                         if (isIOS())
                                             setIosIsDownloading((iosIsDownloading) => true);
                                         downloadWithProgress(item.url, showDownloadProgress, finished_callback, item.index + 1).then(blob => {
                                             // let title = `P${item.index + 1} - ${item.title}.mp4`;
                                             // let file = new File([blob], title);
                                             // if (navigator.canShare && navigator.canShare({ files: [file] })){
                                             //     navigator.share({
                                             //         files: [file],
                                             //         title: title,
                                             //         text: title,
                                             //     }).then(r => notify_success('视频' + (item.index + 1) + '分享成功 !', 'share_video_success' + (item.index + 1)))
                                             //         .catch(e => {
                                             //             console.log(e);
                                             //             notify_error('视频' + (item.index + 1) + '分享失败 !', 'share_video_error' + (item.index + 1));
                                             //         })
                                             // }else{
                                             a.href = URL.createObjectURL(blob);
                                             a.download = 'P' + (item.index + 1) + ' - ' + item.title + '.mp4';
                                             a.click();
                                             // }
                                             let old_state = JSON.parse(decodeURIComponent(sessionStorage.getItem('bilibili_states')));
                                             let download_state = new Map(old_state.downloadStateArray);
                                             download_state.set(item.index, false);
                                             old_state.downloadStateArray = Array.from(download_state);
                                             sessionStorage.setItem('bilibili_states', encodeURIComponent(JSON.stringify(old_state)));

                                             setDownloadState((downloadState) => {
                                                 let newMap2 = new Map(downloadState);
                                                 newMap2.set(item.index, false);
                                                 return newMap2;
                                             });
                                             if (isIOS())
                                                 setIosIsDownloading((iosIsDownloading) => false);
                                         }).catch(e => {
                                             console.log(e);
                                             notify_error(`视频${item.index + 1}下载被中断，请重试 !`, 'download_video_error' + (item.index + 1));
                                             let old_state = JSON.parse(decodeURIComponent(sessionStorage.getItem('bilibili_states')));
                                             let download_state = new Map(old_state.downloadStateArray);
                                             download_state.set(item.index, false);
                                             old_state.downloadStateArray = Array.from(download_state);
                                             sessionStorage.setItem('bilibili_states', encodeURIComponent(JSON.stringify(old_state)));

                                             setDownloadState((downloadState) => {
                                                 let newMap2 = new Map(downloadState);
                                                 newMap2.set(item.index, false);
                                                 return newMap2;
                                             });
                                             if (isIOS())
                                                 setIosIsDownloading((iosIsDownloading) => false);
                                         });
                                     }}>
                                {
                                    !finished ?
                                        <>暂无解析<FontAwesomeIcon icon={solid("film")} fade tw={'ml-1'}/></>
                                        :
                                        (downloadState.get(item.index) ? <>下载中<FontAwesomeIcon icon={solid("spinner")}
                                                                                               spin
                                                                                               tw={'ml-1'}/></> : <>下载视频<FontAwesomeIcon
                                            icon={solid("download")} beat tw={'ml-1'}/></>)
                                }
                            </MButton>
                        </LineWrapper>
                    </ContentWrapper>
                ))}
            </div>
            {totalPages > 1 ?
                <LineWrapper tw={'mt-6'}>
                    <BackButton
                        content={'Last'}
                        onClick={() => {
                            if (currentPage > 1)
                                setCurrentPage(currentPage - 1);
                            setTimeout(() => {
                                scroll_ref.current.scrollIntoView({behavior: 'smooth'});
                            }, 100);
                        }}>
                        <FontAwesomeIcon icon={solid("arrow-left")} tw={'md:pr-4 align-middle relative -top-px'}/>
                    </BackButton>
                    <div id="paginationContainer">
                        <LineWrapper className="pagination">
                            {renderPageNumbers()}
                        </LineWrapper>
                    </div>
                    <BackButton
                        content_direction={'before'}
                        content={'Next'}
                        onClick={() => {
                            if (currentPage < totalPages)
                                setCurrentPage(currentPage + 1);
                            setTimeout(() => {
                                scroll_ref.current.scrollIntoView({behavior: 'smooth'});
                            }, 100);
                        }}>
                        <FontAwesomeIcon icon={solid("arrow-right")} tw={'md:pl-4 align-middle relative -top-px'}/>
                    </BackButton>
                </LineWrapper> : ''}
        </div>
    );
};

export default Pagination;
