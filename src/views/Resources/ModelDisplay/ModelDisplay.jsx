import React, {useEffect, useRef, useState} from 'react';
import 'twin.macro';
import tw from "twin.macro";
import {Application} from '@splinetool/runtime';
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BackButton} from "@/components/Button/Styled.twin";
import {useNavigate} from "react-router-dom";

export default function ModelDisplay() {
    const navigate = useNavigate();
    const containerRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const app = new Application(containerRef.current);
        app.load('https://prod.spline.design/i7EPtYNeCTZkQP8u/scene.splinecode').then(r => setIsLoading(false));
    }, [containerRef]);

    return (
        <div tw={'w-full h-full grow relative'}>
            <canvas ref={containerRef} tw={'w-full h-full'}></canvas>
            <div aria-checked={!isLoading} tw="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 opacity-100 aria-checked:opacity-0 duration-500 pointer-events-none">
                <div tw="h-16 w-16">
                    <FontAwesomeIcon icon={solid("spinner")} spin tw={'h-full w-full text-white opacity-60'}/>
                </div>
            </div>
            <div tw={'absolute left-4 bottom-4'}>
                <BackButton onClick={() => {
                    navigate('/resources');
                    window.scroll(0, 0);
                }}>
                    <FontAwesomeIcon icon={solid("arrow-left")} tw={'md:pr-4 align-middle relative -top-px'}/>
                </BackButton>
            </div>
        </div>
    );
}