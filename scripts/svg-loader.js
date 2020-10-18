const path = require(`path`)
const hash = require("string-hash")

module.exports = (dir) => ({
	test: /\.svg$/,
	include: path.resolve(dir),
	use: ({ resource }) => [
		{
			loader: ["svg-react-loader"],
			options: {
				jsx: true,
				svgo: {
					plugins: [
						{
							cleanupIDs: {
								prefix: `svg${hash(path.relative(dir, resource))}`,
							},
						},
					],
				},
			},
		},
	],
})
