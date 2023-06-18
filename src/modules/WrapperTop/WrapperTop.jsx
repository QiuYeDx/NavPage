import React, {useEffect, useState} from 'react';
import tw from "twin.macro";
import "twin.macro";
import {NavHome, NavItem, NavWrapper, WrapperTopStyled, GapIcon, FadeInRight} from "@/modules/WrapperTop/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useLocation} from "react-router-dom";
import {randomNum} from "@/utils/utils";

export default function WrapperTop() {
    const location = useLocation();
    let [navs, setNavs] = useState(location.pathname.split("/"));
    let [flag, setFlag] = useState(randomNum());
    const nav_hash = {
        '': '主页',
        'tools': '工具',
        'resources': '资源',
        'about': '关于',
        'bilibili': 'bilibili视频解析',
        'tiktok': 'tiktok视频解析',
        'QRPage': '二维码生成器',
    };
    useEffect(() => {
        let arr = location.pathname.split("/");
        setNavs([...new Set(arr)]);
        setFlag(randomNum());
    }, [location]);
    return (
        <WrapperTopStyled>
            <NavWrapper>
                <NavHome>
                    <FontAwesomeIcon icon={solid("house")} size={'lg'}/>
                </NavHome>
                {navs.map((item, index) => {
                    if(nav_hash[item])
                        return <>
                            <NavItem z_index={99 - index} key={index} className={flag}>
                                <FadeInRight>{nav_hash[item] || ''}</FadeInRight>
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