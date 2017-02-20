/*global __dirname*/

var path = require('path');

module.exports = {
  entry : './index.js',
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devtool : 'eval-source-map',
  target : 'node',

  module : {
    rules : [{
      enforce : 'pre',
      test: /\.ts$/, 
      loader: 'source-map-loader'
    }/*,
      {test: /\.js$/, loader: ''}*/
    ]
  },

  resolve : {
    extensions: ['.ts', '.js']
  }
};