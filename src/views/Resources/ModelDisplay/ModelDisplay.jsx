import React, {useEffect, useRef, useState} from 'react';
import 'twin.macro';
import tw from "twin.macro";
import {Application} from '@splinetool/runtime';
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BackButton, PageButton} from "@/components/Button/Styled.twin";
import {useNavigate} from "react-router-dom";
import {useWindowSize} from "react-use";
import {Descriptions, Popover} from "antd";
import {isiPhone} from "@/utils/utils";
import {ErrorWrapper} from "@/views/Error/Styled.twin";
import {H1, P} from "@/styles/TextStyles";

const infoItems = [
    {
        key: '1',
        label: '模型名称',
        children: <p>Arona</p>,
    },
    {
        key: '2',
        label: '模型作者',
        children: <p><a href={'https://space.bilibili.com/227440'}>lovecelebi <FontAwesomeIcon icon={solid("link")} /></a></p>,
    },
    {
        key: '3',
        label: '模型出处',
        children: <p><a href={'https://www.aplaybox.com/details/model/dX8uNqzbNPNJ'}>模之屋 <FontAwesomeIcon icon={solid("link")} /></a></p>,
    },
    {
        key: '4',
        label: '版权信息',
        children: <p>本网站展示的3D人物模型版权归原作者lovecelebi所有。该模型在 aPlayBox 上以社区版形式提供，供非商业性质的使用和展示。在任何情况下，均不得用于商业用途。</p>
    }
];

const InfoCardContent = () => {
    return <Descriptions title="模型信息" items={infoItems} column={1} />;
};

export default function ModelDisplay() {
    const navigate = useNavigate();
    const containerRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const {width, height} = useWindowSize();
    const appRef = useRef(null);

    useEffect(() => {
        if (isiPhone()) {
            setIsLoading(false);
            return;
        }
        appRef.current = new Application(containerRef.current);
        appRef.current.load('https://prod.spline.design/i7EPtYNeCTZkQP8u/scene.splinecode').then(r => {
            setIsLoading(false);
        });
    }, [containerRef]);

    return (
        <div tw={'w-full h-full grow relative'}>
            {!isiPhone() && <canvas style={{width, height: height - 60}} ref={containerRef}></canvas>}
            {isiPhone() && <div style={{width, height: height - 60}} tw={'flex flex-col justify-center'}>
                <ErrorWrapper tw={'min-h-[320px] flex flex-col gap-4 pt-8 mx-6'}>
                    <FontAwesomeIcon icon={regular("face-frown")} size="10x" color={"rgb(255,242,241)"}/>
                    <H1 color={"rgb(255,242,241)"}>No...</H1>
                    <P tw={'text-lg'} color={"rgb(255,242,241)"}>{`iPhone设备暂不支持查看`}</P>
                </ErrorWrapper>
            </div>}
            <div aria-checked={!isLoading}
                 tw="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 opacity-100 aria-checked:opacity-0 duration-500 pointer-events-none">
                <div tw="h-16 w-16">
                    <FontAwesomeIcon icon={solid("spinner")} spin tw={'h-full w-full text-white opacity-60'}/>
                </div>
            </div>
            <div tw={'absolute left-4 bottom-4'}>
                <BackButton scaleIn={true} onClick={() => {
                    navigate('/resources');
                    window.scroll(0, 0);
                }}>
                    <FontAwesomeIcon icon={solid("arrow-left")} tw={'md:pr-4 align-middle relative -top-px'}/>
                </BackButton>
            </div>
            <div tw={'absolute right-4 bottom-4'}>
                <Popover content={InfoCardContent} trigger="click" placement={'topLeft'} overlayStyle={{ maxWidth: '300px' }}>
                    <PageButton scaleIn={true}>
                        <FontAwesomeIcon icon={solid("info")} />
                    </PageButton>
                </Popover>
            </div>
        </div>
    );
}