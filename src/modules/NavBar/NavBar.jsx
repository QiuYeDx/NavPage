import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    NavWrapper, LogoWrapper, NavItem, NavList, MoreWrapper,
    Logo, LogoText, MoreList, MoreListItem, MoreListMask
} from './Styled.twin'
import 'twin.macro'
import tw from 'twin.macro';
import {useLocation, useNavigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {notify_error} from "@/hooks/toasts";
import MenuButton from "@/components/MenuButton/MenuButton";
import {log_api_config} from "@/GlobalConfig";
import SwitchButton from "@/components/Button/SwitchButton";
import ScrollToTopButton from "@/components/Button/ScrollToTopButton";
import gsap from "gsap";
import Picture from "@/components/PictureDisplay/Pictrue";
import {useMediaQuery} from "@/hooks/utilsHooks";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";
import SwitchButtonX from "@/components/Button/SwitchButtonX";
import SimpleFadeTransition from "@/styles/transition/SimpleFadeTransition";
import {debounce, throttle} from "@/utils/throttle";

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDark, setIsDark] = useState(false);
    const selfRef = useRef(null);
    const isMobile = useMediaQuery(`(max-width: ${WIDTH_MOBILE}px)`);
    const [isMoreListShown, setIsMoreListShown] = useState(false);

    const fetchData = async () => {
        try {
            await log_api_config.awaitUrlCountAPI('PUT', location.pathname);
            return 'Succeed to put url count';
        } catch (err) {
            // if (process.env.NODE_ENV === 'development')
            //     console.log(err);
            throw new Error('Failed to put url count');
        }
    };

    const changeMode = useCallback((isDarkMode) => {
        const metaToRemove = document.head.querySelector('meta[name="theme-color"]');
        if (metaToRemove) {
            // 从文档头中移除该 meta 标签
            document.head.removeChild(metaToRemove);
        }

        const metaTag = document.createElement('meta');
        metaTag.name = 'theme-color';

        let rootHTML = document.documentElement;
        if(isDarkMode){
            metaTag.content = '#000'; // 设置主题颜色为黑色
            rootHTML.classList.add('night-mode');
        }else{
            metaTag.content = '#fff'; // 设置主题颜色为白色
            rootHTML.classList.remove('night-mode');
        }
        document.head.appendChild(metaTag);
    }, []);

    // NavBar收起动效
    const gsap_ref2 = useRef(null);
    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 60) {
                if(gsap_ref2.current)
                    gsap_ref2.current.kill();
                // 向下滚动
                gsap_ref2.current = gsap.to(selfRef.current, {y: '-60px', duration: 0.8, ease: 'power2.out'});
            } else if (scrollTop < lastScrollTop - 60 || scrollTop <= 60) {
                if(gsap_ref2.current)
                    gsap_ref2.current.kill();
                // 向上滚动
                gsap_ref2.current = gsap.to(selfRef.current, {y: '0', duration: 0.3, ease: 'power2.out'});
            }
            lastScrollTop = scrollTop;
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const checkTime = () => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            // 假设晚上7点到早上7点为夜间模式
            if (currentHour >= 19 || currentHour < 7) {
                setIsDark(true);
                changeMode(true);
                sessionStorage.setItem('isDark', JSON.stringify(true));
            } else {
                setIsDark(false);
                changeMode(false);
                sessionStorage.setItem('isDark', JSON.stringify(false));
            }
        };

        if(sessionStorage.getItem('isDark')){
            const sessionIsDark = JSON.parse(sessionStorage.getItem('isDark'));
            setIsDark(sessionIsDark);
            changeMode(sessionIsDark);
        }else{
            // 检查时间并设置夜间模式
            checkTime();
        }
    }, [changeMode]);

    const gsap_ref = useRef(null);
    useEffect(() => {
        // 更新页面访问次数
        fetchData().then(r => console.log(r)).catch(e => console.warn(e));

        // CardWrapper组件依次渐入
        if (!gsap_ref.current) {
            gsap_ref.current = gsap.timeline({repeat: 0});

            // 将动画添加到时间轴中
            gsap_ref.current.set(".gsap_main_fadein", {
                y: 120,
                opacity: 0,
                duration: 0,
            });
            gsap_ref.current.to(".gsap_main_fadein", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.12,
            });
        } else {
            gsap_ref.current.kill();
            gsap_ref.current = gsap.timeline({repeat: 0});

            // 将动画添加到时间轴中
            gsap_ref.current.set(".gsap_main_fadein", {
                y: 120,
                opacity: 0,
                duration: 0,
            });
            gsap_ref.current.to(".gsap_main_fadein", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.12,
            });
        }
    }, [location.pathname]);

    return (
        <div>
            <ScrollToTopButton/>
            <MoreListMask isShow={isMoreListShown} onClick={() => setIsMoreListShown(!isMoreListShown)}/>
            {/*<BlankWrapper/>*/}
            <Toaster/>
            {/*<NavWrapper hasShadow={!isMoreListShown}>*/}
            <NavWrapper hasShadow={true} ref={selfRef}>
                <LogoWrapper onClick={() => {
                    setIsMoreListShown(false);
                    notify_error("暂未完工", "not_completed1");
                    if (location.pathname === '/')
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    else {
                        navigate("/");
                        window.scroll(0, 0);
                    }
                }}>
                    {/*{*/}
                    {/*    !isMobile &&*/}
                    {/*    <Picture*/}
                    {/*        url={'images/QiuYeDx_web.png'}*/}
                    {/*        w={'44px'}*/}
                    {/*        h={'44px'}*/}
                    {/*        ph_tw={tw`w-[22px] h-[22px]`}*/}
                    {/*        duration={'1.2s'}*/}
                    {/*        fadeStyle={'scale'}*/}
                    {/*    />*/}
                    {/*}*/}
                    <LogoText tw={"cursor-default md:cursor-pointer select-none text-blue-400 animate-fade_in_up.5"}>
                        秋夜{!isMobile && <FontAwesomeIcon icon={solid("paper-plane")} tw={'text-blue-300'}/>}导航
                    </LogoText>
                </LogoWrapper>
                <NavList
                    tw={"cursor-default select-none"}
                    onClick={() => {
                        setIsMoreListShown(false);
                    }}>
                    <NavItem to="/" onClick={() => {
                        notify_error("暂未完工", "not_completed2");
                        if (location.pathname === '/')
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        else
                            window.scroll(0, 0);
                    }}>
                        主页
                    </NavItem>
                    <NavItem to="/tools" onClick={() => {
                        // notify_error("暂未完工", "not_completed3");
                        if (location.pathname === '/tools')
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        else
                            window.scroll(0, 0);
                    }}>
                        工具
                    </NavItem>
                    <NavItem to="/resources" onClick={() => {
                        notify_error("暂未完工", "not_completed4");
                        if (location.pathname === '/resources')
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        else
                            window.scroll(0, 0);
                    }}>
                        资源
                    </NavItem>
                    <NavItem to="/about" notMobile={true} onClick={() => {
                        if (location.pathname === '/about')
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        else
                            window.scroll(0, 0);
                    }}>
                        关于
                    </NavItem>
                </NavList>
                <div
                    tw={'hidden md:block h-[60px] md:flex md:flex-col justify-center md:ml-2 xl:ml-[75px] duration-500'}>
                    {/*<SwitchButton isOn={isDark} onContent={<FontAwesomeIcon icon={solid("moon")}/>} offContent={<FontAwesomeIcon icon={solid("sun")} spin tw={'text-amber-400'}/>} offset={'20px'} fadeStyle={'slideFromBottom'} hasShadow={false} onChange={() => {*/}
                    {/*    setIsDark(!isDark);*/}
                    {/*    changeMode();*/}
                    {/*}}/>*/}
                    <SwitchButtonX
                        size={'large'}
                        duration={'300ms'}
                        isOn={isDark}
                        onColor={'blue'}
                        offColor={'amber-300'}
                        leftBackgroundIcon={<FontAwesomeIcon icon={solid("moon")}/>}
                        rightBackgroundIcon={<FontAwesomeIcon icon={solid("sun")} spin/>}
                        onChange={() => {
                            sessionStorage.setItem('isDark', JSON.stringify(!isDark));
                            setIsDark(!isDark);
                            changeMode(!isDark);
                        }}/>
                </div>
                <MoreWrapper
                    className={'group'}
                    tw={"md:hover:text-gray-300 active:text-gray-700 cursor-default md:cursor-pointer select-none"}
                    onClick={() => setIsMoreListShown(!isMoreListShown)}
                >
                    <MenuButton active={isMoreListShown} rounded={true} isRotated={true} _tw={tw`scale-110`}/>
                </MoreWrapper>
            </NavWrapper>
            <MoreList isShown={isMoreListShown} onClick={() => setIsMoreListShown(!isMoreListShown)}>
                <MoreListItem to="/about" onlyMobile={true} onClick={() => {
                    if (location.pathname === '/about')
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    else
                        window.scroll(0, 0);
                }}>
                    <span>About</span>
                    <span tw={'my-auto text-lg'}><FontAwesomeIcon icon={solid("circle-info")} tw={"pr-2"}/></span>
                </MoreListItem>
                <MoreListItem to="/dashboard" onlyMobile={false} onClick={() => {
                    if (location.pathname === '/dashboard')
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    else
                        window.scroll(0, 0);
                }}>
                    <span>Dashboard</span>
                    <span tw={'my-auto text-lg'}><FontAwesomeIcon icon={solid("gauge")} tw={"pr-2"}/></span>
                </MoreListItem>
                <MoreListItem to="https://github.com/QiuYeDx/NavPage" target="_blank">
                    <span>Star on Github</span>
                    <span tw={'my-auto text-lg'}><FontAwesomeIcon icon={faGithub} tw={"pr-2"}/></span>
                </MoreListItem>
                <div tw={'absolute top-20 right-0.5 md:hidden'}>
                    {/*开关的挂绳*/}
                    <div tw={'absolute right-[27px] bottom-2/4 h-48 bg-blue-300 w-px border border-blue-300'}>

                    </div>
                    <SwitchButton
                        _tw={tw`m-2`}
                        isOn={isDark}
                        onContent={<FontAwesomeIcon icon={solid("moon")}/>}
                        offContent={<FontAwesomeIcon icon={solid("sun")} spin tw={'text-amber-400'}/>}
                        offset={'20px'}
                        fadeStyle={'scale'}
                        onChange={() => {
                            setIsDark(!isDark);
                            changeMode(!isDark);
                        }}/>
                </div>
            </MoreList>
        </div>
    );
}