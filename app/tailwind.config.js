const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			slate: colors.slate,
			amber: colors.amber,
			white: colors.white,
			black: colors.black,
			red: colors.red,
			orange: colors.orange,
			sky: colors.sky,
			blue: colors.blue,
			primary: "#edab44",
			secondary: "#296e98",
			error: "#db3056",
			errorDark: "#872043",
			warning: "#fc8621",
			warningDark: "#c24914",
			success: "#03a65a",
			successDark: "#005e38",
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
