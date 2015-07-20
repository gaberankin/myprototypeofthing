var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: "./src/app",
	output: {
		path: __dirname + "/dist",
		filename: "main.js"
	},
	resolve: {
		root: [path.join(__dirname, "bower_components")]
	},
	plugins: [
		new webpack.ResolverPlugin(
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
		)
	],
    devServer: {
        contentBase: "./",
        noInfo: true, //  --no-info option
        hot: true,
        inline: true
    }
}