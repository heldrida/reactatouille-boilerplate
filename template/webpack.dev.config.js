var path = require('path')
var webpack = require('webpack')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin()
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './js/index.js'
  ],
  output: {
    path: path.join(__dirname, '/dist/development'),
    publicPath: '/assets/',
    filename: 'js/bundle.js?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
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
          'file-loader?name=[path][name].[ext]&emitFile=false'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].min.css?[hash]'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    assetsPluginInstance
  ]
}
