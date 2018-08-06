const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  devtool: 'none',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      // define api host by env
      API_HOST: JSON.stringify('//api.contacts.discoverytecnologia.com.br/v1'),
      ENVIRONMENT: JSON.stringify('prod'),
      // ao definir novas defines globais, incluir também em package.json
    }),
    new CleanWebpackPlugin(['public/js']),
    new webpack.optimize.UglifyJsPlugin({
      parallel: 4,
      test: /\.js($|\?)/i,
      mangle: false,
      sourcemap: false,
      comments: false,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
    }),
    /*new BundleAnalyzerPlugin({
      //analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      // analyzerPort: 8888,
    }),*/
  ],
})