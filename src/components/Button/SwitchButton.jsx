import React, {useRef} from 'react';
import tw from 'twin.macro';
import {UniButton} from "@/components/Button/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import SwitchFadeTransition from "@/styles/transition/SwitchFadeTransition";

/**
 * SwitchButton - A customizable switch button component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} [props.isOn=false] - The current state of the switch.
 * @param {boolean} [props.hasShadow=true] - Determines if the button has a shadow.
 * @param {React.node} [props.onContent=<FontAwesomeIcon icon={solid("sun")} spin tw={'text-amber-400'}/>] - The content to display when the switch is on.
 * @param {React.node} [props.offContent=<FontAwesomeIcon icon={solid("moon")}/>] - The content to display when the switch is off.
 * @param {string} [props.fadeStyle='scale'] - The type of fade transition.
 * @param {string} [props.offset='15px'] - The offset for the fade transition.
 * @param {Object} [props._tw] - Custom Twin Macro styles.
 * @param {function} props.onChange - The function to call when the switch state changes.
 *
 * @example
 * // Example usage in a parent component
 * <SwitchButton
 *   isOn={true}
 *   onChange={(newState) => console.log(newState)}
 *   hasShadow={false}
 *   onContent={<FontAwesomeIcon icon={solid("sun")} spin tw={'text-amber-400'}/>}
 *   offContent={<FontAwesomeIcon icon={solid("moon")}/>}
 * />
 */
const SwitchButton = ({isOn = false, onChange, hasShadow = true, onContent = <FontAwesomeIcon icon={solid("sun")} spin tw={'text-amber-400'}/>, offContent = <FontAwesomeIcon icon={solid("moon")}/>, fadeStyle = 'scale', offset = '15px', _tw}) => {
    const onRef = useRef(null);
    const offRef = useRef(null);
    const nodeRef = isOn ? onRef : offRef;

    const toggleSwitch = () => {
        onChange(!isOn);
    };

    return (
        <div tw={''}>
            <UniButton
                _tw={_tw}
                tw={'h-10 w-10 leading-10 text-blue-400 md:hover:text-blue-300'}
                onClick={toggleSwitch}
                hasShadow={hasShadow}
            >
                <SwitchFadeTransition
                    isOn={isOn}
                    fadeStyle={fadeStyle}
                    offset={offset}
                    duration={'0.2s'}
                    className={'moon-sun'}
                    onContent={onContent}
                    offContent={offContent}
                />
            </UniButton>
        </div>
    );
};

export default SwitchButton;
