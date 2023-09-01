import {styled} from "twin.macro";

/**
 * A styled div component that applies a fade transition effect.
 *
 * @component
 * @param {Object} props
 * @param {'opacity' | 'down' | 'up' | 'left' | 'right' | 'slideFromBottom' | 'slideFromLeft' | 'slideFromRight' | 'scale'} [props.fadeStyle='opacity'] - The type of transition style ('opacity' | 'down' | 'up' | 'left' | 'right' | 'slideFromBottom' | 'slideFromLeft' | 'slideFromRight' | 'scale').
 * @param {string} [props.duration='0.3s'] - The duration of the transition.
 * @param {string} [props.timingFunction='ease'] - The timing function for the transition.
 * @param {string} [props.offset='15px'] - The offset value, used for 'down' and 'up' styles.
 * @param {string} [props.className='fade'] - The className for the transition styles.
 *
 * @example
 * <FadeContentWrapper fadeStyle="down" duration="0.5s" timingFunction="linear" offset="20px" className="myTransition">
 *   Content goes here...
 * </FadeContentWrapper>
 */
export const FadeContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({fadeStyle = 'opacity', duration, timingFunction, offset = '15px', className = 'fade'}) =>
          createTransitionStyles(fadeStyle, duration, timingFunction, offset, className)
  };
`;

/**
 * Creates a CSS transition style string based on the provided parameters.
 *
 * @function
 * @param {'opacity' | 'down' | 'up' | 'left' | 'right' | 'slideFromBottom' | 'slideFromLeft' | 'slideFromRight' | 'scale'} style - The type of transition style ('opacity', 'down', 'up', 'left', 'right', 'slideFromBottom', 'scale').
 * @param {string} [duration='0.3s'] - The duration of the transition.
 * @param {string} [timingFunction='ease'] - The timing function for the transition (e.g., 'linear', 'ease-in').
 * @param {string} [offset='15px'] - The offset value, used for 'down' and 'up' styles.
 * @param {string} [className='fade'] - The className for the transition styles.
 * @returns {string} The generated CSS transition style string.
 *
 * @example
 * const fadeStyle = createTransitionStyles('opacity', '0.5s', 'linear', '15px', 'myTransition');
 * const downStyle = createTransitionStyles('down', '0.4s', 'ease-in-out', '20px', 'myTransition');
 */
export function createTransitionStyles(style, duration = '0.3s', timingFunction = 'ease', offset = '15px', className = 'fade') {
    switch (style) {
        case 'opacity':
            return `
            &.${className}.enter {
                opacity: 0;
            }

            &.${className}.enter-active {
                opacity: 1;
                transition: opacity ${duration} ${timingFunction};
            }

            &.${className}.exit {
                opacity: 1;
            }

            &.${className}.exit-active {
                opacity: 0;
                transition: opacity ${duration} ${timingFunction};
            }`;

        case 'down':
            return `
            &.${className}.enter {
                transform: translateY(-${offset});
                opacity: 0;
            }

            &.${className}.enter-active {
                transform: translateY(0);
                opacity: 1;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }

            &.${className}.exit {
                transform: translateY(0);
                opacity: 1;
            }

            &.${className}.exit-active {
                transform: translateY(${offset});
                opacity: 0;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }`;

        case 'up':
            return `
            &.${className}.enter {
                transform: translateY(${offset});
                opacity: 0;
            }

            &.${className}.enter-active {
                transform: translateY(0);
                opacity: 1;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }

            &.${className}.exit {
                transform: translateY(0);
                opacity: 1;
            }

            &.${className}.exit-active {
                transform: translateY(-${offset});
                opacity: 0;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }`;

        case 'scale':
            return `
            &.${className}.enter {
                transform: scale(0);
                opacity: 0;
            }
        
            &.${className}.enter-active {
                transform: scale(1);
                opacity: 1;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }
        
            &.${className}.exit {
                transform: scale(1);
                opacity: 1;
            }
        
            &.${className}.exit-active {
                transform: scale(0);
                opacity: 0;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }`;

        case 'slideFromBottom':
            return `
            &.${className}.enter {
                transform: translateY(${offset});
                opacity: 0;
            }
        
            &.${className}.enter-active {
                transform: translateY(0);
                opacity: 1;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }
        
            &.${className}.exit {
                transform: translateY(0);
                opacity: 1;
            }
        
            &.${className}.exit-active {
                transform: translateY(${offset});
                opacity: 0;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }`;

        case 'slideFromLeft':
            return `
            &.${className}.enter {
                transform: translateX(${offset});
                opacity: 0;
            }
        
            &.${className}.enter-active {
                transform: translateX(0);
                opacity: 1;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }
        
            &.${className}.exit {
                transform: translateX(0);
                opacity: 1;
            }
        
            &.${className}.exit-active {
                transform: translateX(${offset});
                opacity: 0;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }`;

        case 'slideFromRight':
            return `
            &.${className}.enter {
                transform: translateX(-${offset});
                opacity: 0;
            }
        
            &.${className}.enter-active {
                transform: translateX(0);
                opacity: 1;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }
        
            &.${className}.exit {
                transform: translateX(0);
                opacity: 1;
            }
        
            &.${className}.exit-active {
                transform: translateX(-${offset});
                opacity: 0;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }`;

        case 'right':
            return `
            &.${className}.enter {
                transform: translateX(-${offset});
                opacity: 0;
            }
        
            &.${className}.enter-active {
                transform: translateX(0);
                opacity: 1;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }
        
            &.${className}.exit {
                transform: translateX(0);
                opacity: 1;
            }
        
            &.${className}.exit-active {
                transform: translateX(${offset});
                opacity: 0;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }`;

        case 'left':
            return `
            &.${className}.enter {
                transform: translateX(${offset});
                opacity: 0;
            }
        
            &.${className}.enter-active {
                transform: translateX(0);
                opacity: 1;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }
        
            &.${className}.exit {
                transform: translateX(0);
                opacity: 1;
            }
        
            &.${className}.exit-active {
                transform: translateX(-${offset});
                opacity: 0;
                transition: opacity ${duration} ${timingFunction}, transform ${duration} ${timingFunction};
            }`;

        default:
            return '';
    }
}
