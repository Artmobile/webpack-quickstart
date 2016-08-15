module.exports = [
    {
        test:/vendor.js$/,
        loader: 'expose?Work!imports?workSettings=>{delay:500}!exports?Work'
    }
]