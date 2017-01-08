const path = require('path');
const Webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV

const config = {
	entry: "./javascript/index.js",
	output: {
		path: path.join(__dirname, './out/'),
		filename: "build.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel?presets[]=es2015'],
			exclude: /node_modules/,
		}]
	},
	devtool: NODE_ENV === 'production' ? '' : 'source-map'
};

if (NODE_ENV === 'production') {
	config.plugins = [
		new Webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	];
	config.module.preLoaders = [{
		test: /\.js$/,
		loader: "eslint-loader",
		exclude: /node_modules/
	}]
}

module.exports = config;
