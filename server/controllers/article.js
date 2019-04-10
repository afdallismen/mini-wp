const models = require('../models')

class Article {
  static list (req, res) {
    let query = {}
 
    if (req.query.title) {
      query = { title: { $regex: `.*${req.query.title}.*`, $options: 'i' }}
    }

    models.Article
      .find(query)
      .then(articles => res.status(200).json(articles))
      .catch(err => res.status(500).json(err))
  }

  static get (req, res) {
    models.Article
      .findById(req.params.article_id)
      .then(article => res.status(200).json(article))
      .catch(err => res.status(500).json(err))
  }

  static create (req, res) {
    models.Article
      .create({
        title: req.body.title,
        content: req.body.content,
        cover_img: req.file.filename
      })
      .then(createdArticle => res.status(201).json(createdArticle))
      .catch(err => res.status(500).json(err))
  }

  static update (req, res) {
    models.Article
      .findById(req.params.article_id)
      .then(article => {
        article.cover_img = req.file.filename
        article.title = req.body.title
        article.content = req.body.content
        return article.save()
      })
      .then(updatedArticle => res.status(200).json(updatedArticle))
      .catch(err => res.status(500).json(err))
  }

  static edit (req, res) {
    models.Article
      .findById(req.params.article_id)
      .then(article => {
        Object.keys(req.body).forEach(key => {
          article[key] = req.body[key]
        })
        
        if (req.file) {
          article.cover_img = req.file.filename
        }

        return article.save()
      })
      .then(editedArticle => res.status(200).json(editedArticle))
      .catch(err => res.status(500).json(err))
  }

  static delete (req, res) {
    models.Article
      .findById(req.params.article_id)
      .then(article => {
        return article.remove()
      })
      .then(removedArticle => res.status(200).json(removedArticle))
      .catch(err => res.status(500).json(err))
  }
}

module.exports = Article