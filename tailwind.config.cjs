/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/flowbite/**/*.{js,ts,jsx,tsx}",
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'sm': {'max': '375px'},

            'md': {'max': '475px'},

            'lg': {'max': '768px'},

            'xl': {'max': '1024px'},

            '2xl': {'min': '1440px'},
        },
        extend: {
            colors: {
                background: '#E5E5E5',
                primary: '#1014179E',
                secondary: 'rgba(16, 20, 23, 0.14)',
                error: '#DB1414',
                accent: '#EF5630',
                'accent-light': '#E99D8A',
            }
        },
    },
    plugins: [],
}
