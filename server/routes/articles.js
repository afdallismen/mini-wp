const multer = require('multer')

const routes = require('express').Router()
const upload = multer(({ dest: 'public/images/uploads/' }))

const { Article } = require('../controllers')

routes.get('/', Article.list)
routes.post('/', upload.single('cover_img_file'), Article.create)

routes.get('/:article_id', Article.get)
routes.put('/:article_id', upload.single('cover_img_file'), Article.update)
routes.patch('/:article_id', upload.single('cover_img_file'), Article.edit)
routes.delete('/:article_id', Article.delete)

module.exports = routes