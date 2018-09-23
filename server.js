const Express = require('express')
const path = require('path')
const fs = require('fs')
const items = require('./src/products')

const app = new Express
const port = 9999 


app.get('/api/products', items.getProducts)

app.use('/styles', Express.static('./styles'))
app.use('/scripts', Express.static('./scripts'))
app.use('/', Express.static('./'))

app.listen(port, () => {
  console.log(`Server started on ${port}`);
}); 




/**
 * ---- TODO: move these! ----
 */
