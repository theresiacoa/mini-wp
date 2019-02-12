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

  static create(req, res) {
    Article
      .create(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  } 

  static update(req, res) {
    let permittedKeys = ['title', 'content'];
    let input = req.body;
    let filtered = {};
    permittedKeys.forEach(key => {
      console.log(key);
      console.log(req.body)
      // console.log(input[key]);
      if (input[key]) {
        filtered[key] = input[key]
      }
    });
    console.log(filtered);
    Article
      .findByIdAndUpdate(req.params.articleId, filtered, {new: true})
      .then(data => {
        // console.log(data);
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({err: err.message})
      })
  }

  static delete(req, res) {

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