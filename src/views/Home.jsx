import React, {useEffect, useRef, useState} from 'react';
import {
    WrapperMiddle, WrapperLeft,
    WrapperRight, WrapperMain
} from "@/layout/MainWrapper";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import 'twin.macro';
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple, faGithub, faTwitter, faWordpress, faGoogle, faQq} from '@fortawesome/free-brands-svg-icons'
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {notify_error, notify_success} from "@/hooks/toasts";
import {useClipboard} from "use-clipboard-copy";
import {H1, P} from "@/styles/TextStyles";
import {ErrorWrapper} from "@/views/Error/Styled.twin";
import {SearchInputLine} from "@/components/TextInputLine/Styled.twin";
import PopupMenu from "@/components/PopupMenu/PopupMenu";
import HoverList from "@/components/HoverList/HoverList";
import {useBeforeUnload} from "react-router-dom";

export default function Home() {
    const clipboard = useClipboard();
    const a_ref = useRef(null);
    const input_ref = useRef(null);
    const search_ref = useRef(null);
    const [text, setText] = useState('');
    const [engine, setEngine] = useState('google');
    const [modified, setModified] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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
        let toUrl = engines[engine].url + encodeURIComponent(text);
        let a = a_ref.current;
        a.href = toUrl;
        a.target = '_blank';
        a.click();
    }

    useBeforeUnload(() => {
        // 离开页面前保存状态
        if(!modified && !text && engine === 'google')
            return;
        sessionStorage.setItem('home_states', (JSON.stringify({
            text,
            engine,
        })));
    });

    useEffect(() => {
        if(!modified && !text && engine === 'google')
            return;
        sessionStorage.setItem('home_states', (JSON.stringify({
            text,
            engine,
        })));
    }, [text, engine]);

    useEffect(() => {
        if(sessionStorage.getItem('home_states')){
            const last_states = JSON.parse((sessionStorage.getItem('home_states')));
            setText(last_states.text ? last_states.text : '');
            setEngine(last_states.engine ? last_states.engine : '');
        }
    }, []); // 依赖项为空数组，表示仅在组件挂载和卸载时执行一次

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain tw={'flex justify-start'}>

                    {/*主搜索栏*/}
                    <div tw={'h-20 mx-4 md:mx-16 flex flex-col grow-0 justify-center items-center px-0 z-[700]'}
                         className={'group gsap_main_fadein'}
                    >
                        <div tw={'relative flex flex-row transition-shadow shadow-md md:hover:shadow-lg aria-pressed:shadow-lg shadow-slate-200 md:hover:shadow-slate-200 aria-pressed:shadow-slate-200 rounded-full bg-white max-w-3xl w-full'}
                             aria-pressed={isFocused}
                        >
                            <PopupMenu
                                closeClassName={'closeClassName'}
                                animate={'t.3'}
                                button={<div tw={'absolute left-0 top-0 my-1 ml-1.5 mr-2.5 h-10 w-10 rounded-full active:bg-blue-50 md:hover:bg-blue-50 md:active:bg-blue-100 md:hover:cursor-pointer transition-colors'}>
                                    <FontAwesomeIcon icon={engine === 'google' ? faGoogle : solid("chevron-down")}
                                                     aria-pressed={isFocused}
                                                     shake={engine === 'google' && isFocused}
                                                     tw={'absolute inset-0 m-auto h-5 w-5 transition-colors transition-transform text-blue-300 aria-pressed:-rotate-90'}/>
                                </div>}
                                menu={<HoverList
                                    closeClassName={'closeClassName'}
                                    _t={'50px'}
                                    validText={engines[engine].name}
                                    list={Object.keys(engines).map((key, index) => engines[key].name)}
                                    onClick={(e) => {
                                        if (e.target.id.includes('pageLi_')) {
                                            const index = e.target.id.slice(7);
                                            setEngine(Object.keys(engines)[index - 1]);
                                        }
                                        input_ref.current.focus();
                                        setModified(true);
                                    }}
                                />}
                            />
                            <SearchInputLine
                                ref={input_ref}
                                value={text}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onKeyPress={handleKeyPress}
                                placeholder={engines[engine].placeholder}
                                tw={'grow'}
                            />
                            <a tw={'hidden'} ref={a_ref}/>
                            <div tw={'absolute right-0 top-0 my-1 ml-2.5 mr-1.5 h-10 w-10 rounded-full active:bg-blue-50 md:hover:bg-blue-50 md:active:bg-blue-100 md:hover:cursor-pointer transition-colors'}
                                 ref={search_ref}
                                 onClick={handleSearch}
                            >
                                <FontAwesomeIcon icon={solid("magnifying-glass")}
                                                 aria-pressed={isFocused}
                                                 tw={'absolute inset-0 m-auto h-5 w-5 transition-colors text-blue-300'}/>
                            </div>
                        </div>
                    </div>

                    <ErrorWrapper tw={'col-span-4 h-80 flex flex-col gap-4 pt-8 mt-4 mx-4 md:mx-16 px-0'}
                                  className={'gsap_main_fadein'}
                    >
                        <FontAwesomeIcon icon={solid("truck-ramp-box")} fade size="10x" color={"rgb(255,242,241)"}/>
                        <H1 color={"rgb(255,242,241)"}>主页建设中</H1>
                        <P tw={'text-lg'} color={"rgb(255,242,241)"}>晚些时候再来吧 <FontAwesomeIcon
                            icon={solid("face-sad-tear")}/></P>
                    </ErrorWrapper>

                </WrapperMain>
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </Wrapper>
    );
}