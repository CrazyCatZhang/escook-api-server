const express = require('express');
const router = express.Router();

//注册
router.post('/register', function (req, res) {
    res.send('register OK');
});

//登录
router.post('/login', function (req, res) {
    res.send('login OK');
});

module.exports = router;