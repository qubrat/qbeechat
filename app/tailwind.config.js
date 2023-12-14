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
			online: "#90e150",
			offline: "#f2657e",
			// primary: {
			// 	DEFAULT: "#1d90f5",
			// 	100: "#dce9f5",
			// 	200: "#c7dff5",
			// 	300: "#9ccbf5",
			// 	400: "#71b7f5",
			// 	500: "#46a3f4",
			// 	700: "#207ccd",
			// },
			primary: {
				DEFAULT: "#edab44",
				100: "#fef7e1",
				200: "#fdeec3",
				300: "#fce6a4",
				400: "#fbe285",
				500: "#edab44",
				700: "#e39f40",
				800: "#d88f3f",
			},
			error: {
				DEFAULT: "#db3056",
				100: "#f9e1e8",
				200: "#f2c3d1",
				300: "#ebb5c5",
				400: "#e497ae",
				500: "#db3056",
				700: "#c82a4e",
				800: "#872043",
			},
			warning: {
				DEFAULT: "#fcb12a",
				100: "#fef5e0",
				200: "#fdebbd",
				300: "#fce29a",
				400: "#fbd977",
				500: "#fcb12a",
				700: "#f9a126",
				800: "#f29128",
			},
			success: {
				DEFAULT: "#33b270",
				100: "#d9f0e9",
				200: "#b3e1d3",
				300: "#8cd2bd",
				400: "#66c3a7",
				500: "#33b270",
				700: "#2aa465",
				800: "#248f5a",
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
