const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: path.join(__dirname, "src"),
  //devtool: debug ? "inline-sourcemap" : null,
  entry: ['./app.js', './styles/first-load.scss'],

  module: {
    loaders: [
      {
        //test: /\.jsx?$/,
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ["transform-decorators-legacy"],
        }
      },
      {
        test: /\.scss$/,
        exclude: /first-load\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /first-load\.scss$/,
        loader: ExtractTextPlugin.extract([{ loader: "css-loader", options: { minimize: true } }, 'sass-loader'])
      },

    ]
  },

  // posibilita a importacao de paths a partir destes caminhos
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },

  output: {
    path: __dirname + "/public/bundle/",
    publicPath: "/bundle/",
    filename: "app.min.js",
    chunkFilename: '[name].[chunkhash].js'
  },

  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'first-load.min.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({  // generate index.html
      hash: true,
      filename: '../index.html', // public/index.html
      template: 'html/index.html' // src/html/index.html
      // public/bundle/app.min.js is automatically included
    })
  ],
}