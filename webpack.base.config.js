var path = require('path')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

let production = process.env.NODE_ENV.replace(/\s/,'') === 'production' ? 1 : 0
let PUBLIC_PATH = production ? '/easylife/' : '/'

let moduleConfig = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: __dirname + '/dist/',
    publicPath : PUBLIC_PATH,
  },
  resolve: {  
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'less' : path.resolve(__dirname, 'src/less/'),
      'css' : path.resolve(__dirname, 'src/css/'),
      'js' : path.resolve(__dirname, 'src/js/'),
      'lib' : path.resolve(__dirname, 'src/library/'),
      'components' : path.resolve(__dirname, 'src/components/'),
      'router' : path.resolve(__dirname, 'src/router/'),
      'store' : path.resolve(__dirname, 'src/store/')
    }  
  }, 
  plugins : [
    new ImageminPlugin({
      test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      minFileSize : 10000,
      pngquant: {
        quality: '80-90',
      },
    }),
    new ExtractTextPlugin({
      filename : "css/common.css?[hash:5]",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve('src')],
        exclude :  /library/
      },
      {
        test: /\.js|jsx$/,
        use :[
          {
            loader : 'babel-loader'
          }
        ],
        include: [path.resolve('src')],
        exclude :  /(node_modules|bower_components)/
        
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use : [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name : '[name].[ext]?[hash:5]',
              outputPath : 'img/'
            }
          }
        ]
        
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use : [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name : '[name].[ext]?[hash:5]',
              outputPath : 'video/'
            }
        }]
        
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use : [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name : '[name].[ext]?[hash:5]',
                outputPath : 'font/'
              }
          }
        ]
        
      }
    ]
  }
}


module.exports = moduleConfig;