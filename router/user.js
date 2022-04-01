const express = require('express');
const router = express.Router();
const userHandler = require('../router_handler/user');

//导入验证中间件
const expressJoi = require('@escook/express-joi');
const {reg_login_schema} = require('../schema/user');

//注册
router.post('/register', expressJoi(reg_login_schema), userHandler.register);

//登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login);

module.exports = router;