import React from 'react';
import tw from 'twin.macro';
import 'twin.macro';
import {LeftBackgroundIcon, RightBackgroundIcon, SwitchCircle, SwitchWrapper} from "@/components/Button/Styled.twin";
import {getColorConfig, getSizeConfig} from "@/components/Button/ButtonConfig";
import SwitchFadeTransition from "@/styles/transition/SwitchFadeTransition";
import {modifyNumericPrefix} from "@/utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import SimpleFadeTransition from "@/styles/transition/SimpleFadeTransition";

/**
 * SwitchButtonX - A customizable switch button component for React.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isOn - The current state of the switch (On/Off).
 * @param {boolean} props.disabled - Whether the switch is disabled.
 * @param {boolean} props.loading - Whether the switch is in a loading state.
 * @param {string} [props.size='default'] - The size of the switch. Can be 'tiny', 'small', 'large', 'huge', or 'default'.
 * @param {string} [props.timingFunction='ease'] - The timing function for the switch transition.
 * @param {string} [props.duration='0.15s'] - The duration of the switch transition.
 * @param {string} [props.onColor='blue'] - The background color when the switch is on.
 * @param {string} [props.offColor='gray'] - The background color when the switch is off.
 * @param {React.node} [props.onIcon=null] - The icon to display when the switch is on.
 * @param {React.node} [props.offIcon=null] - The icon to display when the switch is off.
 * @param {React.node} [props.leftBackgroundIcon=null] - The background icon to display when the switch is on.
 * @param {React.node} [props.rightBackgroundIcon=null] - The background icon to display when the switch is off.
 * @param {function} [props.onChange=()=>{}] - The function to call when the switch state changes.
 * @param {'opacity' | 'down' | 'up' | 'left' | 'right' | 'slideFromBottom' | 'slideFromLeft' | 'slideFromRight' | 'scale'} [props.fadeStyle='scale'] - The fade style for the switch transition.
 *
 * @example
 * <SwitchButtonX isOn={true} onChange={(newState) => console.log(newState)} />
 */
const SwitchButtonX = ({
                           isOn,
                           disabled,
                           loading,
                           size = 'default',
                           timingFunction = 'ease',
                           duration = '0.15s',
                           onColor = 'blue',
                           offColor = 'gray',
                           onIcon = null,
                           offIcon = null,
                           leftBackgroundIcon = null,
                           rightBackgroundIcon = null,
                           onChange = () => {
                           },
                           fadeStyle = 'scale'
                       }) => {

    const toggleSwitch = () => {
        onChange(!isOn);
    };
    const currentColor = isOn ? getColorConfig(onColor) : getColorConfig(offColor);
    const sizeConfig = getSizeConfig(size);

    return (
        <SwitchWrapper
            disabled={disabled || loading}
            size={sizeConfig}
            duration={duration}
            timingFunction={timingFunction}
            isOn={isOn}
            bgColor={currentColor}
            onClick={toggleSwitch}
        >
            <LeftBackgroundIcon size={sizeConfig} lx={sizeConfig['px']}>
                <SimpleFadeTransition in={isOn} duration={duration} fadeStyle={'slideFromLeft'}>
                    {leftBackgroundIcon ? leftBackgroundIcon : ''}
                </SimpleFadeTransition>
            </LeftBackgroundIcon>
            <RightBackgroundIcon size={sizeConfig} rx={sizeConfig['px']}>
                <SimpleFadeTransition in={!isOn} duration={duration} fadeStyle={'slideFromRight'}>
                    {rightBackgroundIcon ? rightBackgroundIcon : ''}
                </SimpleFadeTransition>
            </RightBackgroundIcon>
            <SwitchCircle color={currentColor} size={sizeConfig}>
                <SwitchFadeTransition
                    isOn={isOn}
                    onContent={disabled ? <FontAwesomeIcon icon={solid("ban")}/> : loading ?
                        <FontAwesomeIcon icon={solid("spinner")} spin/> : onIcon}
                    offContent={disabled ? <FontAwesomeIcon icon={solid("ban")}/> : loading ?
                        <FontAwesomeIcon icon={solid("spinner")} spin/> : offIcon}
                    duration={modifyNumericPrefix(duration, (v, p) => v / p, 2)}
                    className={'on-off'}
                    fadeStyle={onIcon === offIcon || disabled || loading ? '' : fadeStyle}
                />
            </SwitchCircle>
        </SwitchWrapper>
    );
};

export default SwitchButtonX;
