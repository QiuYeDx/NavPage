import React, {useEffect, useState} from 'react';
import {
    NavWrapper, LogoWrapper, NavItem, NavList, MoreWrapper,
    Logo, LogoText, MoreList, MoreListItem, MoreListMask
} from './Styled.twin'
import 'twin.macro'
import tw from 'twin.macro';
import {useLocation, useNavigate} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { notify_error } from "@/hooks/toasts";
import MenuButton from "@/components/MenuButton/MenuButton";
import axios from "axios";
import {log_api_config} from "@/GlobalConfig";

export default function NavBar(){
    const navigate = useNavigate();
    const location = useLocation();
    const [isMoreListShown, setIsMoreListShown] = useState(false);

    useEffect(() => {
        // 更新页面访问次数
        axios.put(log_api_config.url.url_counts, {
            domain: log_api_config.domain,
            url: location.pathname
        })
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            });

        // axios.get(log_api_config.url.logs, {
        //     params: {
        //         n_per_page: 10,
        //         p_index: 1,
        //         api_key: log_api_config.api_key
        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
    }, [location]);

    return (
        <div>
            <MoreListMask isShow={isMoreListShown} onClick={() => setIsMoreListShown(!isMoreListShown)}/>
            {/*<BlankWrapper/>*/}
            <Toaster/>
            {/*<NavWrapper hasShadow={!isMoreListShown}>*/}
            <NavWrapper hasShadow={true}>
                <LogoWrapper onClick={() => {
                    setIsMoreListShown(false);
                    notify_error("暂未完工", "not_completed1");
                    if(location.pathname === '/')
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    else{
                        navigate("/");
                        window.scroll(0, 0);
                    }
                }} >
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
                        if(location.pathname === '/')
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
                        if(location.pathname === '/tools')
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
                        if(location.pathname === '/resources')
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
                        if(location.pathname === '/about')
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
                    if(location.pathname === '/about')
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
                    if(location.pathname === '/dashboard')
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
            </MoreList>
        </div>
    );
}