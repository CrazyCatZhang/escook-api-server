const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sincera124',
    database: 'my_db_01'
});

module.exports = db;