var path = require('path')
var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var rootDir = path.resolve(__dirname, '../')
var OfflinePlugin = require('offline-plugin')
var AutoDllPlugin = require('autodll-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(rootDir, 'src'),
  entry: ['babel-polyfill', './js/index.js'],
  output: {
    path: path.join(rootDir, '/dist/production'),
    publicPath: '',
    filename: 'js/bundle.js'
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
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true
            }
          }, 'sass-loader?sourceMap'],
          publicPath: '../'
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
          'file-loader?name=[path][name].[ext]'
        ]
      },
      {
        test: /\.(webm|mp4)$/,
        use: [
          'file-loader?name=[path][name].[ext]&emitFile=false'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].min.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BUILDER': true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
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
    }),
    new AutoDllPlugin({
      filename: 'vendors.dll.js',
      path: 'js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'history/createBrowserHistory',
          'babel-polyfill'
        ]
      }
    }),
    new OfflinePlugin() // it's always better if OfflinePlugin is the last plugin added
  ]
}
