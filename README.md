

# 项目简介
这是一个简单的博客项目，包括了前台博客内容展示页面，和后台管理系统，和node后端接口程序。整个项目前后端分离。之所以会有这个项目，是因为刚学完node koa2框架以后正好工作不太忙，如果不做点什么的话，觉得很对不起这么多天的学习，也算是对所学知识的一个总结。于是琢磨这自己搞点东西出来，人活着嘛就是为了折腾，于是就开始着手鼓捣了，然后就有了这个博客。整个项目断断续续用了差不多半个多月时间，晚上下班回来 加上周六日的时间。项目不大，后端常用的一些功能也都有用到，包括token登录，设置登录超时时间，图片上传，静态资源托管等，和常用的数据库查询语法，增删改查，排序，分页，模糊查询，多链表查询等等。

# 技术栈

- 服务端  Node + Koa2 框架开发的 Restful API
- 前端 vue 开发的前端和后台管理系统

# 项目包含功能

[koa2](https://www.npmjs.com/package/koa)
[koa-router](https://www.npmjs.com/package/koa-router)
[mysql](https://www.npmjs.com/package/mysql)

- koa2服务端
    - 管理员权限控制
    - 文章
    - 文章分类
    - 评论列表
- vue 前端博客网站
- vue 后台管理系统

# 项目用到知识点
- koa koa-router 开发 Restful API接口
- koa-router 路由拆分
- koa-cors 处理跨域
- koa-static 静态文件托管
- koa-better-body 接收处理请求参数
- jsonwebtoken 前后端分离 token控制登录状态
- mysql co-mysql 查询数据库
- 全局异常处理
- async/await 异步编程
- 前后端分离
- vue + vue-router + vuex + iview 开发单页面 博客前台和后台管理系统

# 使用和学习

### 数据库
```
#数据库存放目录
/config/yangblog.sql

# 需要在自己电脑安装好mysql 
mysql -u root -p 密码登录

# 新建同名yangblog空数据库
create database yangblog;

# 使用已创建的数据库 
use yangblog;

# 然后导入数据库
source /node-koa2-blog/config/yangblog.sql

没有报错的话说明导入成功
```

### 克隆项目
```
git cloen https://github.com/dadanihoutao/node-koa2-blog.git

#切换到项根目录全局安装 supervisor 插件，此插件用来实时监听node代码并更新，类似前端webpack热重载，不用重启服务。安装命令如下
npm install supervisor -g

#安装node 依赖包
npm install

#安装成功以后 直接在项目根目录下运行如下命令启动服务
npm run dev

#如果数据库连接不上的话可能是账号密码不一样，需要再 /config/config.js 文件中修改数据库配置文件

# /admin 目录是后台管理系统文件，切换到 /admin 目录 安装依赖
npm install

#启动后台管理项目
npm run dev 
会自动打开浏览器

# /web 目录是 前台博客页面， 切换到 /web 目录，安装依赖
npm install 

#启动前端项目
npm run dev
会自动打开浏览器
```


### 接口文档还没有写，有时间了会补上

有需要的同学可以先拿去学习，如果你还喜欢或者对自己有帮助，欢迎<strong style='color:red;'>star</strong>我。如果你有什么好的建议或者意见，也希望你提  [Issues](https://github.com/dadanihoutao/node-koa2-blog/issues) 告诉我，大家一起讨论交流学习。

### 项目参考资料
- [梁风波博客项目,参考前台后台页面样式布局](https://github.com/liangfengbo/nodejs-koa-blog)
- [开课吧第六期全栈架构师](https://www.kaikeba.com/vipcourse/web)