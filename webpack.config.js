'use strict;'

var path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development'
const webpack = require('webpack')

module.exports = {
  context: __dirname + '/frontend',
  entry: {
    home: './home',
    about: './about',
    shop: './shoppingcart/shop',
    order: './shoppingcart/order'
  },
  output: {
    path: 'public',
    filename: "[name].js",
    library: "[name]"
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2, // Modules reused in at least in 2 places will be placed inside common.js
        chunks: ['about', 'home']
    }),

    // CommoChunkPlugin can be called second time with other modules
    // Given a different name, the new file will have a common extract
    // for different module
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common-cart',
        minChunks: 2, // Modules reused in at least in 2 places will be placed inside common.js
        chunks: ['shop', 'order']
    })

  ],

  // The less you you put into the resolve section, the faster weback will
  // perform builds
  resolve: {
    modulesDirectories: ['node_modules'], // Look in those directories if module path is not provider
    extensions: ['', '.js'] // Resolve to the above modulesDirectories for empty or .js extensions
  },

  resolveLoader: {
    // Similar as above but only for loaders. This will allow use babel, instead
    // of babel-loader.js
    modulesDirectories: ['node_modules'],
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
      include:[
        path.resolve(__dirname)
      ],
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
};


// Add minification plugin
if(NODE_ENV == 'production'){

  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        // don't show unreachable variable, etc
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );

}
