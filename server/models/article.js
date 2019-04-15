const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  featured_image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: { createdAt: 'created_at' }
})

const Article = mongoose.model('article', articleSchema)

module.exports = Article