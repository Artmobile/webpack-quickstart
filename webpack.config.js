'use strict;'

const NODE_ENV = process.env.NOD_ENV || 'development'
const webpack = require('webpack')

module.exports = {
  entry: './home',
  output: {
    // path: __dirname + "/dist",
    filename: "build.js",
    library: "home"
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100 // Default value is 300
  },

  devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

  // List of plugins can be found here:
  // https://webpack.github.io/docs/list-of-plugins.html
  plugins:[
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ]
};
