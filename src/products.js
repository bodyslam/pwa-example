

const productFile = require('./productFile')

exports.getProducts = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(productFile))
 }