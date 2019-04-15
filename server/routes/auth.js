const routes = require('express').Router()

const { login } = require('../actions/auth')

routes.post('/login', (req, res) => {
  login(req.body)
    .then(payload => res.status(201).json(payload))
    .catch(err => err.name && err.name === 'ValidationError'
      ? res.status(422).json(err)
      : res.status(500).json(err)
    )
})

module.exports = routes