var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './js/index.js'],
  output: {
    path: path.join(__dirname, '/dist/staging'),
    filename: 'js/bundle.js?[hash]',
    publicPath: '/assets'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          'file-loader?name=[path][name].[ext]'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        use: [
          'file-loader?name=[path][name].[ext]?[hash]'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].min.css?[hash]'),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '/src/' + 'index.html'),
      filename: 'index.html',
      build_name: config.build_name
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('staging')
      }
    })
  ]
}
