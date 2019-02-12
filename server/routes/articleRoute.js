const routes = require('express').Router();
const articleController = require('../controllers/articleController');

routes.get('/', articleController.allData);
routes.post('/', articleController.create);
routes.put('/:articleId', articleController.update);
routes.delete('/:articleId', articleController.delete);


module.exports = routes;