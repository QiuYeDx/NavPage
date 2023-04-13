import React, {useRef, useState} from 'react';
import {
    NavWrapper, LogoWrapper, NavItem, NavList, MoreWrapper,
    Logo, LogoText, MoreList, MoreListItem, BlankWrapper
} from './Styled.twin'
import 'twin.macro'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function NavBar(){
    const navigate = useNavigate();
    const [isMoreListShown, setIsMoreListShown] = useState(false);
    const notify = () => toast.error(
        (t) => (
            <span tw={"align-bottom animate-fade_in.8"}>
                <b>Not yet completed !</b>
                {/*<button onClick={() => toast.dismiss(t.id)} tw={"pl-1 pr-1 ml-2 border-2 border-blue-200 text-blue-400 text-sm rounded-lg align-bottom"}>*/}
                {/*    /!*<FontAwesomeIcon icon={solid("xmark")}  />*!/*/}
                {/*    Get it*/}
                {/*</button>*/}
            </span>
        ),
        {
        // id: 'no_more',
        duration: 3000,
        position: 'bottom-right',
        // position: 'top-center',

        // Styling
        style: {
            // position: 'relative',
            // top: '60px'
        },
        className: '',

        // Custom Icon
        // icon: '👏',
        // icon: <FontAwesomeIcon icon={solid("circle-xmark")} />,

        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#ed5563',
            secondary: '#fff',
        },

        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });

    return (
        <div>
            <BlankWrapper/>
            <Toaster/>
            {/*<NavWrapper hasShadow={!isMoreListShown}>*/}
            <NavWrapper hasShadow={true}>
                <LogoWrapper onClick={() => {
                    setIsMoreListShown(false);
                    // notify();
                    navigate("/");
                }} >
                    <Logo/>
                    <LogoText>
                        秋夜导航站
                    </LogoText>
                </LogoWrapper>
                <NavList onClick={() => setIsMoreListShown(false)}>
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
                {/*<MoreWrapper onClick={notify}>*/}
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