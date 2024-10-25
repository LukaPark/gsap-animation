/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                neon: '0 0 10px 3px #fff'
            }
        },
    },
    plugins: [],
}

