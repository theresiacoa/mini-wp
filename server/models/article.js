const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: String,
  author: String,
  featured_image: {
    type: String,
    required: true
  },
  UserId: String,
  tags: Array
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;