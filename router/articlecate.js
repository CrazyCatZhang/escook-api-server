const express = require('express');
const router = express.Router();
const articlecate_handler = require('../router_handler/articlecate');

//导入文章验证规则
const expressJoi = require('@escook/express-joi');
const {add_cate_schema} = require('../schema/articlecate');
// console.log(add_cate_schema);
const {delete_cate_schema} = require('../schema/articlecate');
const {get_cate_schema} = require('../schema/articlecate');
const {update_cate_schema} = require('../schema/articlecate');

router.get('/cate', articlecate_handler.getArticleCategory);

router.post('/addcates', expressJoi(add_cate_schema), articlecate_handler.addArticleCategory);

router.get('/deletecate/:id', expressJoi(delete_cate_schema), articlecate_handler.deleteArticleCategory);

router.get('/cates/:id', expressJoi(get_cate_schema), articlecate_handler.getArticleCategoryById);

router.post('/updatecate', expressJoi(update_cate_schema), articlecate_handler.updateArticleCategoryById);

module.exports = router;
