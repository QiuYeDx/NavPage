import React, {useState} from 'react';
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

export default function Home() {
    const clipboard = useClipboard();
    const [text, setText] = useState('');
    const [engine, setEngine] = useState('google');
    const [isFocused, setIsFocused] = useState(false);

    const placeholders = {
        'google': 'Google Search',
        'baidu': '百度一下',
        'bing': '必应搜索',
    }

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    // const handleKeyPress = (event) => {
    //     if (event.key === 'Enter') {
    //         button_ref.current.click();
    //         button_ref.current.focus();
    //     }
    // }

    return (
        <Wrapper>
            <WrapperTop>

            </WrapperTop>
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                <WrapperMain tw={'flex justify-start'}>

                    <div tw={'h-32 mx-4 md:mx-16 flex flex-col justify-center items-center px-0'}
                         className={'group gsap_main_fadein'}
                    >
                        <div tw={'relative flex flex-row transition-shadow shadow-md md:hover:shadow-lg aria-pressed:shadow-lg shadow-slate-200 rounded-full bg-white max-w-3xl w-full'}
                             aria-pressed={isFocused}
                        >
                            <div tw={'absolute left-0 top-0 h-12 w-12 rounded-full'}>
                                <FontAwesomeIcon icon={faGoogle}
                                                 aria-pressed={isFocused}
                                                 shake={isFocused}
                                                 tw={'absolute inset-0 m-auto h-5 w-5 transition-colors text-blue-300'}/>
                            </div>
                            <SearchInputLine
                                value={text}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder={placeholders[engine]}
                                tw={'grow'}
                            />
                            <div tw={'absolute right-0 top-0 my-1 ml-2.5 mr-1.5 h-10 w-10 rounded-full active:bg-blue-50 md:hover:bg-blue-50 md:active:bg-blue-100 md:hover:cursor-pointer transition-colors'}>
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