const routes = require('express').Router();
const images = require('../helpers/image')
const articleController = require('../controllers/articleController');
const authorization = require('../middlewares/authorization')
const edit_authorization = require('../middlewares/edit_authorization')

routes.get('/', articleController.allData);
routes.post('/', authorization, images.multer.single('image'), images.sendUploadToGCS, articleController.create);
routes.get('/stories', authorization, articleController.allMyStories);
routes.get(`/:articleId`, authorization, articleController.perArticle);
routes.post('/:articleId', edit_authorization ,images.multer.single('image'), images.sendUploadToGCS, articleController.update);
routes.delete('/:articleId', edit_authorization, articleController.delete);



module.exports = routes;