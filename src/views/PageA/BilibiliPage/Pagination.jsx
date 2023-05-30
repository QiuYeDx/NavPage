import React, {useContext, useRef, useState} from 'react';
import {ContentWrapper, LineWrapper} from "@/views/PageA/BilibiliPage/Styled.twin";
import {InLineTitle} from "@/styles/TextStyles";
import {Gap} from "@/components/Gap/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {TextInputLine} from "@/components/TextInputLine/Styled.twin";
import {notify_error, notify_success} from "@/hooks/toasts";
import {BackButton, MButton, PageButton} from "@/components/Button/Styled.twin";
import MyContext from './MyContext';
import tw from "twin.macro";
import {useClipboard} from "use-clipboard-copy";
import HoverList from "@/components/HoverList/HoverList";
import {Tooltip} from "react-tooltip";

const pageSize = 10; // 每页显示的数据数量

const Pagination = ({data}) => {
    const scroll_ref = useRef();
    const {finished, a_ref} = useContext(MyContext);
    const clipboard = useClipboard();
    const [currentPage, setCurrentPage] = useState(1);
    const [isHidden, setIsHidden] = useState(true);

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

    // 处理页码点击事件
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 生成页码列表
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages < 3) {
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
                <PageButton key={'morePage'} onClick={() => {
                    setIsHidden(!isHidden);
                }}>
                    <FontAwesomeIcon icon={solid("list-ul")}/>
                    <HoverList isHidden={isHidden}
                               list={Array.from({length: totalPages}, (_, index) => '第 ' + (index + 1) + ' 页')}
                               onClick={(e) => {
                                   console.log(e.target);
                                   console.log(e.target.id);
                                   console.log(e.target.id.includes('pageLi_'));
                                   if (e.target.id.includes('pageLi_')) {
                                       setCurrentPage(parseInt(e.target.id.slice(7), 10));
                                       setTimeout(() => {
                                           scroll_ref.current.scrollIntoView({behavior: 'smooth'});
                                       }, 100);
                                   }
                               }}/>
                </PageButton>
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
                    <ContentWrapper key={index}>
                        <LineWrapper>
                            <InLineTitle>
                                P<span tw={'text-blue-500 pl-1 pr-1'}>{item.index + 1}</span>
                            </InLineTitle>
                        </LineWrapper>
                        <Gap/>
                        <LineWrapper>
                            <InLineTitle tw={'text-2xl font-medium'}>
                                时长 <span tw={'text-blue-500'}>{item.durationFormat}</span>
                            </InLineTitle>
                        </LineWrapper>
                        <LineWrapper>
                            <InLineTitle tw={'text-2xl font-medium'}>
                                尺寸 <span tw={'text-blue-500'}>{item.width}</span>
                                <FontAwesomeIcon icon={solid("xmark")}/>
                                <span tw={'text-blue-500'}>{item.height}</span>
                            </InLineTitle>
                        </LineWrapper>
                        <LineWrapper>
                            <InLineTitle fontSize={28} lineHeight={40}
                                         tw={'text-gray-600 font-medium -mr-2 -ml-2 text-right'}>
                                标题
                            </InLineTitle>
                            <TextInputLine
                                placeholder={'分P标题'} maxLength={2000} value={item.title || ''}
                                readOnly
                                data-tooltip-id="desc_tooltip"
                                data-tooltip-content={item ? item.title : '分P标题'}
                                data-tooltip-variant="info"
                            />
                            <InLineTitle
                                fontSize={28} lineHeight={40}
                                tw={'text-gray-600 font-light -mr-2 -ml-2 md:hover:text-blue-500 active:text-blue-500 md:active:text-blue-300 text-left'}
                                onClick={() => {
                                    if (item) {
                                        clipboard.copy(item.title);
                                        notify_success('P' + (index + 1) + ' 视频标题Copied !', 'sub_title_' + (index + 1) + '_copy');
                                    } else
                                        notify_error('P' + (index + 1) + ' 视频标题 Copy失败 !', 'sub_title_' + (index + 1) + '_copy_error');
                                }}
                            >
                                <FontAwesomeIcon icon={solid("copy")} tw={'ml-1'}/>
                            </InLineTitle>
                            <Tooltip id="p_title_tooltip" place="bottom" tw={'bg-blue-400 max-w-xs md:max-w-lg'}/>
                        </LineWrapper>
                        <LineWrapper tw={'mt-4'}>
                            <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:mr-6'}
                                     onClick={() => {
                                         clipboard.copy(item.url);
                                         notify_success('P' + (index + 1) + ' 视频URL Copied !', 'video_url_copy');
                                     }}>
                                {
                                    !finished ?
                                        <>暂无解析<FontAwesomeIcon icon={solid("copy")} flip tw={'ml-1'}/></>
                                        :
                                        <>拷贝视频URL<FontAwesomeIcon icon={solid("copy")} beat tw={'ml-1'}/></>
                                }
                            </MButton>
                            <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full md:ml-6'}
                                     onClick={() => {
                                         if (!item)
                                             return;
                                         let a = a_ref.current;
                                         a.href = item.url;
                                         a.click();
                                     }}>
                                {
                                    !finished ?
                                        <>暂无解析<FontAwesomeIcon icon={solid("film")} flip tw={'ml-1'}/></>
                                        :
                                        <>下载视频<FontAwesomeIcon icon={solid("download")} beat tw={'ml-1'}/></>
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
