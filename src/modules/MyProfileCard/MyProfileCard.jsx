import React, {useEffect, useRef} from "react";
import tw, {styled} from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import MainCard from "@/components/MainCard/MainCard";
import {AvatarWrapper} from "@/components/Avatar/Styled.twin";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";
import gsap from "gsap";
import {ASSETS_URL_QiuYeDxWeb} from "@/utils/assets";

const SubAvatar = styled(AvatarWrapper)`
  position: absolute;
  flex-shrink: 0;
  top: -50px;
  background-color: white;
  @media(max-width: ${WIDTH_MOBILE}px) {
    top: -40px;
  }
`

export default function MyProfileCard(props){
    const tw_onlyMobile = tw`bg-white md:col-span-3 col-span-5 m-4 relative  md:hidden mt-16`;
    const tw_notMobile = tw`bg-white md:col-span-3 col-span-5 m-4 relative hidden md:flex`;
    const tw_defaults = tw`bg-white md:col-span-3 col-span-5 m-4 relative`;

    // 渐入动画
    const gsap_ref = useRef(null);
    useEffect(() => {
        if(gsap_ref && gsap_ref.current === null){
            gsap_ref.current = gsap.fromTo(".gsap_fade_in_up", {
                y: 50,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                repeat: 0,
                stagger: 0.2,
                delay: 0.2,
            });
        }
    }, []);

    return (
        <MainCard _tw={props.onlyMobile ? tw_onlyMobile : (props.notMobile ? tw_notMobile : tw_defaults)} h={"360px"}>
            <br/>
            <SubAvatar img={ASSETS_URL_QiuYeDxWeb} hasBorder h={"100px"} w={"100px"} tw={'animate-delay.1_fade_in_up.5'}/>
            <br/>
            <div tw={"text-xl text-gray-700 font-sans mt-2 font-bold"}>QiuYeDx</div>
            <div tw={"flex flex-row mt-2"}>
                <a tw={"pl-2 pr-2 text-base text-white font-sans bg-blue-400 border-4 border-blue-200 rounded-xl md:-top-16 mr-4 \
                                hover:bg-blue-300 hover:border-blue-400 hover:shadow-lg hover:scale-110 active:bg-blue-400 active:border-blue-200 active:scale-100 \
                                transition-all cursor-pointer select-none"} href={"mailto:me@qiuyedx.com"}>
                    <FontAwesomeIcon icon={solid("envelope")} tw={"pr-1"}/>
                    Mail
                </a>
                <a tw={"pl-2 pr-2 text-base text-white font-sans bg-blue-400 border-4 border-blue-200 rounded-xl md:-top-16 \
                                hover:bg-blue-300 hover:border-blue-400 hover:shadow-lg hover:scale-110 active:bg-blue-400 active:border-blue-200 active:scale-100 \
                                transition-all cursor-pointer select-none"} href={"https://qiuyedx.com"}
                   target="_blank">
                    <FontAwesomeIcon icon={solid("blog")} tw={"pr-1"}/>
                    Blog
                </a>
            </div>
            <FontAwesomeIcon icon={solid("quote-left")} size={"xl"} tw={"pr-4 relative top-6 -left-24"}/>
            <div tw={"text-base text-gray-500 font-sans -mb-2"}>
                IT、数码、摄影、ACG<br/>
                正在向着全栈自由出发
            </div>
            <FontAwesomeIcon icon={solid("quote-right")} size={"xl"} tw={"pl-4 relative -top-4 left-24"}/>
            <div tw={"relative w-full pl-6 pr-6"}>
                <div
                    tw={"pt-4 pb-4 text-xl text-white font-bold font-sans bg-blue-400 rounded-2xl flex justify-center items-center"}>
                    <div className={'gsap_fade_in_up'} tw={"flex-1 h-24 flex flex-col"}>
                        <div tw={"flex-grow"}><FontAwesomeIcon icon={solid("mars")}/></div>
                        <div tw={"flex-grow font-normal text-base"}>性别</div>
                        <div tw={"flex-grow"}>男</div>
                    </div>
                    <div className={'gsap_fade_in_up'} tw={"flex-1 h-24 flex flex-col"}>
                        <div tw={"flex-grow"}><FontAwesomeIcon icon={solid("user")}/></div>
                        <div tw={"flex-grow font-normal text-base"}>年龄</div>
                        <div tw={"flex-grow"}>21</div>
                    </div>
                    <div className={'gsap_fade_in_up'} tw={"flex-1 h-24 flex flex-col"}>
                        <div tw={"flex-grow"}><FontAwesomeIcon icon={solid("graduation-cap")}/></div>
                        <div tw={"flex-grow font-normal text-base"}>学校</div>
                        <div tw={"flex-grow md:hidden"}>NEU</div>
                        <div tw={"flex-grow hidden md:block"}>东北大学</div>
                    </div>
                </div>
            </div>
        </MainCard>
    );
}