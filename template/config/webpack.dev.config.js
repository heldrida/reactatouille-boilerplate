var config = require('./client')
var path = require('path')
var webpack = require('webpack')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({ path: path.resolve(__dirname), update: true })
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var rootDir = path.resolve(__dirname, '../')
var fs = require('fs')

// This will take the config based and save it to the distribution dir as config.js
// The webpack alias below will then build that file into the client build
fs.writeFileSync(path.resolve(rootDir, 'dist/development/config.js'), 'module.exports = ' + JSON.stringify(config))

module.exports = {
  resolve: {
    alias: {
      config: path.resolve(rootDir, 'dist/development/config.js')
    }
  },
  context: path.resolve(rootDir, 'src'),
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './js/index.js'
  ],
  output: {
    path: path.join(rootDir, '/dist/development'),
    publicPath: '/assets/',
    filename: 'js/bundle.js?[hash]'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    // match the output path
    contentBase: path.join(rootDir, '/dist/development'),
    // match the output `publicPath`
    publicPath: '/assets/'
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
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }))
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
    new ExtractTextPlugin('css/[name].min.css?[hash]'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    assetsPluginInstance
  ]
}
