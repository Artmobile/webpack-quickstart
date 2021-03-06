import welcome from './welcome';
import angular from 'angular';

//region  Attempt to invoke a non-commonjs third party component
// Using imports-loader webpack plugin to pass workSettings.delay parameter
// (note the lambda settings). Export must come after import
// For more details:
//    http://webpack.github.io/docs/shimming-modules.html
let vendor = require('vendor');
vendor("local"); // Note that Work function became default export, so just call vendor(), not vendor.Work()

// Work is exposed via expose-loader plugin (see legacy.js). It sis similar to ProvidePlugin but here we can declare
//  what to expose while exporting
Work("global");

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

//
// region Externals usage example

$(function(){

  let users = [
    {id:"abcd", name: "John"},
    {id:"dbfe", name: "Jane"},
    {id:"xdfr", name: "Arthur"}
  ]


  // Using lodash from CDN and from node_modules at the same time

  // Map is defined in ProviderPlugin section in webpack.config.js
  let agents = map(users, function(user){
    return {
      id: user.id,
      name: user.name,
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
  })

  // This one is explicitly required
  let union = require('lodash/union')

  // This comes from the externals section inside webpack.config.js
  if(!_.isEmpty(agents))
    console.log(union(agents, [{id:'bbbb', name:'Alice'}]));

})

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
