import React, {useEffect, useRef, useState} from 'react';
import tw from "twin.macro";
import "twin.macro";
import {NavHome, NavItem, NavWrapper, WrapperTopStyled, GapIcon, FadeInRight} from "@/modules/WrapperTop/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useLocation, useNavigate} from "react-router-dom";
// import {randomNum} from "@/utils/utils";
import {removeAdjacentDuplicates} from "@/utils/utils";
import gsap from "gsap";

export default function WrapperTop() {
    const navigate = useNavigate();
    const location = useLocation();
    // let [flag, setFlag] = useState(randomNum());
    const containerRef = useRef(null);
    const gsap_ref = useRef(null);
    const nav_hash = {
        '': {to: '/', name: '主页'},
        'tools': {to: '/tools', name: '工具'},
        'resources': {to: '/resources', name: '资源'},
        'about': {to: '/about', name: '关于'},
        'bilibili': {to: '/tools/bilibili', name: 'bilibili视频解析'},
        'tiktok': {to: '/tools/tiktok', name: 'tiktok视频解析'},
        'QRPage': {to: '/tools/QRPage', name: '二维码生成器'},
        'Selenium': {to: '/tools/Selenium', name: 'Selenium'},
        'dashboard': {to: '/tools/dashboard', name: 'Dashboard'},
    };
    
    function startAnimation(toWidth){
        gsap_ref.current = gsap.timeline({ repeat: 0});
        // 将动画添加到时间轴中
        gsap_ref.current.add(
            gsap.fromTo(".gsap_nav_expand", {
                // 将动画添加到时间轴中
                width: 0,
            }, {
                width: toWidth,
                duration: 1,
                ease: 'circ.out',
            }),
            0
        );
        gsap_ref.current.add(
            gsap.fromTo(".gsap_navItem_expand", {
                opacity: 0,
                duration: 0,
                x: -50,
            }, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'back.out',
                stagger: 0.1,
            }),
            0.3
        );
    }

    useEffect(() => {
        // let arr = location.pathname.split("/");
        // setNavs([...new Set(arr)]);
        // setFlag(randomNum());
        let tmp = gsap.set(".gsap_nav_expand", {
            width: 'auto',
        });
        let container = containerRef.current;
        tmp.kill();

        // 面包屑相关动画
        if(!gsap_ref.current){
            startAnimation(container.clientWidth);
        }else{
            gsap_ref.current.kill();
            startAnimation(container.clientWidth);
        }
    }, [location.pathname]);

    return (
        <WrapperTopStyled>
            <NavWrapper ref={containerRef}>
                <NavHome onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={solid("house")} size={'lg'}/>
                </NavHome>
                <div tw={'flex flex-row justify-center flex-nowrap items-center overflow-hidden'}>
                    {removeAdjacentDuplicates(location.pathname.split("/")).map((item, index) => {
                        if(nav_hash[item])
                            return <>
                                {/*<NavItem z_index={99 - index} key={index} className={flag} onClick={() => {*/}
                                <NavItem z_index={99 - index} key={index} onClick={() => {
                                    if(location.pathname === nav_hash[item].to)
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    else{
                                        navigate(nav_hash[item].to)
                                        window.scroll(0, 0);
                                    }
                                }}>
                                    <FadeInRight>{nav_hash[item].name || ''}</FadeInRight>
                                </NavItem>
                                {index === removeAdjacentDuplicates(location.pathname.split("/")).length - 1 ? '' : <GapIcon>
                                    <FontAwesomeIcon icon={solid("angle-right")} />
                                </GapIcon>}
                            </>;
                        else
                            return '';
                    })}
                </div>
                {/*<div tw={'grow'}></div>*/}
            </NavWrapper>
        </WrapperTopStyled>
    );
}