const routes = require('express').Router()

const { findAll } = require('../actions/article')

routes.get('/', (req, res) => {
  findAll()
    .then(articles => res.status(200).json(articles))
    .catch(err => res.status(500).json(err))
})

module.exports = routes