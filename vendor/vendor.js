// Old scripts do not export anything and often require global parameters
// to be passed. Will use imports-loader webpack component to
// call the Work() function and pass global parameters
function Work(mode){
  setTimeout(function(){
    console.log('Work complete as ' + mode +'!')
  }, workSettings.delay);
}
