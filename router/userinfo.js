const express = require('express');
const router = express.Router();
const userinfo_handler = require('../router_handler/userinfo');

//导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi');
const {update_info_schema} = require('../schema/user');

//导入验证密码的中间件
const {update_password_schema} = require('../schema/user');

//导入验证头像规则的中间件
const {update_avatar_schema} = require('../schema/user');

router.get('/userinfo', userinfo_handler.getUserInfo);

router.post('/userinfo', expressJoi(update_info_schema), userinfo_handler.updateUserInfo);

router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword);

router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar);

module.exports = router;