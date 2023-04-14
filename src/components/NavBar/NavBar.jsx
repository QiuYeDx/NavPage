import React, {useRef, useState} from 'react';
import {
    NavWrapper, LogoWrapper, NavItem, NavList, MoreWrapper,
    Logo, LogoText, MoreList, MoreListItem, BlankWrapper
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
                    <LogoText>
                        秋夜导航站
                    </LogoText>
                </LogoWrapper>
                <NavList onClick={() => {
                    setIsMoreListShown(false);
                    notify_error("Not yet completed !", "not_completed");
                }}>
                    <NavItem to="/">
                        主页
                    </NavItem>
                    <NavItem to="/tools">
                        工具
                    </NavItem>
                    <NavItem to="/resources">
                        资源
                    </NavItem>
                    <NavItem to="/about" notMobile={true}>
                        关于
                    </NavItem>
                </NavList>
                <MoreWrapper onClick={() => setIsMoreListShown(!isMoreListShown)}>

                </MoreWrapper>
            </NavWrapper>
            <MoreList isShown={isMoreListShown} onClick={() => setIsMoreListShown(!isMoreListShown)}>
                <MoreListItem to="/about" onlyMobile={true}>
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