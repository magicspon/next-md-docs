module.exports = {
	collectCoverageFrom: ["!**/*.d.ts", "!**/node_modules/**", "src/**/*.js"],
	setupFilesAfterEnv: ["<rootDir>/scripts/setup-tests.js"],
	testPathIgnorePatterns: [
		"/node_modules/",
		"/.next/",
		"/.storybook/",
		"/scripts/",
		"/styles/",
	],
	transform: {
		"^.+\\.jsx?$": "<rootDir>/scripts/jest.preprocess.js",
		"^.+\\.css$": "<rootDir>/scripts/cssTransform.js",
	},
	testMatch: [
		// '<rootDir>/**/__tests__/**/*.[jt]s?(x)',
		"<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)",
	],
	transformIgnorePatterns: [
		"/node_modules/",
		"^.+\\.module\\.(css|sass|scss)$",
	],
	moduleNameMapper: {
		"\\.css$": "<rootDir>/__tests__/__mocks__/style.js",
		"\\.module\\.css$": "identity-obj-proxy",
	},
}
