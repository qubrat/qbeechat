const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			slate: colors.slate,
			white: colors.white,
			black: colors.black,
			text: "#181818",
			green: {
				DEFAULT: "#58bb69",
				white: "#e9f7e4",
				light: "#9ada9a",
				accent: "#40a565",
				dark: "#318762",
			},
			red: {
				DEFAULT: "#f9404e",
				white: "#ffe9e0",
				light: "#ffc7cb",
				accent: "#e61e3c",
				dark: "#c3133c",
			},
			orange: {
				DEFAULT: "#ffa046",
				dark: "#ed6f07",
				white: "#ffecd6",
				light: "#ffd4a8",
				accent: "#fe8310",
			},
			primary: {
				DEFAULT: "#fe6845",
				50: "#ffeceb",
				100: "#ffded7",
				200: "#feb9a9",
				300: "#fe8e72",
				400: "#fe6543",
				500: "#f84416",
				600: "#e9350c",
				700: "#c02d0c",
				800: "#9a2c13",
				900: "#7c2b13",
				950: "#451707",
			},
			azure: {
				50: "#f1f5fe",
				100: "#dfe9fb",
				200: "#c3d9f9",
				300: "#99c2f5",
				400: "#6ca5ef",
				500: "#4080e7",
				600: "#326bdc",
				700: "#2b5dca",
				800: "#294ea3",
				900: "#264582",
				950: "#1c2b4f",
			},
		},
		fontFamily: {
			logo: ["Montserrat", "sans-serif"],
		},
		extend: {
			animation: {
				"spin-once": "spin 0.4s ease-in-out",
			},
		},
	},
	plugins: [],
};
