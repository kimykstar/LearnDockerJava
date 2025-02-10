import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,tsx,ts}', flowbite.content()],
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['Pretendard', 'sans-serif'],
            },
            colors: {
                'Moby-Blue': '#1D63ED',
                'Dark-Blue': '#00084D',
                'Light-Blue': '#E5F2FC',
                'Off-Black': '#17191E',
                'Secondary-Green': '#58C126',
                'Secondary-Red': '#C12626',
                'Stopped-Status-Color': '#FF0000',
                'Running-Status-Color': '#00FF00',
                'Restarting-Status-Color': '#FFFF00',
            },
        },

        keyframes: {
            showAndHideFirst: {
                '0%': { opacity: '0', visibility: 'hidden' },
                '1%, 14.28%': { opacity: '1', visibility: 'visible' },
                '14.29%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideSecond: {
                '0%, 14.28%': { opacity: '0', visibility: 'hidden' },
                '14.29%, 28.57%': { opacity: '1', visibility: 'visible' },
                '28.58%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideThird: {
                '0%, 28.57%': { opacity: '0', visibility: 'hidden' },
                '28.58%, 42.86%': { opacity: '1', visibility: 'visible' },
                '42.87%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideFourth: {
                '0%, 42.86%': { opacity: '0', visibility: 'hidden' },
                '42.87%, 57.14%': { opacity: '1', visibility: 'visible' },
                '57.15%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideFifth: {
                '0%, 57.14%': { opacity: '0', visibility: 'hidden' },
                '57.15%, 71.43%': { opacity: '1', visibility: 'visible' },
                '71.44%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideSixth: {
                '0%, 71.43%': { opacity: '0', visibility: 'hidden' },
                '71.44%, 85.71%': { opacity: '1', visibility: 'visible' },
                '85.72%, 100%': { opacity: '0', visibility: 'hidden' },
            },
            showAndHideSeventh: {
                '0%, 85.71%': { opacity: '0', visibility: 'hidden' },
                '85.72%, 100%': { opacity: '1', visibility: 'visible' },
                '100%': { opacity: '0', visibility: 'hidden' },
            },
            ping: {
                '75%, 100%': {
                    transform: 'scale(2)',
                    opacity: 0,
                },
            },
        },
        animation: {
            showAndHideFirst: 'showAndHideFirst 2s linear forwards',
            showAndHideSecond: 'showAndHideSecond 2s linear forwards',
            showAndHideThird: 'showAndHideThird 2s linear forwards',
            showAndHideFourth: 'showAndHideFourth 2s linear forwards',
            showAndHideFifth: 'showAndHideFifth 2s linear forwards',
            showAndHideSixth: 'showAndHideSixth 2s linear forwards',
            showAndHideSeventh: 'showAndHideSeventh 2s linear forwards',
            ping: `ping 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
        },
    },
    plugins: [flowbite.plugin()],
};
