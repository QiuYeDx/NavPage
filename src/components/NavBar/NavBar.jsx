import React, {useEffect, useRef, useState} from 'react';
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

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMoreListShown, setIsMoreListShown] = useState(false);

    const fetchData = async () => {
        try {
            await log_api_config.awaitUrlCountAPI('PUT', location.pathname);
            return 'Succeed to put url count';
        } catch (err) {
            // if (process.env.NODE_ENV === 'development')
            //     console.log(err);
            throw 'Failed to put url count';
        }
    };

    const changeMode = () => {
        const metaToRemove = document.head.querySelector('meta[name="theme-color"]');
        if (metaToRemove) {
            // 从文档头中移除该 meta 标签
            document.head.removeChild(metaToRemove);
        }

        const metaTag = document.createElement('meta');
        metaTag.name = 'theme-color';

        let rootHTML = document.documentElement;
        if (rootHTML.classList.contains('night-mode')) {
            metaTag.content = '#fff'; // 设置主题颜色为白色
            rootHTML.classList.remove('night-mode');
        } else {
            metaTag.content = '#000'; // 设置主题颜色为黑色
            rootHTML.classList.add('night-mode');
        }
        // 将 meta 标签添加到文档头部
        document.head.appendChild(metaTag);
    };

    const gsap_ref = useRef(null);
    const gsap_ref2 = useRef(null);
    useEffect(() => {
        // 更新页面访问次数
        fetchData().then(r => console.log(r)).catch(e => console.log(e));

        // CardWrapper组件依次渐入
        if(!gsap_ref.current){
            gsap_ref.current = gsap.timeline({ repeat: 0});

            // 将动画添加到时间轴中
            gsap_ref.current.set(".gsap_main_fadein", {
                y: 120,
                opacity: 0,
                duration: 0,
            });
            gsap_ref.current.to(".gsap_main_fadein", {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.1,
            });
        }else{
            gsap_ref.current.kill();
            gsap_ref.current = gsap.timeline({ repeat: 0});

            // 将动画添加到时间轴中
            gsap_ref.current.set(".gsap_main_fadein", {
                y: 120,
                opacity: 0,
                duration: 0,
            });
            gsap_ref.current.to(".gsap_main_fadein", {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.1,
            });
        }

        // 面包屑相关动画
        if(!gsap_ref2.current){
            gsap_ref2.current = gsap.timeline({ repeat: 0});
            // 将动画添加到时间轴中
            gsap_ref2.current.fromTo(".gsap_nav_expand", {
                opacity: 0,
                duration: 0,
            }, {
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                // stagger: 0.1,
            });
        }else{
            gsap_ref2.current.kill();
            gsap_ref2.current = gsap.timeline({ repeat: 0});
            // 将动画添加到时间轴中
            gsap_ref2.current.fromTo(".gsap_nav_expand", {
                opacity: 0,
                duration: 0,
            }, {
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                // stagger: 0.1,
            });
        }
    }, [location]);

    return (
        <div>
            <ScrollToTopButton/>
            <MoreListMask isShow={isMoreListShown} onClick={() => setIsMoreListShown(!isMoreListShown)}/>
            {/*<BlankWrapper/>*/}
            <Toaster/>
            {/*<NavWrapper hasShadow={!isMoreListShown}>*/}
            <NavWrapper hasShadow={true}>
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
                    <Logo/>
                    <LogoText tw={"cursor-default md:cursor-pointer select-none text-blue-400"}>
                        秋夜<FontAwesomeIcon icon={solid("gear")} spin tw={'text-blue-300'}/>导航
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
                <div tw={'hidden md:block h-[60px] md:flex md:flex-col justify-center md:ml-2 xl:ml-[140px] duration-500'}>
                    <SwitchButton hasShadow={false} onChange={changeMode}/>
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
                        onChange={changeMode}/>
                </div>
            </MoreList>
        </div>
    );
}