---
title: 'Hans-Music-我的第一个手写Vue项目'
date: 2021-02-10
sidebar: 'auto'
categories:
 - 前端笔记
tags:
 - vue
 - 项目实战
sticky: 1
---

***## :speech_balloon:前言***

欢迎来到我的网易云频道

初步学习完Vue的知识后急需找一个项目来练手,在网上看了很多人做的"网易云音乐",也想着自己着手搞一个自己的''网易云'',于是就有了这个项目  

本项目基于Vue全家桶编写,使用了ElementUI组件库,布局方面参考了lxhcool的[nicemusic](http://nicenav.cn/desktop-music/#/home)(界面真的超级漂亮😉)

在此还要感谢binaryify大佬提供的接口 。

***## 🚀 如何运行***

> node 版本 `[12.18.1]`

```
#克隆

git clone https://github.com/A-hans/Hans-Music.git
```

```
# 打开项目目录

cd Hans-Music
```

```
# 安装依赖

npm install
```

```

# 开启本地服务运行项目

npm run serve

```

***## 技术栈***

***### :point_right: 主要依赖***

- Vue 全家桶

- Element UI

- Better-Scroll

 [网易云音乐 API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)

***### :clap: 项目演示***

[demo地址](http://47.115.119.92/)（推荐使用chrome浏览器)

***## :mega: 主要功能***

***首页***

- [x] 轮播图(暂不支持播放视频)

- [x] 推荐歌单

- [x] 推荐歌曲(支持播放)

- [x] 推荐歌手

***排行榜页***

- [x] 云音乐热榜

- [x] 全球音乐热榜

***歌单页***

- [x] 按分类切换歌单

- [x] 加载更多歌单

- [x] ~~歌单详细页(歌曲数量上限目前在1200首,尚未解决此bug)~~ 已解决

***歌手页***

- [x] 按标签查找歌手分类

- [x] 加载更多歌手

- [x] 歌手详细页

***搜索***

- [x] 热门搜索展示

- [x] 搜索歌曲/歌手/专辑/歌单

***播放器***

- [x] 自动播放

- [x] 切歌

- [x] 播放模式(顺序/随机/单曲)

- [x] 歌词展示

- [x] 播放列表

- [x] 进度条

- [x] 音量控制条(默认为50%)

- [x] 点击歌手跳转至详情页

- [x] 播放详细页展示

- [x] 点击喜欢按钮,加入喜欢列表

***登录***

- [x] 个人中心页(账户为网易云音乐手机号)

- [x] 退出账户

- [x] 刷新保持登录状态(调用的sessionStorage,登录状态仅保持到浏览器关闭)

***## :computer: 部分截图***

个人中心

[![DRkbEn.jpg](https://s3.ax1x.com/2020/11/30/DRkbEn.jpg)](https://imgchr.com/i/DRkbEn)

首页

[![DRAmKe.jpg](https://s3.ax1x.com/2020/11/30/DRAmKe.jpg)](https://imgchr.com/i/DRAmKe)

歌单&歌单详情

[![DRASu4.jpg](https://s3.ax1x.com/2020/11/30/DRASu4.jpg)](https://imgchr.com/i/DRASu4)

[![DRkxvF.jpg](https://s3.ax1x.com/2020/11/30/DRkxvF.jpg)](https://imgchr.com/i/DRkxvF)

歌手页&&歌手详细页

[![DRkqNq.jpg](https://s3.ax1x.com/2020/11/30/DRkqNq.jpg)](https://imgchr.com/i/DRkqNq)

[![](https://s3.ax1x.com/2020/11/30/DRkL40.jpg)](https://imgchr.com/i/DRkL40)

搜索展示

[![DRAF4x.jpg](https://s3.ax1x.com/2020/11/30/DRAF4x.jpg)](https://imgchr.com/i/DRAF4x)

播放详细页

[![ydnBNQ.jpg](https://s3.ax1x.com/2021/02/09/ydnBNQ.jpg)](https://imgchr.com/i/ydnBNQ)

***## :page_with_curl: 项目布局***

```markdown

# | --dist 生成打包后的文件

# | --node_modules 安装的依赖包

# | --public 静态资源会被输出到目录dist

# | --src

# |  |--assets 存放静态资源，图片等等

# |  |  |--css 公共样式相关

# |  |  |--img 存放图片资源

# |  |--common 存放公共函数

# |  |  |--alias.js 变量别名

# |  |  |--utils.js 工具函数

# |  |--components 公用组件

# |  |  |--common 公共组件

# |  |  |  |--Scroll 封装better-scroll工具

# |  |  |  |--content 公共组件(仅限本项目)

# |  |  |  |  |--Footer 底部相关

# |  |  |  |  |--Player 播放器相关

# |  |  |  |  |--PlaylistTable 歌曲列表相关

# |  |  |  |  |--SingerList 歌手列表相关

# |  |  |  |  |--SongList 歌单列表相关

# |  |  |  |  |--TabBar 顶部导航相关

# |  |--network 网络请求相关

# |  |  |--Album.js 专辑页面相关请求

# |  |  |--Home.js 首页相关页面请求

# |  |  |--Login.js 登录相关网络请求

# |  |  |--Playlist 歌单相关网络请求

# |  |  |--Rank.js 排行榜相关网络请求

# |  |  |--Request.js 封装axios对象

# |  |  |--Search.js 搜索相关网络请求

# |  |  |--Singer.js 歌手相关网络请求

# |  |  |-- Song.js 歌曲相关网络请求

# |  |--router vue-router相关配置

# |  |  |--index.js 路由配置，路由守卫配置

# |  |--store Vuex相关配置

# |  |--views 页面组件

# |  |  |--Detail 详情页组件

# |  |  |  |--DetailAlbum 专辑详情页相关组件

# |  |  |  |--DetailPlaylist 歌单详情页相关组件

# |  |  |  |--DetailProfile 个人中心页相关组件

# |  |  |  |--DetailSinger 歌手详情页相关组件

# |  |  |  |--DetailUser 用户页面相关组件

# |  |  |--Home 首页相关组件

# |  |  |--Playlist 歌单页相关组件

# |  |  |--Rank 排行榜页相关组件

# |  |  |--Search 搜索页相关组件

# |  |  |--Singer 歌手页相关组件

# |  |--App.vue 根组件

# |  |--main.js 入口文件

```

>如果觉得还行的话可以给个star🌟,***你的star是我继续完善项目的最大动力***😘

***## 作者***

👤 ***********Hans***********