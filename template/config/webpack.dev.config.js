var config = require('config')
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({ path: path.resolve(__dirname), update: true })
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var AutoDllPlugin = require('autodll-webpack-plugin')
var rootDir = path.resolve(__dirname, '../')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// https://github.com/lorenwest/node-config/wiki/Webpack-Usage
fs.writeFileSync(path.resolve(rootDir, 'config/client.development.json'), JSON.stringify(config))

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'cheap-eval-source-map',
  context: path.resolve(rootDir, 'src'),
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(rootDir, 'src/js/index.js')
  ],
  output: {
    path: path.join(rootDir, '/dist/development'),
    publicPath: '/',
    filename: 'assets/js/bundle.js?[hash]'
  },
  devServer: {
    hot: true,
    // match the output path
    contentBase: path.join(rootDir, '/dist/development'),
    // match the output `publicPath`
    publicPath: '/'
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
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true
            }
          }, 'sass-loader?sourceMap']
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
    new ExtractTextPlugin('assets/css/[name].min.css?[hash]'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new AutoDllPlugin({
      filename: 'vendors.dll.js',
      path: 'assets/js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'react-hot-loader',
          'react-router',
          'redux',
          'history/createBrowserHistory',
          'babel-polyfill',
          'popmotion',
          'popmotion-timeline'
        ]
      }
    }),
    assetsPluginInstance,
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerHost: 'localhost',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  ],
  resolve: {
    alias: {
      config: path.resolve(rootDir, 'config/client.development.json')
    }
  }
}
