const Article = require(`../models/article.js`)

class ArticleController {

  static allData(req, res) {
    Article
      .find({})
      .then(allData => {
        res.json(allData);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  static perArticle(req, res) {
    Article 
      .findOne({_id: req.params.articleId})
      .then(article => {
        res.json(article)
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  static allMyStories(req, res) {
    Article
      .find({UserId: req.decoded.id})
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  static create(req, res) {
    let newData = {
      title: req.body.title,
      content: req.body.content,
      created_at: new Date().toLocaleDateString(),
      author: req.decoded.username,
      featured_image: req.file.cloudStoragePublicUrl,
      UserId: req.decoded.id,
    }
    Article
      .create(newData)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  } 

  static update(req, res) {
    let permittedKeys = ['title', 'content', 'featured_image'];
    let input = req.body;
    let filtered = {};
    permittedKeys.forEach(key => {
      if (input[key]) {
        filtered[key] = input[key]
      }
    });

    if (req.file) {
      filtered.featured_image = req.file.cloudStoragePublicUrl
    }

    Article
      .findByIdAndUpdate(req.params.articleId, filtered, {new: true})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  static delete(req, res) {
    console.log(req.params.articleId)
    Article
      .findByIdAndDelete(req.params.articleId)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  
}

module.exports = ArticleController;