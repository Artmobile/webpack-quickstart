'use strict;'

const path                = require('path')
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin');
const webpack             = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'


// Multi compilation is also supported like so:
// module.exports = [{},{},{}]
module.exports = {
  context: __dirname + '/frontend',
  entry: {
    home: './home',
    about: './about',
    shop: './shoppingcart/shop',
    order: './shoppingcart/order',

    // This file will be used by the common.js created by the CommonsChunkPlugin
    // Also we decided to pack common and welcome as a single package
    // Important: Library common will get a default export of a last module
    // This way we cann connect libraries that must be contained in a common module
    // For example this may be header and footer modules
    common: ['./welcome', './common']
  },
  output: {
    path: '.dist',
    publicPath: '/',
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
    // new CleanWebpackPlugin(['.dist'], {
    //   root: __dirname,
    //   verbose: true,
    //   dry: false,
    //   exclude: ['node_modules']
    // }),

    new CopyWebpackPlugin([
      { from: '../public/home.html'}, // THe current context is set to 'frontend' folder
      { context: '../server', from: '**/*.js', to: './server'}, // Glob is supported
      { context: '../server', from: '*.ts', to: './server'} // This will copy only the top level files
    ]),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    // CommonsChunkPlugin will extract common information for
    //
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
