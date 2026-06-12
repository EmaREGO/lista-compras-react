/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            apple: {
            dark: "#0a0a0c",
            gray: "#1c1c1e",
            lightGray: "#2c2c2e",
            blue: "#007aff",
            red: "#ff453a"
            },
            threads: {
            bg: "#101010",
            card: "#181818",
            textMuted: "#616161"
            }
        }
        },
    },
    plugins: [],
}