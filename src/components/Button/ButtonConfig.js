export function getSizeConfig(size){
    switch(size){
        case 'default':
        default:
            return {
                wrapperWidth: '3rem',
                wrapperHeight: '1.5rem',
                circleSize: '1.2rem',
            };
    }
}

export function getColorConfig(color){
    switch(color){
        case 'blue':
            return 'rgb(35, 150, 250)'
        case 'gray':
            return 'rgb(215, 218, 226)';
        case 'default':
        default:
            return 'rgb(215, 218, 226)';
    }
}