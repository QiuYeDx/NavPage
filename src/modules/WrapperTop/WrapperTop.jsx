import React, {useEffect, useState} from 'react';
import tw from "twin.macro";
import "twin.macro";
import {NavHome, NavItem, NavWrapper, WrapperTopStyled, GapIcon, FadeInRight} from "@/modules/WrapperTop/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useLocation, useNavigate} from "react-router-dom";
import {randomNum} from "@/utils/utils";

export default function WrapperTop() {
    const navigate = useNavigate();
    const location = useLocation();
    let [navs, setNavs] = useState(location.pathname.split("/"));
    let [flag, setFlag] = useState(randomNum());
    const nav_hash = {
        '': {to: '/', name: '主页'},
        'tools': {to: '/tools', name: '工具'},
        'resources': {to: '/resources', name: '资源'},
        'about': {to: '/about', name: '关于'},
        'bilibili': {to: '/tools/bilibili', name: 'bilibili视频解析'},
        'tiktok': {to: '/tools/tiktok', name: 'tiktok视频解析'},
        'QRPage': {to: '/tools/QRPage', name: '二维码生成器'},
    };
    useEffect(() => {
        let arr = location.pathname.split("/");
        setNavs([...new Set(arr)]);
        setFlag(randomNum());
    }, [location]);
    return (
        <WrapperTopStyled>
            <NavWrapper>
                <NavHome onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={solid("house")} size={'lg'}/>
                </NavHome>
                {navs.map((item, index) => {
                    if(nav_hash[item])
                        return <>
                            <NavItem z_index={99 - index} key={index} className={flag} onClick={() => navigate(nav_hash[item].to)}>
                                <FadeInRight>{nav_hash[item].name || ''}</FadeInRight>
                            </NavItem>
                            {index === navs.length - 1 ? '' : <GapIcon>
                                <FontAwesomeIcon icon={solid("angle-right")} />
                            </GapIcon>}
                        </>;
                    else
                        return '';
                })}
                <NavItem z_index={10} key={'endGap'}>
                </NavItem>
            </NavWrapper>
        </WrapperTopStyled>
    );
}