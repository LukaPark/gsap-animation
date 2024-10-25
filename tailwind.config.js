/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                neon: '0 0 10px 3px #fff',
                card: '0 15px 30px rgba(0, 0, 0, 0.25), 0 8px 12px rgba(0, 0, 0, 0.15)',
                card_soft: '0 10px 20px rgba(0, 0, 0, 0.15)',
                card_hard: '0 20px 40px rgba(0, 0, 0, 0.3)',
                card_glow: '0 0 20px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.1)',
                card_fancy: 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px'
            }
        },
    },
    plugins: [],
}

