const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: 'Article title can\'t be empty',
    trim: true
  },
  content: {
    type: String,
    required: 'Article content can\'t be empty'
  }
}, {
  timestamps: { createdAt: 'created_at' }
})

const Article = mongoose.model('article', articleSchema)

module.exports = Article