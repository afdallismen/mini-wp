const app = require('express')()

app.use('/auth', require('./auth'))
app.use('/users', require('./users'))
app.use('/articles', require('./article'))

module.exports = app