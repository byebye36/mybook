/**图书管理系统
 * 入口
 */

 const express = require('express');
 const router = require('./router.js');
 const path = require('path');
 const bodyParser = require('body-parser');
 const app = express();

 //-----启动静态资源服务----

app.use(express.static('public'));


//----设置模板引擎---------
//设置模板的路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎,指定后缀为art
app.set('view engine', 'art');
//让express兼容art-template模板引擎
app.engine('art', require('express-art-template'));

//-------处理post请求参数--利用第三方中间件-------
// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数
app.use(bodyParser.json());


//------启动服务器功能-----
//配置路由, 单独配置一个路由模块
app.use(router);

//监听端口
app.listen(3000,()=> {
   console.log('running...');
});