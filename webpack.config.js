const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './horizontal-scroll.js',
  output: {
    path: '.',
    filename: 'horizontal-scroll.min.js',
    libraryTarget: 'var',
    library: 'hScroll'
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