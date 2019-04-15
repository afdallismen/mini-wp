const { Article } = require('../../models')

module.exports = {
  findAll: payload => Article.find({ author: payload._id }),
  create: (payload, user) => {
    return Article
      .create({
        title: payload.title,
        content: payload.content,
        featured_image: payload.featured_image,
        author: user._id
      })
  }
}