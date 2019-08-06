module.exports = {
	parser: "babel-eslint",
	parserOptions: {
		sourceType: "module",
		allowImportExportEverywhere: true,
		codeFrame: false
	},
	settings: {
	  "import/resolver": {
		  webpack: {
			  config: 'config/webpack.common.js'
		  },
		}
	},
	extends: ["standard", "airbnb-base"],
	rules:{
		"no-console": 0,
		indent: ["error", "tab"],
		"no-tabs": 0,
		"consistent-return": 1
	},
}