import React, {useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';
import gsap from 'gsap';
import {UniButton} from "@/components/Button/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const SwitchButton = ({defaultOn = false, onChange, hasShadow = true, _tw}) => {
    const [isOn, setIsOn] = useState(defaultOn);

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
                {isOn ? <FontAwesomeIcon icon={solid("sun")} spin tw={'text-amber-400'}/> : <FontAwesomeIcon icon={solid("moon")} />}
            </UniButton>
        </div>
    );
};

export default SwitchButton;
