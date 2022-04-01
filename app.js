const express = require('express');
const app = express();

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

//注册路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

app.listen(3007, () => {
    console.log('api server listening on http://localhost:3007');
});