module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jest/recommended",
		"plugin:compat/recommended",
		"prettier",
	],
	parser: "babel-eslint",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/display-name": "off",
		"react/prop-types": "warn",
		"no-unused-vars": "warn",
		"no-console": "warn",
	},
	globals: {
		React: "writable",
	},
	settings: {
		polyfills: [
			// Example of marking entire API and all methods and properties as polyfilled
			"fetch",
			"Array.from",
		],
	},
}
