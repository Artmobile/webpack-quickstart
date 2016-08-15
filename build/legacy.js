module.exports = [
    {
        test:/vendor.js$/,
        loader: 'imports?workSettings=>{delay:500}!exports?Work'
    }
]