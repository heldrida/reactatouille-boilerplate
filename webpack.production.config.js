var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'./src/js/index.js'
	],
	output: {
		path: __dirname + '/dist',
	    filename: 'bundle-[hash].js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] },
            { test: /\.scss$/, loader: 'style!css!sass' },
			{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: __dirname + '/src/' + 'index.html',
			filename: 'index.html'
		})
	]
};