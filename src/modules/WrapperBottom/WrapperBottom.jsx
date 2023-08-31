import React, {useEffect, useState} from 'react';
import {P} from "@/styles/TextStyles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw, {styled} from "twin.macro";
import {Gap} from "@/components/Gap/Styled.twin";
import SwitchFadeTransition from "@/styles/transition/SwitchFadeTransition";
import {log_api_config} from "@/GlobalConfig";

const WrapperBottomStyle = styled.div`
  ${tw`pt-8 pb-4 font-sans`}
  ${({hasBorder}) => hasBorder && tw`border-purple-500`}
  text-align: center;
`

export default function WrapperBottom() {
    const [isOn, setIsOn] = useState(false);
    const [visitData, setVisitData] = useState(null);
    const DELAY = 4000;

    const updateVisitData = async () => {
        try {
            const res = await log_api_config.awaitUrlCountAPI('GET');
            setVisitData(res.data);
            return 'Succeed to updateVisitData';
        } catch (e) {
            throw new Error('Failed to updateVisitData');
        }
    };

    useEffect(() => {
        updateVisitData().then(r => console.log(r)).catch(e => console.warn(e));
        const interval = setInterval(() => {
            setIsOn((isOn) => !isOn);
        }, DELAY)

        return () => clearInterval(interval);
    }, []);

    return (
        <WrapperBottomStyle>
            <SwitchFadeTransition
                fadeStyle={'up'}
                isOn={isOn}
                onContent={
                    <P color={"rgba(0,0,0,0.5)"}>本站已累计访问 <span tw={'text-blue-500 font-bold'}>{visitData ? visitData[0].sum_count : <FontAwesomeIcon icon={solid("spinner")} spin />}</span> 次
                    </P>
                }
                offContent={
                    <P color={"rgba(0,0,0,0.5)"}>Made with&nbsp;
                        <FontAwesomeIcon icon={solid("heart")} color={"red"}/>
                        &nbsp;by <a href={'https://qiuyedx.com/me'}
                                    tw={'text-blue-500 font-bold'}>QiuYeDx</a>
                    </P>
                }
            />
        </WrapperBottomStyle>
    );
}