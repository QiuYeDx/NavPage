import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FadeContentWrapper } from './FadeStyles';
/**
 * A component that provides a simple fade transition effect for a single content element.
 *
 * @param {Object} props
 * @param {boolean} props.in - Determines if the content should be visible.
 * @param {React.ReactNode} [props.children=null] - The content to display and animate.
 * @param {'opacity' | 'down' | 'up' | 'left' | 'right' | 'slideFromBottom' | 'scale'} [props.fadeStyle='opacity'] - The type of transition style.
 * @param {string} [props.className='fade'] - The className for CSSTransition.
 * @param {string} [props.duration='0.3s'] - The duration of the transition.
 * @param {string} [props.offset='15px'] - The offset value, used for 'down' and 'up' styles.
 * @param {boolean} [props.exit=true] - Determines if the exit transition should be animated.
 *
 * @example
 * <SimpleFadeTransition
 *      in={isVisible}
 *      fadeStyle={'scale'}
 *      duration={'0.2s'}
 *      className={'content-fade'}
 *      offset={'20px'}
 *      exit={false}
 * >
 *      <div>My Content</div>
 * </SimpleFadeTransition>
 *
 * @attention
 *  * 不能在条件渲染语句中使用该组件，而应该由组件自身的`in`属性来决定是否显示内容，否则会丢失过渡效果。
 */
const SimpleFadeTransition = ({
                                  in: inProp,
                                  children = null,
                                  fadeStyle = 'opacity',
                                  className = 'fade',
                                  duration = '0.3s',
                                  offset = '15px',
                                  exit = true
                              }) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            in={inProp}
            nodeRef={nodeRef}
            className={className}
            timeout={parseFloat(duration) * 1000} // Convert duration to milliseconds
            exit={exit}
            unmountOnExit
        >
            <FadeContentWrapper ref={nodeRef} fadeStyle={fadeStyle} className={className} duration={duration} offset={offset}>
                {children}
            </FadeContentWrapper>
        </CSSTransition>
    );
}

export default SimpleFadeTransition;
