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
                'fade_in_up.5': 'fade_in_up .5s ease forwards',
            },
            keyframes: {
                'fade_in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'fade_in_up': {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(12px)'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    },
                }
            }
        },
    },
    plugins: [],
}