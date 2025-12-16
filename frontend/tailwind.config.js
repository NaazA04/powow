/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fbf7f6',
                    100: '#f5eeeb',
                    200: '#eae0dc',
                    300: '#d5c5be',
                    400: '#bca39b',
                    500: '#8d6e63', // Base Brown
                    600: '#7a5e54',
                    700: '#654d45',
                    800: '#523e38',
                    900: '#42332e',
                },
                accent: {
                    50: '#fbf7f6',
                    100: '#f5eeeb',
                    200: '#eae0dc',
                    300: '#d5c5be',
                    400: '#bca39b',
                    500: '#8d6e63',
                    600: '#7a5e54',
                    700: '#654d45',
                    800: '#523e38',
                    900: '#42332e',
                },
                warm: {
                    50: '#fffbf5',
                    100: '#f5eeeb',
                    200: '#eae0dc',
                    300: '#d5c5be',
                    400: '#bca39b',
                    500: '#8d6e63',
                    600: '#7a5e54',
                    700: '#654d45',
                    800: '#523e38',
                    900: '#42332e',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.4s ease-out',
                'slide-in-left': 'slideInLeft 0.4s ease-out',
                'bounce-gentle': 'bounceGentle 2s infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
            },
            boxShadow: {
                'glow': '0 0 20px rgba(141, 110, 99, 0.4)',
                'glow-lg': '0 0 40px rgba(141, 110, 99, 0.6)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-warm': 'linear-gradient(135deg, #fffbf5 0%, #eae0dc 100%)',
                'gradient-sunset': 'linear-gradient(135deg, #fbf7f6 0%, #eae0dc 50%, #d5c5be 100%)',
            }
        },
    },
    plugins: [],
}
