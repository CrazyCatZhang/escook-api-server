const express = require('express');
const app = express();

//导入并配置cors中间件
const cors = require('cors');
app.use(cors());

//配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}));

app.listen(3007, () => {
    console.log('api server listening on http://localhost:3007');
});