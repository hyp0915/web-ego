## 项目介绍
后台管理系统 
1. 人事系统
2. 学校系统--教育系统
3. 商城后台系统
4. 在线课堂 后台系统 
5. ... 


## 项目安装的依赖
1. vue- router- vuex 
2. vue add element 
3. npm i axios --save
4. npm i jwt-decode --save 

## 初始化项目配置
1. 删除无用的组件
2. 初始化css 


## 布局视图 layout

## 路由守卫

## 登录界面
1. element-ui 选项卡 tab组件
2. form组件
3. 登录一个界面 注册一般都是一个单独的组件 （目前：在一起）
   
## 后台
1. ego.sql 导入你的数据库里面
2. 创建一个后台的文件服务： server  依赖安装在项目下
3. 后台依赖
   1. npm i express mysql --save 
   2. npm i jsonwebtoken --save 
   3. 启动server文件： nodemon index.js


## 前后台接口访问 （联调）
1. 配置网络请求信息  api 文件 base.js  index.js 
2. 配置请求的接口文件 utils 
3. 反向代理跨域访问
   vue.config.js
   module.exports = {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:5000',//目的地址路径
                    changeOrigin: true,//允许跨域
                    pathRewrite: {//重定向
                        "^/api": ""
                    }
                },
                //.... 
            }
        }
    }

## 


