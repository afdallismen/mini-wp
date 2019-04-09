const routes = require('express').Router()

routes.use('/articles', require('./articles'))

module.exports = routes