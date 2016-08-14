'use strict;'

module.exports = {
  entry: './home',
  output: {
    // path: __dirname + "/dist",
    filename: "build.js",
    library: "home"
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100 // Default value is 300
  }
};
