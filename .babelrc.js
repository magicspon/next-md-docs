module.exports = (api) => {
	const env = api.cache(() => process.env.NODE_ENV)
	console.log(`babelrc: ${env}`)

	return {
		presets: ["next/babel"],
		// plugins: [
		//   [
		//     "module-resolver",
		//     {
		//       root: ["./"],
		//       alias: {
		//         "@": "./src",
		//       },
		//     },
		//   ],
		// ],
	}
}
