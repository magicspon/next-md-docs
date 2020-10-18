const path = require("path")
const svg = require("../scripts/svg-loader")

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],

	webpackFinal: async (config) => {
		const { rules } = config.module

		config.resolve.alias["@"] = path.resolve(__dirname, "../src")

		config.module.rules = rules
			// remove css rules
			.filter((f) => f.test.toString() !== "/\\.css$/")
			// remove css module rules
			.filter((f) => f.test.toString() !== "/\\.module\\.css$/")
			// exlude /icons/ from the svg folder
			.map((f) => {
				if (f.test.toString().includes("svg")) {
					return {
						...f,
						exclude: /icons/,
					}
				}
				return f
			})

		config.module.rules.push(
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},

			{
				test: /\.module\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								mode: "local",
							},
						},
					},
					"postcss-loader",
				],
			}
		)

		config.module.rules.push(svg(path.resolve(__dirname, "../src/icons/")))

		return config
	},
}
