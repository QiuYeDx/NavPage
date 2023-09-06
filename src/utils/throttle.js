/**
 * Throttles a function, limiting its execution to once every specified time interval.
 * @param {Function} func - The function to throttle.
 * @param {number} wait - The time interval in milliseconds.
 * @returns {Function} - The throttled function.
 */
export function throttle(func, wait){
    let timer = null;
    return function(){
        let args = arguments;
        if(timer !== null) return;
        timer = setTimeout(()=>{
            func.apply(this, args);
            timer = null;
        }, wait);
    }
}

/**
 * Debounces a function, delaying its execution until after a specified time interval has elapsed since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The time interval in milliseconds.
 * @param {boolean} immediate - Whether to execute the function immediately.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, wait, immediate) {
    let timer;

    return function () {
        let context = this;
        let args = arguments;

        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timer = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}