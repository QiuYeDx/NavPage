import React from 'react';
import {
    NavWrapper, LogoWrapper, NavItem, NavList, MoreWrapper,
    Logo, LogoText
} from './Styled.twin'
import { useNavigate } from 'react-router-dom';

export default function NavBar(){
    const navigate = useNavigate();
    return (
        <NavWrapper>
            <LogoWrapper onClick={() => {navigate("/")}}>
                <Logo/>
                <LogoText>
                    秋夜导航站
                </LogoText>
            </LogoWrapper>
            <NavList>
                <NavItem to="/">
                    主页
                </NavItem>
                <NavItem to="/tools">
                    工具
                </NavItem>
                <NavItem to="/resources" >
                    资源
                </NavItem>
                <NavItem to="/about" screen={"mobile"}>
                    关于
                </NavItem>
            </NavList>
            <MoreWrapper>

            </MoreWrapper>
        </NavWrapper>
    );
}