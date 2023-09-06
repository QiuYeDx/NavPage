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
            scale: {
                '101': '1.01',
                '102': '1.02',
                '103': '1.03',
            },
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

                'delay.1_fade_in_up.5': 'delay_1_3_fade_in_up 1.5s ease-out forwards',

                'popup_t_Y.3': 'popup_t_Y_50 .3s ease forwards',
                'popup_t_Y.5': 'popup_t_Y_50 .5s ease forwards',
                'popup_t_Y.8': 'popup_t_Y_50 .8s ease forwards',

                'popup_t.3': 'popup_t .3s ease forwards',
                'popup_t.5': 'popup_t .5s ease forwards',
                'popup_t.8': 'popup_t .8s ease forwards',

                'popup_tr.3': 'popup_tr .3s ease forwards',
                'popup_tr.5': 'popup_tr .5s ease forwards',
                'popup_tr.8': 'popup_tr .8s ease forwards',

                'popup_b.3': 'popup_b .3s ease forwards',
                'popup_b.5': 'popup_b .5s ease forwards',
                'popup_b.8': 'popup_b .8s ease forwards',

                'popout_t_Y.3': 'popout_t_Y_50 .3s ease forwards',
                'popout_t_Y.5': 'popout_t_Y_50 .5s ease forwards',
                'popout_t_Y.8': 'popout_t_Y_50 .8s ease forwards',

                'popout_t.3': 'popout_t .3s ease forwards',
                'popout_t.5': 'popout_t .5s ease forwards',
                'popout_t.8': 'popout_t .8s ease forwards',

                'popout_tr.3': 'popout_tr .3s ease forwards',
                'popout_tr.5': 'popout_tr .5s ease forwards',
                'popout_tr.8': 'popout_tr .8s ease forwards',

                'popout_b.3': 'popout_b .3s ease forwards',
                'popout_b.5': 'popout_b .5s ease forwards',
                'popout_b.8': 'popout_b .8s ease forwards',

                'maxHeight_in_36.5': 'maxHeight_in_36 .5s ease forwards',
                'maxHeight_in_36.10': 'maxHeight_in_36 1s ease forwards',
                'maxHeight_in_36.15': 'maxHeight_in_36 1.5s ease forwards',
            },
            keyframes: {
                'maxHeight_in_36': {
                    '0%': { maxHeight: '0' },
                    '100%': { maxHeight: '36px' },
                },
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
                'delay_1_3_fade_in_up': {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(15px)'
                    },
                    '66.7%': {
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
                },

                'popup_t_Y_50': {
                    '0%': {
                        transformOrigin: 'center 50px',
                        opacity: 0,
                        transform: 'scaleY(0)',
                    },
                    '100%': {
                        transformOrigin: 'center 50px',
                        opacity: 1,
                        transform: 'scaleY(1)',
                    },
                },
                'popup_t': {
                    '0%': {
                        transformOrigin: 'top',
                        opacity: 0,
                        transform: 'scale(0.2)',
                    },
                    '100%': {
                        transformOrigin: 'top',
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },
                'popup_tr': {
                    '0%': {
                        transformOrigin: 'top right',
                        opacity: 0,
                        transform: 'scale(0.2)',
                    },
                    '100%': {
                        transformOrigin: 'top right',
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },
                'popup_b': {
                    '0%': {
                        transformOrigin: 'bottom',
                        opacity: 0,
                        transform: 'scale(0.2)',
                    },
                    '100%': {
                        transformOrigin: 'bottom',
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },

                'popout_t_Y_50': {
                    '0%': {
                        transformOrigin: 'center 50px',
                        opacity: 1,
                        transform: 'scaleY(1)',
                    },
                    '100%': {
                        transformOrigin: 'center 50px',
                        opacity: 0,
                        transform: 'scaleY(0)',
                    },
                },
                'popout_b': {
                    '100%': {
                        transformOrigin: 'bottom',
                        opacity: 0,
                        transform: 'scale(0.2)',
                    },
                    '0%': {
                        transformOrigin: 'bottom',
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },
                'popout_tr': {
                    '100%': {
                        transformOrigin: 'top right',
                        opacity: 0,
                        transform: 'scale(0.2)',
                    },
                    '0%': {
                        transformOrigin: 'top right',
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },
                'popout_t': {
                    '100%': {
                        transformOrigin: 'top',
                        opacity: 0,
                        transform: 'scale(0.2)',
                    },
                    '0%': {
                        transformOrigin: 'top',
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                },
            }
        },
    },
    plugins: [],
}