const { Article } = require('../models')

module.exports = {
  findAll: () => Article.find()
}