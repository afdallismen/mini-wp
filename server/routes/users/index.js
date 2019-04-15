const routes = require('express').Router()

const { isLoggedIn, isSelf } = require('../../middlewares/auth')

const {
  findAll,
  findById,
  create,
  deleteById,
  update
} = require('../../actions').user

routes.get('/', (req, res) => {
  findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err))
})

routes.post('/', (req, res) => {
  create(req.body)
    .then(payload => res.status(201).json(payload))
    .catch(err => err.name && err.name === 'ValidationError'
      ? res.status(422).json(err)
      : res.status(500).json(err)
    )
})

routes.get('/:id', isLoggedIn, (req, res) => {
  findById(req.params)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))
})

routes.put('/:id', isLoggedIn, isSelf, (req, res) => {
  update(req.user, req.body)
    .then(updated => res.status(200).json(updated))
    .catch(err => err.name && err.name === 'ValidationError'
      ? res.status(422).json(err)
      : res.status(500).json(err)
    )
})

routes.delete('/:id', isLoggedIn, isSelf, (req, res) => {
  deleteById(req.params)
    .then(deleted => res.status(200).json(deleted))
    .catch(err => res.status(500).json(err))
})

routes.post('/:id/change-password', isLoggedIn, isSelf, (req, res) => {
  changePassword(user, payload)
    .then(payload => res.status(200).json(payload))
    .catch(err => err.name && err.name === 'ValidationError'
      ? res.status(422).json(err)
      : res.status(500).json(err)
    )
})

routes.use('/:id/articles', isLoggedIn, require('./article'))

module.exports = routes