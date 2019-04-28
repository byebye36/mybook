/**
 * 业务模块
 * 处理具体的操作
 * 数据库
 */

//
const path = require('path');
const fs = require('fs');

//引入封装的数据库操作模块
const db = require('./db.js');


//渲染主页面
exports.showIndex = (req, res) => {
    let sql = 'select * from books';
    db.base(sql, null, (result) => {
        //使用模板引擎渲染
        res.render('index', { list: result });
    });

}


//---------------------------------------------
//跳转到图书添加页面
exports.toAddBook = (req, res) => {
    res.render('addBook', {});
}

//添加图书保存数据
exports.addBook = (req, res) => {
    //获取表单数据
    let info = req.body;
    let book = {};//book对象
    for (let key in info) {
        book[key] = info[key];
    }

    let sql = 'insert into books set ?';

    db.base(sql, book, (result) => {
        if (result.affectedRows == 1) {
            //重定向到主页面
            res.redirect('/');
        }
    });

}

//-----------------------------------------------------
//跳转编辑页面
exports.toEditBook = (req, res) => {
    //获取id
    let id = req.query.id;

    let sql = 'select * from books where id = ?';
    let data = [id];

    //
    db.base(sql, data, (result) => {
        //使用模板引擎渲染 模板名称,数据
        res.render('editBook', result[0]);
    });


}


//编辑图书修改信息
exports.editBook = (req, res) => {
    //获取表单数据,使用第三方中间件的API, 返回对象
    let info = req.body;
    let sql = 'update books set name = ?, author = ?, category = ?, description = ? where id = ?';
    let data = [info.name, info.author, info.category, info.description, info.id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1)
            res.redirect('/');
    });
}


///--------------删除图书
exports.delete = (req, res) => {

    //获取get参数的id
    let id = req.query.id;

    let sql = 'delete from books where id = ?';
    let data = [id];
    db.base(sql, data, (result) => {
        //影响行数等于1说明执行成功
        if (result.affectedRows == 1) {
            res.redirect('/');
        }
    });
}
