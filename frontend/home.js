import welcome from'./welcome';

document.addEventListener("DOMContentLoaded", function(event) {
  //do work
  document.getElementById('loginButton').onclick = function(){


    require.ensure([], function(require){

      let login = require('./login');

      login();

    })

  }
});

// Now we login



welcome('home')

exports.welcome = welcome;
