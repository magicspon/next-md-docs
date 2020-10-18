const path = require("path")
const svg = require("./scripts/svg-loader")
const { parsed: env } = require("dotenv").config({
	path: ".env",
})

module.exports = {
	env,
	webpack: (config, { isServer }) => {
		config.module.rules.push(svg(path.resolve(__dirname, "./src/icons/")))
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
			config.node = {
				fs: "empty",
			}
		}

		return config
	},
}
