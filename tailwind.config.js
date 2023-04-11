module.exports = {
    theme: {
        extend: {
            colors: {
                electric: '#db00ff',
                ribbon: '#0047ff',
            },
            animation: {
                'fade_in.8': 'fade_in .8s ease forwards',
            },
            keyframes: {
                'fade_in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                }
            }
        },
    },
    plugins: [],
}