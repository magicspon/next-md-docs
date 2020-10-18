process.env.BABEL_ENV = "test"

module.exports = function (wallaby) {
	return {
		files: [
			{ pattern: ".env", instrument: false },
			"jest.config.js",
			"__tests__/**/*.js",
			"scripts/*.js",
			"src/**/*.js?(x)",
			"!src/**/*.test.js?(x)",
		],

		filesWithNoCoverageCalculated: [
			"**/*.stories.js",
			"src/style/**/*.js",
			"__tests__/__mocks__/*.js",
			"__tests__/utils/*.js",
		],

		tests: ["src/**/*.test.js?(x)"],

		env: {
			type: "node",
			params: {
				env: "wallaby=test",
			},
		},

		compilers: {
			"src/**/*.js?(x)": wallaby.compilers.babel(),
		},

		testFramework: "jest",

		debug: true,

		// eslint-disable-next-line no-shadow
		setup() {
			const path = require("path")
			const config = require(path.join(process.env.PWD, "./jest.config"))

			config.rootDir = "./"

			config.setupFilesAfterEnv = [
				path.join(process.env.PWD, "./scripts/setup-tests.js"),
			]
			// config.setupFilesAfterEnv = './__tests__/utils/test-setup.ts'
			wallaby.testFramework.configure(config)
		},
	}
}
