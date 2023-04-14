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