/**
 * 路由
 */

 const express = require('express');
 const router = express.Router();
 const service = require('./service.js');

//渲染主页
router.get('/',service.showIndex);

//添加图书(跳转到添加页面)
router.get('/toAddBook',service.toAddBook);
//添加图书(提交表单)
router.post('/addBook',service.addBook);

//修改图书(跳转到修改页面)
router.get('/toEditBook',service.toEditBook)
//修改图书提交表单
router.post('/editBook',service.editBook);

//删除图书
router.get('/delete',service.delete)

module.exports = router;