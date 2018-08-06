const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      // define api host by env
      API_HOST: JSON.stringify('//localhost:3000'),
      ENVIRONMENT: JSON.stringify('dev'),
      // ao definir novas defines globais, incluir também em package.json
    }),
    /*new BundleAnalyzerPlugin({
      //analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      // analyzerPort: 8888,
    }),*/
  ]
})