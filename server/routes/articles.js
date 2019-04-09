const routes = require('express').Router()

const { Article } = require('../controllers')

routes.get('/', Article.list)
routes.post('/', Article.create)

routes.get('/:article_id', Article.get)
routes.put('/:article_id', Article.update)
routes.patch('/:article_id', Article.edit)
routes.delete('/:article_id', Article.delete)

module.exports = routes