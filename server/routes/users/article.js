const routes = require('express').Router()

const { findAll, create } = require('../../actions/user/article')

routes.get('/', (req, res) => {
  findAll(req.user)
    .then(articles => res.status(200).json(articles))
    .catch(err => res.status(500).json(err))
})

routes.post('/', (req, res) => {
  create(req.body, req.user)
    .then(article => res.status(200).json(article))
    .catch(err => err.name && err.name === 'ValidationError'
      ? res.status(422).json(err)
      : res.status(500).json(err)
    )
})

module.exports = routes