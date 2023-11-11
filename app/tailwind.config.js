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
			red: colors.red,
			orange: colors.orange,
			sky: colors.sky,
			blue: colors.blue,
			primary: "#edab44",
			secondary: "#296e98",
		},
	},
	plugins: [],
};
