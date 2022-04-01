//导入数据库操作模块
const db = require('../db/index');

//导入bcrypt 加密模块
const bcrypt = require('bcryptjs');


exports.register = function (req, res) {
    const userinfo = req.body;
    // console.log(userinfo.username);
    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            message: 'Invalid username or password'
        });
    }
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
    res.send('login OK');
};