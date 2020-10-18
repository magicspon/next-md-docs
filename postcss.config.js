module.exports = {
	plugins: {
		tailwindcss: {},
		"postcss-preset-env": { stage: 2 },
		cssnano: process.env.NODE_ENV === "production" ? {} : false,
	},
}
