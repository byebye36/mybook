/**
 * 封装操作数据的API
 */
//引入相关包
const mysql = require('mysql');

//-----导出模块---
exports.base = (sql, data, callback) => {
    //创建数据库连接
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mybook'
    });

    //执行连接操作
    connection.connect();

    //操作数据库(数据库操作是异步的)
    connection.query(sql, data, (error, results, fields) => {
        if (error) throw error;
        callback(results);
    });

    //关闭数据库
connection.end();
}
