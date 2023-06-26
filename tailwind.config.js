module.exports = {
    theme: {
        minWidth: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
            'card': '260px'
        },
        extend: {
            zIndex: {
                '100': '100',
                '200': '200',
            },
            lineHeight: {
                '12': '3rem',
            },
            colors: {
                electric: '#db00ff',
                ribbon: '#0047ff',
            },
            width: {
                's': '240px',
                'm': '300px',
                'l': '360px',
                'xl': '420px',
                '2xl': '480px',
            },
            animation: {
                'fade_in.8': 'fade_in .8s ease forwards',
                'fade_in_up.1': 'fade_in_up .1s ease-out forwards',
                'fade_in_up.2': 'fade_in_up .2s ease-out forwards',
                'fade_in_up.3': 'fade_in_up .3s ease-out forwards',
                'fade_in_up.4': 'fade_in_up .4s ease-out forwards',
                'fade_in_up.5': 'fade_in_up .5s ease-out forwards',
                'fade_in_up.6': 'fade_in_up .6s ease-out forwards',
                'fade_in_up.7': 'fade_in_up .7s ease-out forwards',
                'fade_in_up.8': 'fade_in_up .8s ease-out forwards',
                'fade_in_up.9': 'fade_in_up .9s ease-out forwards',
                'fade_in_right.5': 'fade_in_right .5s ease-out forwards',
                'fade_in_right.8': 'fade_in_right .8s ease-out forwards',
                'nav_expand.5': 'nav_expand .5s ease forwards',
                'nav_expand.8': 'nav_expand .8s ease forwards',
                'icon_expand.5': 'icon_expand .5s ease forwards',
                'icon_expand.8': 'icon_expand .8s ease forwards',
            },
            keyframes: {
                'fade_in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'fade_in_up': {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(15px)'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    },
                },
                'fade_in_right': {
                    '0%': {
                        opacity: 0,
                        transform: 'translateX(-30px)'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateX(0)'
                    },
                },
                'nav_expand': {
                    '0%': {
                        maxWidth: '50px',
                        padding: '0',
                        opacity: 0,
                    },
                    '100%': {
                        maxWidth: '200px',
                        padding: '0 0 0 70px',
                        opacity: 1,
                    },
                },
                'icon_expand': {
                    '0%': {
                        maxWidth: '0',
                        transform: 'translateX(-40px)',
                        opacity: 0,
                    },
                    '100%': {
                        maxWidth: '10px',
                        transform: 'translateX(0)',
                        opacity: 1,
                    },
                }
            }
        },
    },
    plugins: [],
}