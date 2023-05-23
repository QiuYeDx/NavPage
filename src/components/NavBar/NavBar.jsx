import React, {useState} from 'react';
import {
    NavWrapper, LogoWrapper, NavItem, NavList, MoreWrapper,
    Logo, LogoText, MoreList, MoreListItem, BlankWrapper, MoreListMask
} from './Styled.twin'
import 'twin.macro'
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { notify_error } from "@/hooks/toasts";

export default function NavBar(){
    const navigate = useNavigate();
    const [isMoreListShown, setIsMoreListShown] = useState(false);

    return (
        <div>
            <MoreListMask isShow={isMoreListShown} onClick={() => setIsMoreListShown(!isMoreListShown)}/>
            <BlankWrapper/>
            <Toaster/>
            {/*<NavWrapper hasShadow={!isMoreListShown}>*/}
            <NavWrapper hasShadow={true}>
                <LogoWrapper onClick={() => {
                    setIsMoreListShown(false);
                    notify_error("Not yet completed !", "not_completed");
                    navigate("/");
                }} >
                    <Logo/>
                    <LogoText tw={"cursor-pointer select-none"}>
                        秋夜导航站
                    </LogoText>
                </LogoWrapper>
                <NavList
                    tw={"cursor-pointer select-none"}
                    onClick={() => {
                        setIsMoreListShown(false);
                }}>
                    <NavItem to="/" onClick={() => {
                        notify_error("Not yet completed !", "not_completed");
                        window.scroll(0, 0);
                    }}>
                        主页
                    </NavItem>
                    <NavItem to="/tools" onClick={() => {
                        notify_error("Not yet completed !", "not_completed");
                        window.scroll(0, 0);
                    }}>
                        工具
                    </NavItem>
                    <NavItem to="/resources" onClick={() => {
                        notify_error("Not yet completed !", "not_completed");
                        window.scroll(0, 0);
                    }}>
                        资源
                    </NavItem>
                    <NavItem to="/about" notMobile={true} onClick={() => {
                        window.scroll(0, 0);
                    }}>
                        关于
                    </NavItem>
                </NavList>
                <MoreWrapper
                    tw={"md:hover:text-gray-300 active:text-gray-700 cursor-pointer select-none"}
                    onClick={() => setIsMoreListShown(!isMoreListShown)}
                >
                    {isMoreListShown ?
                        <FontAwesomeIcon icon={solid("bars")} flip size={'lg'} />
                        :
                        <FontAwesomeIcon icon={solid("bars")} size={'lg'} />
                    }
                </MoreWrapper>
            </NavWrapper>
            <MoreList isShown={isMoreListShown} onClick={() => setIsMoreListShown(!isMoreListShown)}>
                <MoreListItem to="/about" onlyMobile={true} onClick={() => {
                    window.scroll(0, 0);
                }}>
                    <FontAwesomeIcon icon={solid("circle-info")} tw={"pr-2"}/>
                    About
                </MoreListItem>
                <MoreListItem to="https://github.com/QiuYeDx/NavPage" target="_blank">
                    <FontAwesomeIcon icon={faGithub} tw={"pr-2"}/>
                    Star on Github
                </MoreListItem>
            </MoreList>
        </div>
    );
}