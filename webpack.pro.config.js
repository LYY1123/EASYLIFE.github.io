const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const proConfig = {
	devtool: false,
	output: {
    filename: 'js/[name].js?[chunkhash:5]',
    chunkFilename: "js/chunk[id].js?[chunkhash:5]"
  },
	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
		new webpack.optimize.UglifyJsPlugin({
		  mangle: {
		    reserved: ['mutual']
		  }
		}),
		// new CompressionPlugin({
		// 	test: /\.js$|\.css$|\.html$/,
		// 	threshold: 10240,
		// })
	],
	module : {
		rules : [
			{
		        test: /\.vue$/,
		        use : [{
		          loader : 'vue-loader',
		          options : {
		          	postcss: [require('autoprefixer')()],
		            loaders: {
		              less: ExtractTextPlugin.extract({
		                use: [
			                	{
									loader : "css-loader",
									options : {
										minimize: true
									}
								},
								"less-loader"
							],
		                fallback: 'vue-style-loader'
		              })
		            }
		          }
		        }]
		      },
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use:[
							{
								loader : "css-loader",
								options : {
									minimize: true
								}
							},
							{
								loader : "postcss-loader",
								options: {           
									plugins:(loader) => [
								      require('autoprefixer')()	
								    ]
								}
							}
						]
					})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{
								loader : "css-loader",
								options : {
									minimize: true
								}
							},
							{
								loader : "postcss-loader",
								options: {           
								  plugins: (loader) => [
								      require('autoprefixer')()
								  ]
								}
							},
							"less-loader"
						]
					})
			}
		]
	}
}

baseWebpackConfig.devtool = proConfig.devtool;
baseWebpackConfig.plugins = baseWebpackConfig.plugins.concat(proConfig.plugins);
baseWebpackConfig.module.rules = baseWebpackConfig.module.rules.concat(proConfig.module.rules);
Object.assign(baseWebpackConfig.output,proConfig.output)

module.exports = baseWebpackConfig;