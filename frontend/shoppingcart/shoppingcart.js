export default function(message){

  if(NODE_ENV === 'development'){
    console.log(message)
  }

  alert(`Your shoping cart balance is ${message}`)
}
