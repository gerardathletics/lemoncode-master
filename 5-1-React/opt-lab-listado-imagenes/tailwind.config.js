/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#e3a94b',
                    light: '#f0c36f',
                    dark: '#c48a2f',
                },
                secondary: {
                    DEFAULT: '#4b85e3',
                    light: '#6fa0f0',
                    dark: '#2f66c4',
                },
                accent: {
                    DEFAULT: '#3b2da3',
                    light: '#5846c9',
                    dark: '#2a1f7a',
                },
                neutral: {
                    DEFAULT: '#979797',
                    light: '#c4c4c4',
                    dark: '#6a6a6a',
                },
            },
        },
    },
    plugins: [],
};
