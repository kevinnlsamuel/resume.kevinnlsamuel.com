import colors from 'tailwindcss/colors';
/** @type {import('tailwindcss').Config} */
export default {
  content: ["!node_modules/**", "!_site/**", "**/*.md", "**/*.liquid", "**/*.html"],
  theme: {
    extend: {
		colors: {
			primary: colors.violet[500],
			secondary: colors.amber[400],
			bg: 'rgb(var(--bg))',
			fg: 'rgb(var(--fg))',
		},
		content: {
			'fa-pin': '"\\f041"',
			'fa-pindot': '"\\f3c5"',
			'fa-calendar': '"\\f073"',
		},
	},
  },
  plugins: [],
}

