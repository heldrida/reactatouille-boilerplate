var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './js/index.js'],
  output: {
    path: path.join(__dirname, '/dist/production'),
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
        exclude: /(node_modules)/,
        use: [
          'file-loader?name=[path][name].[ext]?[hash]'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].min.css?[hash]'),
    // TODO: The node server provides the index output by default
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: __dirname + '/src/' + 'index.html',
    //   filename: 'index.html',
    //   build_name: config.build_name
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: false, // if true, causes issue with gsap `https://greensock.com/forums/topic/14387-webpack-gsap-error/`
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        drop_console: true
      },
      output: {
        comments: false
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
