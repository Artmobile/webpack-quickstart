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
// Moment is to big for the excersise. Uncomment it to see that
// module moment can be downloaded from node_modules directory
let moment = require('moment')
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
//endregion

//region Load with context

// require.context can be used to load an entire folder and its subfolders,
// Note that the second parameter indicates whether or not we want to scan the subfolders of a given path
// Also note, that if we provide in the file mask regex too generic match expression, the files will be loaded twice.
// For example, if you use /.*/ instead of /.js/, <file>.js will be loaded twice (as observed). Apparently this is
// because of how webpack breaks the require() content. It looks at folder/ name adn extensions separately and perform
// several passes while scanning. So file <file>.js will be found first because it matches *  and then because
// it matches .js
let context = require.context('./app-context/', true, /.js$/);

context.keys().forEach(function(path){

  let module = context(path);
  module();
});

//endregion Load with context

//region Load as bundle
// If we want webpack not to include the file into the entry point, we can use bundle-loader
// bundle-loader will wrap the javascript file into require.ensure and leave the original
// javascript file external to the entry point.

let handler;

try{
  // Even though the function
  handler = require('bundle!./bundles/somebundle');
}
catch(e){
  alert("No such path");
}

if(handler) {
  handler(function(bundle){
    // Invoke whatever the bundle exported
    bundle();
  })
}
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


welcome('home')

exports.welcome = welcome;
