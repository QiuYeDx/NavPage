import React from 'react';
import tw from 'twin.macro';
import 'twin.macro';
import PropTypes from 'prop-types';
import {SwitchCircle, SwitchWrapper} from "@/components/Button/Styled.twin";
import {getColorConfig, getSizeConfig} from "@/components/Button/ButtonConfig";
import SwitchFadeTransition from "@/styles/transition/SwitchFadeTransition";
import {modifyNumericPrefix} from "@/utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";

/**
 * SwitchButton - A customizable switch button component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isOn - The current state of the switch.
 * @param {boolean} props.disabled
 * @param {boolean} props.loading
 * @param {string} [props.onColor='green'] - The background color when the switch is on.
 * @param {string} [props.offColor='red'] - The background color when the switch is off.
 * @param {React.node} [props.onIcon=null] - The icon to display when the switch is on.
 * @param {React.node} [props.offIcon=null] - The icon to display when the switch is off.
 * @param {function} props.onChange - The function to call when the switch state changes.
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
                           onIcon,
                           offIcon,
                           onChange,
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
            <SwitchCircle color={currentColor}>
                <SwitchFadeTransition
                    isOn={isOn}
                    onContent={disabled ? <FontAwesomeIcon icon={solid("ban")} fade /> : loading ? <FontAwesomeIcon icon={solid("spinner")} spin /> : onIcon}
                    offContent={loading ? <FontAwesomeIcon icon={solid("spinner")} spin /> : offIcon}
                    duration={modifyNumericPrefix(duration, (v, p) => v / p, 2)}
                    className={'on-off'}
                    fadeStyle={fadeStyle}
                />
            </SwitchCircle>
        </SwitchWrapper>
    );
};

SwitchButtonX.propTypes = {
    isOn: PropTypes.bool.isRequired,
    onColor: PropTypes.string,
    offColor: PropTypes.string,
    onIcon: PropTypes.node,
    offIcon: PropTypes.node,
    onChange: PropTypes.func.isRequired,
};

// SwitchButtonX.defaultProps = {
//     onColor: 'rgb(35, 150, 250)',
//     offColor: 'rgb(215, 218, 226)',
//     onIcon: null,
//     offIcon: null,
// };

export default SwitchButtonX;
