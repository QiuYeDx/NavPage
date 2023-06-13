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