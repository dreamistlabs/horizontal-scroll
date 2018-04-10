const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/sideways.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'sideways.min.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}