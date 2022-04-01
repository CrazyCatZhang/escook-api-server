const express = require('express');
const app = express();
const joi = require('joi');

//导入并配置cors中间件
const cors = require('cors');
app.use(cors());

//配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}));

//封装自定义错误中间件
app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        });
    };
    next();
});

//在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt');
const config = require('./config');
app.use(expressJWT({secret: config.jwtSecretKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}));

//注册用户登录注册路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

//注册个人信息路由模块
const userInfoRouter = require('./router/userinfo');
app.use('/my', userInfoRouter);

//定义错误级别的中间件
app.use((err, req, res, next) => {
    //验证合法性失败
    if (err instanceof joi.ValidationError) return res.cc(err);
    //身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');
    res.cc(err);
});

app.listen(3007, () => {
    console.log('api server listening on http://localhost:3007');
});