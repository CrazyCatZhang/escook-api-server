//导入数据库操作模块
const db = require('../db/index');

//导入bcrypt 加密模块
const bcrypt = require('bcryptjs');

//导入生成Token的包
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.register = function (req, res) {
    const userinfo = req.body;
    // console.log(userinfo.username);
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({
    //         status: 1,
    //         message: 'Invalid username or password'
    //     });
    // }
    const sqlStr = `select * from ev_users where username=?`;
    db.query(sqlStr, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            // return res.send({status: 1, message: err.message})
            return res.cc(err);
        }
        // 用户名被占用
        if (results.length > 0) {
            // return res.send({status: 1, message: '用户名被占用，请更换其他用户名！'})
            return res.cc('用户名被占用，请更换其他用户名！');
        }
        // TODO: 用户名可用，继续后续流程...
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        const sql = 'insert into ev_users set ?'
        db.query(sql, {username: userinfo.username, password: userinfo.password}, (err, results) => {
            if (err)
                // return res.send({status: 1, message: err.message});
                return res.cc(err);
            if (results.affectedRows !== 1) {
                // return res.send({status: 1, message: '注册用户失败，请稍后再试！'});
                return res.cc('注册用户失败，请稍后再试！');
            }
            res.send({status: 0, message: '注册成功！'});
        });
    });
    // res.send('register OK');
};

exports.login = function (req, res) {
    const userinfo = req.body;
    const sql = `select * from ev_users where username=?`;
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err);
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！');
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if (!compareResult) {
            return res.cc('登录失败！')
        }
        // TODO：登录成功，生成 Token 字符串
        const user = {...results[0], password: '', user_pic: ''};
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn}, null);
        // console.log(tokenStr);
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr
        });
        // res.send('login OK');
    })
};