import React, {useRef} from 'react';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import {FadeContentWrapper} from './FadeStyles';

/**
 * A component that provides a fade transition effect between two content elements.
 *
 * @param {Object} props
 * @param {boolean} props.isOn - Determines which content to display.
 * @param {React.ReactNode} [props.onContent=null] - Content to display when isOn is true.
 * @param {React.ReactNode} [props.offContent=null] - Content to display when isOn is false.
 * @param {'opacity' | 'down' | 'up' | 'left' | 'right' | 'slideFromBottom' | 'slideFromLeft' | 'slideFromRight' | 'scale'} [props.fadeStyle='opacity'] - The type of transition style ('opacity', 'down', 'up', 'left', 'right', 'slideFromBottom', 'scale').
 * @param {'out-in' | 'in-out'} [props.mode='out-in'] - The transition mode for SwitchTransition ('out-in' or 'in-out').
 * @param {string} [props.className='fade'] - The className for CSSTransition.
 * @param {string} [props.duration='0.3s'] - The duration of the transition.
 * @param {string} [props.offset='15px'] - The offset value, used for 'down' and 'up' styles.
 *
 * @example
 * <SwitchFadeTransition
 *      isOn={isOn}
 *      fadeStyle={'scale'}
 *      duration={'0.2s'}
 *      className={'moon-sun'}
 *      onContent={<FontAwesomeIcon icon={solid("sun")} spin tw={'text-amber-400'}/>}
 *      offContent={<FontAwesomeIcon icon={solid("moon")}/>}
 * />
 */
const SwitchFadeTransition = ({
                                  isOn,
                                  onContent = null,
                                  offContent = null,
                                  fadeStyle = 'opacity',
                                  mode = 'out-in',
                                  className = 'fade',
                                  duration = '0.3s',
                                  offset = '15px'
                              }) => {
    const nodeRef = useRef(null);

    return (
        <SwitchTransition mode={mode}>
            <CSSTransition
                key={isOn ? "on" : "off"}
                nodeRef={nodeRef}
                className={className}
                addEndListener={(done) => nodeRef.current.addEventListener("transitionend", done, false)}
            >
                <FadeContentWrapper ref={nodeRef} fadeStyle={fadeStyle} className={className} duration={duration} offset={offset}>
                    {isOn ? onContent : offContent}
                </FadeContentWrapper>
            </CSSTransition>
        </SwitchTransition>
    );
}

export default SwitchFadeTransition;
