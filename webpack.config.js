'use strict;'

var path = require('path')

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

  // Avilable source map opitons:
  // * eval: fastest
  // * source-map: regular, will be visible in  production
  // * cheap-inline-module-source-map: faster than source-map
  devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

  // List of plugins can be found here:
  // https://webpack.github.io/docs/list-of-plugins.html
  plugins:[
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],

  // The less you you put into the resolve section, the faster weback will
  // perform builds
  resolve: {
    modulesDirectories: ['node_modules'], // Look in those directories if module path is not provider
    extensions: ['', 'js'] // Resolve to the above modulesDirectories for empty or .js extensions
  },

  resolveLoader: {
    // Similar as above but only for loaders. This will allow use babel, instead
    // of babel-loader.js
    modulesDirectories: [node_modules],
    moduleTemplates: ['*-loader'],
    extensions: ['', '.js']
  },

  // https://webpack.github.io/docs/loaders.html
  // Loader is a transformer that gets a javascript and sourcemap and returns
  // ES5 javascript and sourcemap
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      // include:[
      //   path.resolve(__dirname)
      // ],
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
};
