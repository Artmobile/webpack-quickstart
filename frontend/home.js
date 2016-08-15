import welcome from'./welcome';

//region  Attempt to invoke a non-commonjs third party component
// Using imports-loader webpack plugin to pass workSettings.delay parameter
// (note the lambda settings). Export must come after import
// For more details:
//    http://webpack.github.io/docs/shimming-modules.html
let vendor = require('vendor');
vendor(); // Note that Work function became default export, so just call vandor(), not vendor.Work()
//endregion

//region Attempt aliased dependency invocation. This one has a proper export
let thirdparty = require('thirdparty');
thirdparty();
//endregion

//region Attempt 3rd party component locatecin node_modules
let moment = require('moment')
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
//endregion

document.addEventListener("DOMContentLoaded", function(event) {
  //do work
  document.getElementById('loginButton').onclick = function(){


    require.ensure([], function(require){

      let login = require('./login');

      login();

    }, 'auth')

  }

  document.getElementById('logoutButton').onclick = function(){


    require.ensure([], function(require){

      let logout = require('./logout');

      logout();

    }, 'auth')

  }
});

// Now we login


welcome('home')

exports.welcome = welcome;
