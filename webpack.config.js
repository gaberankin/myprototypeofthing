var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: {
		app: "./src/app"
	},
	output: {
		path: __dirname + "/dist/js",
		publicPath: 'js/',
		filename: "main.js"
	},
	devServer: {
		contentBase: "./",
		noInfo: true, //  --no-info option
		hot: false,
		inline: true
	}
};
