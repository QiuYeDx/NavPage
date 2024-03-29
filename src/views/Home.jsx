import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
    WrapperMiddle, WrapperLeft,
    WrapperRight, WrapperMain
} from "@/layout/MainWrapper";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import 'twin.macro';
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faGoogle,
    faDocker,
    faFontAwesome
} from '@fortawesome/free-brands-svg-icons'
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useClipboard} from "use-clipboard-copy";
import {SearchInputLine} from "@/components/TextInputLine/Styled.twin";
import PopupMenu from "@/components/PopupMenu/PopupMenu";
import HoverList from "@/components/HoverList/HoverList";
import {useBeforeUnload} from "react-router-dom";
import axios from "axios";
import {log_api_config} from "@/GlobalConfig";
import Picture from "@/components/PictureDisplay/Pictrue";
import {decodeSearchKey, encodeSearchKey, isSafari} from "@/utils/utils";
import XList from "@/modules/XList/XList";
import gsap from "gsap";
import {
    ASSETS_URL_AList,
    ASSETS_URL_ChatGPT,
    ASSETS_URL_PicGo,
    ASSETS_URL_Twitter,
    ASSETS_URL_VSCode
} from "@/utils/assets";

export default function Home() {
    const clipboard = useClipboard();
    const a_ref = useRef(null);
    const input_ref = useRef(null);
    const search_ref = useRef(null);
    const [text, setText] = useState('');
    const [engine, setEngine] = useState('google');
    const [searchRecords, setSearchRecords] = useState([]);
    const [modified, setModified] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [topics, setTopics] = useState([]);
    const [showNumber, setShowNumber] = useState(4);
    const INCREMENT = 7;

    const hotTools = [
        {
            icon: ASSETS_URL_ChatGPT,
            itemTitle: "ChatGPT",
            itemDesc: "全球领先的AI聊天机器人",
            btnText: "打开",
            btnClick: 'https://chat.openai.com/'
        },
        {
            icon: ASSETS_URL_PicGo,
            itemTitle: "PicGo",
            itemDesc: "图片上传+管理新体验",
            btnText: "了解更多",
            btnClick: 'https://picgo.github.io/PicGo-Doc/zh/guide/'
        },
        {
            icon: ASSETS_URL_AList,
            itemTitle: "AList",
            itemDesc: "多存储文件列表程序",
            btnText: "了解更多",
            btnClick: 'https://alist.nn.ci/zh/'
        },
        {
            icon: ASSETS_URL_VSCode,
            itemTitle: "VS Code for Web",
            itemDesc: "VS Code 网页版",
            btnText: "打开",
            btnClick: 'https://vscode.dev/'
        },
        {
            icon: <FontAwesomeIcon icon={faGithub} />,
            itemTitle: "GitHub",
            itemDesc: "代码托管平台",
            btnText: "打开",
            btnClick: 'https://github.com'
        },
        {
            icon: <FontAwesomeIcon icon={faFontAwesome} />,
            itemTitle: "Font Awesome",
            itemDesc: "优质图标库和工具包",
            btnText: "打开",
            btnClick: 'https://fontawesome.com/'
        },
        // {
        //     icon: <FontAwesomeIcon icon={solid("cloud")} />,
        //     itemTitle: "阿里云",
        //     itemDesc: "国内领先的云计算服务",
        //     btnText: "了解更多",
        //     btnClick: 'https://www.aliyun.com/'
        // },
        // {
        //     icon: <FontAwesomeIcon icon={solid("database")} />,
        //     itemTitle: "MySQL",
        //     itemDesc: "流行的关系型数据库",
        //     btnText: "了解更多",
        //     btnClick: 'https://www.mysql.com/'
        // },
        // {
        //     icon: <FontAwesomeIcon icon={faDocker} />,
        //     itemTitle: "Docker",
        //     itemDesc: "应用容器化工具",
        //     btnText: "打开",
        //     btnClick: 'https://www.docker.com/'
        // },
        {
            icon: <FontAwesomeIcon icon={solid("compass-drafting")} />,
            itemTitle: "UI Tips",
            itemDesc: "学习设计更好的 UI&UX",
            btnText: "打开",
            btnClick: "https://www.uidesign.tips/"
        },
        {
            icon: <FontAwesomeIcon icon={solid("compass-drafting")} />,
            itemTitle: "UI Notes",
            itemDesc: "获取 UI 设计灵感",
            btnText: "打开",
            btnClick: "https://uinotes.com/"
        },
        {
            icon: <FontAwesomeIcon icon={solid("icons")} />,
            itemTitle: "Fav Farm",
            itemDesc: "获取 emoji svg URL",
            btnText: "打开",
            btnClick: "https://fav.farm/"
        },
        {
            icon: <FontAwesomeIcon icon={solid("laptop-code")} />,
            itemTitle: "Code Image",
            itemDesc: "为你的代码生成漂亮的图片",
            btnText: "打开",
            btnClick: 'https://ray.so/'
        },
        {
            icon: <FontAwesomeIcon icon={solid("laptop-code")} />,
            itemTitle: "Can I Use",
            itemDesc: "快速查询浏览器兼容性",
            btnText: "打开",
            btnClick: "https://caniuse.com/"
        },
        {
            icon: <FontAwesomeIcon icon={solid("compass")} />,
            itemTitle: "Web Nav",
            itemDesc: "基于 Next.js 的导航页",
            btnText: "打开",
            btnClick: "https://webnav.codefe.top/"
        }
    ];

    // const hotTools = [
    //     {icon: <FontAwesomeIcon icon={solid("layer-group")}/>, itemTitle: "工具A", itemDesc: "很好用的工具~", btnText: "获取", btnClick: 'https://qiuyedx.com'},
    //     {icon: ASSETS_URL_Twitter, itemTitle: "工具B", itemDesc: "用一下试试?", btnText: "获取", btnClick: 'https://qiuyedx.com'},
    // ];

    // const hotResources = [
        // {icon: <FontAwesomeIcon icon={solid("layer-group")}/>, itemTitle: "资源A", itemDesc: "很好的资源~", btnText: "获取", btnClick: 'https://qiuyedx.com'},
        // {icon: ASSETS_URL_Twitter, itemTitle: "资源B", itemDesc: "看一下试试?", btnText: "获取", btnClick: 'https://qiuyedx.com'},
    // ];

    const hotResources = Array.from({ length: 21 }).map(i => ({icon: <FontAwesomeIcon icon={solid("spinner")} spin={true} />, itemTitle: "即将推出", itemDesc: "敬请期待...", btnText: "获取", btnClick: () => {}}));

    const engines = {
        'google': {
            name: 'Google',
            placeholder: 'Google Search',
            url: 'https://www.google.com/search?q=',
        },
        'baidu': {
            name: '百度',
            placeholder: '百度一下',
            url: 'https://www.baidu.com/s?wd=',
        },
        'bing': {
            name: '必应',
            placeholder: '必应搜索',
            url: 'https://www.bing.com/search?q=',
        },
    }

    const handleChange = (event) => {
        setText(event.target.value);
        setModified(true);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search_ref.current.click();
            input_ref.current.focus();
        }
    }

    const handleSearch = () => {
        putSearchRecord(text);
        log_api_config.awaitCountAPI('PUT', 'homeSearch').then().catch(err => console.warn('Failed to put qrcode count'));
        let toUrl = engines[engine].url + encodeURIComponent(text);
        let a = a_ref.current;
        a.href = toUrl;
        a.target = '_blank';
        a.click();
    }

    const doSearch = (text) => {
        putSearchRecord(text);
        log_api_config.awaitCountAPI('PUT', 'homeSearch').then().catch(err => console.warn('Failed to put qrcode count'));
        let toUrl = engines[engine].url + encodeURIComponent(text);
        let a = a_ref.current;
        a.href = toUrl;
        a.target = '_blank';
        a.click();
    }

    // const handleDelete = (event) => {
    //     console.log(event);
    //     console.log(event.target.attributes);
    // }

    const handleDeleteAll = () => {
        deleteAllSearchRecord();
    }

    const handleShowMore = () => {
        setShowNumber((showNumber) => showNumber + INCREMENT);
    }

    const deleteAllSearchRecord = () => {
        localStorage.setItem('searchRecords', encodeURIComponent(encodeSearchKey(JSON.stringify([]))));
        setSearchRecords([]);
    }

    const deleteSearchRecord = (text) => {
        let tmp_state = localStorage.getItem('searchRecords') ? JSON.parse(decodeSearchKey(decodeURIComponent(localStorage.getItem('searchRecords')))) : [];
        const findIndex = tmp_state.indexOf(text);
        if (findIndex > -1) {
            tmp_state.splice(findIndex, 1);
            localStorage.setItem('searchRecords', encodeURIComponent(encodeSearchKey(JSON.stringify(tmp_state))));
            setSearchRecords(tmp_state);
        }
    }

    const putSearchRecord = (text) => {
        let tmp_state = localStorage.getItem('searchRecords') ? JSON.parse(decodeSearchKey(decodeURIComponent((localStorage.getItem('searchRecords'))))) : [];
        const findIndex = tmp_state.indexOf(text);
        if (findIndex > -1) {
            tmp_state.splice(findIndex, 1);
            tmp_state.push(text);
            localStorage.setItem('searchRecords', encodeURIComponent(encodeSearchKey(JSON.stringify(tmp_state))));
            setSearchRecords(tmp_state);
        } else {
            tmp_state.push(text);
            localStorage.setItem('searchRecords', encodeURIComponent(encodeSearchKey(JSON.stringify(tmp_state))));
            setSearchRecords(tmp_state);
        }
    }

    const fetchTopics = async () => {
        const url = 'https://api.vvhan.com/api/hotlist';
        try {
            const res = await axios.get(url, {params: {type: 'baiduRD'}});
            setTopics(res.data.data.map((v, i) => v.title));
        } catch (e) {
            setTopics(null);
            throw e;
        }
    }

    const SearchMenu = () => {
        return (<div className={'closeClassName'}
                     tw={'absolute w-full max-h-[188px] md:max-h-[296px] top-[54px] bg-white rounded-3xl shadow-xl \
                     flex flex-col justify-start items-center pb-2 px-8 overflow-auto select-none'}
        >
            {
                !(searchRecords && searchRecords.length > 0) && topics ? '' : <>
                    <div tw={'w-full'}>
                        <div tw={'sticky top-0 bg-white pt-4 z-[900]'}>
                            <div tw={'w-full text-sm text-left font-sans text-gray-400 font-bold'}>历史记录</div>
                            <div tw={'w-full border-b border-gray-200 mt-0.5 mb-1'}/>
                        </div>
                        {
                            // WebStorm识别不出toReversed() via浏览器也无法使用
                            // searchRecords.toReversed()
                            [...searchRecords].reverse()
                                .map((v, i) =>
                                    <div
                                        tw={'flex flex-row items-center my-0.5 md:hover:bg-gray-50 md:hover:cursor-pointer rounded-xl select-none'}
                                        className={'group closeClassName'} key={`record-${i}`}>
                                        <div tw={'relative h-8 w-8 -left-0.5 shrink-0'} className={'closeClassName'}>
                                            <FontAwesomeIcon icon={regular("clock")}
                                                             tw={'absolute inset-0 m-auto h-3.5 w-3.5 text-gray-500'}/>
                                        </div>
                                        <div tw={'grow text-left align-middle text-gray-600 truncate'}
                                             className={'closeClassName'} onClick={() => {
                                            setText(v);
                                            doSearch(v);
                                        }}>
                                            {v}
                                        </div>
                                        <div tw={'relative h-8 w-8 -right-0.5 shrink-0'}
                                             onClick={() => deleteSearchRecord(v)}>
                                            <FontAwesomeIcon icon={solid("xmark")}
                                                             tw={'absolute inset-0 m-auto h-3.5 w-3.5 p-1 text-gray-300 md:hover:bg-gray-200 md:hover:text-gray-400 rounded-full'}/>
                                        </div>
                                    </div>
                                )
                        }

                        <div tw={'flex flex-row justify-center items-center'}>
                            <div
                                tw={'mt-1 px-5 py-1.5 text-gray-400 text-sm rounded-full bg-gray-100 md:hover:bg-gray-200'}
                                onClick={handleDeleteAll}
                            >
                                {
                                    searchRecords.length === 0 ? '暂无历史记录' : '删除所有记录'
                                }
                            </div>
                        </div>

                    </div>
                </>
            }
            {
                (searchRecords && searchRecords.length > 0) && topics && <div tw={'h-4'}/>
            }
            {
                topics && <div tw={'w-full'}>
                    <div tw={'sticky top-0 bg-white pt-4 z-[900]'}>
                        <div tw={'w-full text-sm text-left font-sans text-gray-400 font-bold'}>热点话题</div>
                        <div tw={'w-full border-b border-gray-200 mt-0.5 mb-1'}/>
                    </div>
                    {
                        topics.length === 0 ?
                            <Picture _tw={tw`h-8 w-full`} ph_tw={tw`text-gray-300`} loadingFlag={true}/> : ''
                    }
                    {
                        topics.slice(0, showNumber > topics.length ? topics.length : showNumber).map((v, i) => <div
                            tw={'flex flex-row items-center my-0.5 md:hover:bg-gray-50 md:hover:cursor-pointer rounded-xl select-none'}
                            className={'group closeClassName'} key={`topics-${i}`}>
                            <div tw={'relative h-8 w-8 -left-0.5 shrink-0'} className={'closeClassName'}>
                                <FontAwesomeIcon
                                    icon={i < 3 ? solid("fire") : solid("magnifying-glass")}
                                    tw={'absolute inset-0 m-auto h-3.5 w-3.5 text-gray-500'}
                                />
                            </div>
                            <div tw={'grow text-left align-middle text-gray-600 truncate'} className={'closeClassName'}
                                 onClick={() => {
                                     setText(v);
                                     doSearch(v);
                                 }}>
                                {v}
                            </div>
                        </div>)
                    }
                </div>
            }
            {
                topics && showNumber <= topics.length && <div tw={'flex flex-row justify-center items-center'}>
                    <div tw={'px-5 py-1.5 mb-1 text-gray-400 text-sm rounded-full bg-gray-100 md:hover:bg-gray-200'}
                         onClick={handleShowMore}
                    >
                        更多热点话题
                    </div>
                </div>
            }
        </div>);
    }

    useBeforeUnload(() => {
        // 离开页面前保存状态
        if (!modified && !text && engine === 'google')
            return;
        sessionStorage.setItem('home_states', encodeURIComponent(encodeSearchKey(JSON.stringify({
            text,
            engine,
        }))));
    });

    useEffect(() => {
        if (!modified && !text && engine === 'google')
            return;
        sessionStorage.setItem('home_states', encodeURIComponent(encodeSearchKey(JSON.stringify({
            text,
            engine,
        }))));
    }, [text, engine]);

    useEffect(() => {
        fetchTopics().then().catch();
        if (sessionStorage.getItem('home_states')) {
            const last_states = JSON.parse(decodeSearchKey(decodeURIComponent(sessionStorage.getItem('home_states'))));
            setText(last_states.text ? last_states.text : '');
            setEngine(last_states.engine ? last_states.engine : '');
        }
        if (localStorage.getItem('searchRecords')) {
            const tmp_state = JSON.parse(decodeSearchKey(decodeURIComponent(localStorage.getItem('searchRecords'))));
            setSearchRecords(tmp_state);
        }
    }, []); // 依赖项为空数组，表示仅在组件挂载和卸载时执行一次

    const gsap_ref = useRef(null);
    useLayoutEffect(() => {
        // XListItem依次渐入
        if (!gsap_ref.current) {
            gsap_ref.current = gsap.timeline({repeat: 0});

            // 将动画添加到时间轴中
            gsap_ref.current.set(`.gsap_title`, {
                scale: 0,
                y: 120,
                opacity: 0,
                duration: 0,
            });
            gsap_ref.current.to(`.gsap_title`, {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.2,
                delay: 0.2,
            });
        } else {
            gsap_ref.current.kill();
            gsap_ref.current = gsap.timeline({repeat: 0});

            // 将动画添加到时间轴中
            gsap_ref.current.set(`.gsap_title`, {
                scale: 0,
                y: 120,
                opacity: 0,
                duration: 0,
            });
            gsap_ref.current.to(`.gsap_title`, {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.12,
                delay: 0.2,
            });
        }
    }, []);

    const gsap_ref2 = useRef(null);
    useLayoutEffect(() => {
        // 创建一个新的 GSAP timeline，重复无限次
        gsap_ref2.current = gsap.timeline({repeat: -1, repeatDelay: 3});

        const elements = document.querySelectorAll('.gsap_letter');

        elements.forEach((element) => {
            const tl = gsap.timeline({repeat: 0}) // 创建每个元素的timeline，不重复，但是整体timeline会无限重复
                .to(element, {
                    y: -15,
                    opacity: 0.5,
                    duration: 0.5,
                    ease: 'back.out(4)', // 修改ease，之前的'ease.out(4)'是不正确的格式
                })
                .to(element, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'back.out(4)', // 保持相同的ease效果
                    delay: -0.2,
                });

            // 将每个元素的timeline添加到主timeline中
            gsap_ref2.current.add(tl, '-=0.72'); // 用负偏移时间来使动画更紧凑地连接
            // 减慢整个动画的播放速率
            gsap_ref2.current.timeScale(0.8);
        });
    }, []);

    return (
        <Wrapper>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain tw={'flex justify-start overflow-hidden md:overflow-visible'}>

                    <div tw={'flex flex-col px-4 items-center mt-4 mb-1 select-none'}>
                        <div className={'gsap_title'} tw={'text-2xl font-bold text-blue-300 my-1 tracking-widest'}>
                            欢迎使用
                        </div>
                        <div aria-checked={!isSafari()} className={'gsap_title'}
                             tw={'text-7xl md:text-8xl font-extrabold mt-1 aria-checked:drop-shadow-md'}>
                            <div tw={'flex tracking-widest leading-[104px]'}>
                                <div
                                    tw={'bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-400'}
                                    key={'t1'} className={'gsap_letter'}>次
                                </div>
                                <div
                                    tw={'bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400'}
                                    key={'t2'} className={'gsap_letter'}>元
                                </div>
                                <div
                                    tw={'bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-400'}
                                    key={'t3'} className={'gsap_letter'}>导
                                </div>
                                <div
                                    tw={'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500'}
                                    key={'t4'} className={'gsap_letter'}>航
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*主搜索栏*/}
                    <div tw={'h-20 mx-4 md:mx-16 flex flex-col grow-0 justify-center items-center px-0 z-[700]'}
                        // className={'group gsap_main_fadein'}
                         className={'gsap_title'}
                    >
                        <div
                            tw={'relative flex flex-row transition-shadow shadow-md md:hover:shadow-lg aria-pressed:shadow-lg rounded-full bg-white max-w-3xl w-full'}
                            aria-pressed={isFocused}
                        >
                            {/* 左icon */}
                            <PopupMenu
                                _tw={tw`z-[800]`}
                                closeClassName={'closeClassName'}
                                animate={'t.3'}
                                button={<div
                                    tw={'absolute left-0 top-0 my-1 ml-1.5 mr-2.5 h-10 w-10 rounded-full active:bg-blue-50 md:hover:bg-blue-50 md:active:bg-blue-100 md:hover:cursor-pointer transition-colors'}>
                                    <FontAwesomeIcon icon={engine === 'google' ? faGoogle : solid("chevron-down")}
                                                     aria-pressed={isFocused}
                                                     shake={engine === 'google' && isFocused}
                                                     tw={'absolute inset-0 m-auto h-5 w-5 transition-colors transition-transform text-blue-300 aria-pressed:-rotate-90'}/>
                                </div>}
                                menu={<HoverList
                                    closeClassName={'closeClassName'}
                                    _t={'54px'}
                                    validText={engines[engine].name}
                                    list={Object.keys(engines).map((key, index) => engines[key].name)}
                                    onClick={(e) => {
                                        if (e.target.id.includes('pageLi_')) {
                                            const index = e.target.id.slice(7);
                                            setEngine(Object.keys(engines)[index - 1]);
                                        }
                                        input_ref.current.click();
                                        input_ref.current.focus();
                                        setModified(true);
                                    }}
                                />}
                            />

                            {/* 输入框 + 悬浮框 */}
                            <PopupMenu
                                switchBaned={true}
                                _tw={tw`grow z-[650]`}
                                closeClassName={'closeClassName'}
                                animate={'t_Y.3'}
                                button={<SearchInputLine
                                    ref={input_ref}
                                    value={text}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onKeyPress={handleKeyPress}
                                    placeholder={engines[engine].placeholder}
                                />}
                                menu={SearchMenu()} // 换成<SearchMenu/>会出现意外表现
                            />

                            <a tw={'hidden'} ref={a_ref}/>

                            {/* 右icon */}
                            <div
                                tw={'absolute right-0 top-0 z-[800] my-1 ml-2.5 mr-1.5 h-10 w-10 rounded-full active:bg-blue-50 md:hover:bg-blue-50 md:active:bg-blue-100 md:hover:cursor-pointer transition-colors'}
                                ref={search_ref}
                                onClick={handleSearch}
                            >
                                <FontAwesomeIcon icon={solid("magnifying-glass")}
                                                 aria-pressed={isFocused}
                                                 tw={'absolute inset-0 m-auto h-5 w-5 transition-colors text-blue-300'}/>
                            </div>
                        </div>

                    </div>

                    <div tw={'grid grid-cols-4 grow-0 shrink'}>
                        <div tw={'col-span-4 h-4'}>

                        </div>
                        <XList title={'站长推荐'} gsapClass={'hot_tool'} offset={240}
                               dataSource={hotTools}
                               icon={<FontAwesomeIcon icon={solid("screwdriver-wrench")}/>}
                        />

                        <div tw={'col-span-4 h-4'}>

                        </div>
                        <XList title={'热门资源'} gsapClass={'hot_res'} offset={240}
                               dataSource={hotResources}
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