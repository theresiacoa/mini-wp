const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  created_at: Date,
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;