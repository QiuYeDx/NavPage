/**
 * getSizeConfig - Returns the size configuration based on the given size parameter.
 *
 * @param {string} size - The size of the switch button. Can be 'tiny', 'small', 'large', 'huge', or 'default'.
 * @returns {Object} - An object containing the dimensions for the switch button.
 * @returns {string} .wrapperWidth - The width of the wrapper.
 * @returns {string} .wrapperHeight - The height of the wrapper.
 * @returns {string} .circleSize - The size of the circle.
 * @returns {string} .px - The padding in x-direction.
 *
 * @example
 * const sizeConfig = getSizeConfig('small');
 * // Output: { wrapperWidth: '2.5rem', wrapperHeight: '1.3rem', circleSize: '1rem', px: '0.15rem' }
 */
export function getSizeConfig(size){
    switch(size){
        case 'tiny':
            return {
                wrapperWidth: '2rem',
                wrapperHeight: '1rem',
                circleSize: '0.8rem',
                px: '0.1rem',
            };
        case 'small':
            return {
                wrapperWidth: '2.5rem',
                wrapperHeight: '1.3rem',
                circleSize: '1rem',
                px: '0.15rem',
            };
        case 'large':
            return {
                wrapperWidth: '3.5rem',
                wrapperHeight: '1.75rem',
                circleSize: '1.35rem',
                px: '0.2rem',
            } ;
        case 'huge':
            return {
                wrapperWidth: '4rem',
                wrapperHeight: '2rem',
                circleSize: '1.6rem',
                px: '0.2rem',
            } ;
        case 'default':
        default:
            return {
                wrapperWidth: '3rem',
                wrapperHeight: '1.5rem',
                circleSize: '1.2rem',
                px: '0.15rem',
            };
    }
}

/**
 * getColorConfig - Returns the color configuration based on the given color parameter.
 *
 * @param {string} color - The color of the switch button. Can be 'pink', 'amber', 'amber-300', 'amber-200', 'orange', 'red', 'green', 'blue', 'gray', or 'default'.
 * @returns {string} - The RGB color string.
 *
 * @example
 * const colorConfig = getColorConfig('pink');
 * // Output: 'rgb(244, 114, 182)'
 */
export function getColorConfig(color){
    switch(color){
        case 'pink':
            return 'rgb(244, 114, 182)';
        case 'amber':
            return 'rgb(242, 193, 75)';
        case 'amber-300':
            return 'rgb(252, 211, 77)';
        case 'amber-200':
            return 'rgb(253, 230, 138)';
        case 'orange':
            return 'rgb(251, 146, 60)';
        case 'red':
            return 'rgb(234, 121, 135)';
        case 'green':
            return 'rgb(95, 203, 113)';
        case 'blue':
            return 'rgb(35, 150, 250)';
        case 'gray':
            return 'rgb(215, 218, 226)';
        case 'default':
        default:
            return 'rgb(215, 218, 226)';
    }
}