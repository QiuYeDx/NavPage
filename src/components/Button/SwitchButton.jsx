import React, {useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';
import gsap from 'gsap';
import {UniButton} from "@/components/Button/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import {FadeContentWrapper} from "@/styles/transition/FadeStyles";
import SwitchFadeTransition from "@/styles/transition/SwitchFadeTransition";

const SwitchButton = ({defaultOn = false, onChange, hasShadow = true, _tw}) => {
    const [isOn, setIsOn] = useState(defaultOn);
    const onRef = useRef(null);
    const offRef = useRef(null);
    const nodeRef = isOn ? onRef : offRef;

    const handleToggle = () => {
        const newState = !isOn;
        setIsOn(newState);
        if (onChange) {
            onChange(newState);
        }
    };

    return (
        <div tw={''}>
            <UniButton
                _tw={_tw}
                tw={'h-10 w-10 leading-10 text-blue-400 md:hover:text-blue-300'}
                onClick={handleToggle}
                hasShadow={hasShadow}
            >
                <SwitchFadeTransition
                    isOn={isOn}
                    fadeStyle={'scale'}
                    duration={'0.2s'}
                    className={'moon-sun'}
                    onContent={<FontAwesomeIcon icon={solid("sun")} spin tw={'text-amber-400'}/>}
                    offContent={<FontAwesomeIcon icon={solid("moon")}/>}
                />
            </UniButton>
        </div>
    );
};

export default SwitchButton;
