---
title: 'Axios'
date: 2020-09-01
sidebar: 'auto'
categories:
 - 前端笔记
tags:
 - vue
 - axios
---



## 说明

本文中的接口由于一些原因不方便展示所以用'xxx'所代替(尊重接口作者的劳动成果)  

## 1.简单介绍  

### axios(ajax i/o system)  

+ 易用、简洁且高效的http库
+ 支持Promies
+ 拦截转换请求和响应数据
+ 支持node端和浏览器
+ 目前是Vue官方推荐的网络状态请求工具  

## 2.全局使用

### 2.1 安装

```js
npm install axios --save
```

将包安装在dependencies中，因为我们在项目使用中还要用到它  

### 2.2.1 基本使用

首先我们在我们的工程文件中引入它  

```js
import axios from 'axios'
```

如何发送一个网络请求？（默认使用get请求方式）  

```js
axios({
  url:'xxxxxxxxxx',
}).then(res=>{
  console.log(res)
})
```

因为axios本身就会返回一个Promise对象 ，所以直接调用then方法对返回的后端数据进行一个处理，此时打开浏览器控制台将会看到从服务器返回的对象  

```js
Object
config: {transformRequest: {…}, transformResponse: {…}, timeout: 0, xsrfCookieName: "XSRF-TOKEN", adapter: ƒ, …}
data: {data: {…}, returnCode: "SUCCESS", success: true}
headers: {content-length: "4605", content-type: "application/json"}
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
status: 200
statusText: "OK"
__proto__: Object
```

status:200，表示成功从后台获取数据  
调用axios方法，在方法里传入url(数据接口)，这就是axios网络请求的最基本的用法  
更多的请求方法详见：[axios中文文档](http://www.axios-js.com/zh-cn/docs/index.html#%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95%E7%9A%84%E5%88%AB%E5%90%8D)  

### 2.2.2 带有查询字符串的url  

面对带有查询字符串的url，例如:<http://:xxxxx/data?type=pop&page=3>,在axios中运用params属性(参数)来进行处理

```js
axios({
  url:'xxxxxxx/data',
  params:{
    type:'pop',
    page:'3'
  }
}).then(res=>{
  console.log(res);
})
```  

通过params传入参数，会自动对get方式查询字符串进行拼接  

### 2.2.3 并发请求

由于axios返回的是一个Promise对象，想要同时请求多个数据的话同样可以使用一个all方法  

```js
axios.all([axios({
  url:'http://xxxxxx'
}),axios({
  url:'http://xxxxxx/data',
  params:{
    type:'pop',
    page:'3'
  }
})]).then(result=>{
  console.log(result);
})
```  

### 2.2.4 默认配置

此时，当我们在进行多条请求，每次都是从同一个服务器请求数据时，每次都要配置相同的url未免有点麻烦，axios为此也提供了默认url配置（baseURL），不仅如此，axios还提供了别的配置选项，比如timeout

```js
axios.defaults.baseURL='http://xxxxxxxx' //服务器地址
axios.defaults.timeout=5000  //超时时间
```

现在你只需要着重写url中的路由(查询字符串)就可以了  

```js  
axios.all([axios({
  url:'/home/multidata'
}),axios({
  url:'/home/data',
  params:{
    type:'pop',
    page:'3'
  }
})]).then(axios.spread((res1,res2)=>{
  console.log(res1);
  console.log(res2);
})
)
```  

关于更多axios的配置选项参考[axios请求配置](http://www.axios-js.com/zh-cn/docs/index.html#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE)  
在这里url1为<http://xxxxx/home/multidata>,url2为'<http://xxxxx/home/home/data?type=pop&type=3>  
同时这里使用了spread方法(展开多个数组)来分别拿到我们返回的多条数据，这是对上面并发请求的补充  

## 3.局部使用  

当掌握了axios的基本用法，配置了默认预设的url，但随着项目的扩大，可能会遇到不止向一台服务器发送请求的问题，这时全局使用axios就变的不够方便了，为避免请求多个服务器数据，则就需要创建对应的axios实例

### 3.1.1 创建实例

```js
 const instance = axios.create({
   baseURL: 'http://xxxxx',
   timeout: 3000
 })
```  

axios里自带了create方法，用此方法创建对应的axios实例，在对应的实例中进行相应的配置,需要多个服务器请求则创建多个实例

### 3.1.2 使用实例对象

```js
instance({
  url: '/home/data',
  params:{
    type:'pop',
    page:1
  }
}).then(res=>{
  console.log(res);
})
```

此时的instance就是一个axios对象  

## 4.axios的封装

### 4.1 为什么要封装

在我们Vue的实际开发中，如果在组件中直接引用axios开发，则对此框架依赖性太强  
**缺点**: 若要更改网络请求框架或axios不在维护需要替换框架，则需要在组件中一个个进行修改，维护成本过高  
此时对axios进行封装，在一个地方进行集中管理(一般在根目录下新建一个network文件夹，在里面创建对应的请求js文件，在此先创建一个request.js)  
调用时，调用request,若有多个服务器请求，定义多个模块将其导出  

```js
import axios from 'axios';
export function request(config,success,failure) {
  const instance = axios.create({
    //1.创建axios实例
    baseURL: 'http://xxxx',
    timeout: 3000
  })
  //instance时一个promise对象
  instance(config).then(res => {
       success(res)
  }).catch(err => {
       failure(res)
  })
```  

使用时，传入config，若服务器请求响应成功，传入success，在then中回调一个success方法，失败则传入failure,正在catch中回调failure方法

### 4.2 使用request模块  

首先在要使用网络请求的对应文件中引入封装好的request模块

```js
import { request } from './network/request'
request(
  {url: '/home/data',
  params:{
    type:'pop',
    page:1
  }},(res=>{
    console.log(res);
  })
)
```  

### 4.2.1 回调函数的理解  

因为我也是初学者，感觉这一块有点绕，这是当时在学习时画的图，会比较好理解

![0VoP2t.jpg](https://s1.ax1x.com/2020/09/28/0VoP2t.jpg)

### 4.2.3 request模块改进

由于instance本身返回一个Promise对象，对上述代码进行改进  

```js
export function request(config){
  const instance=axios.create({
    baseURL:'http://xxxxx',
    timeout:3000
  })
  //instance本身就是一个promis对象
  return instance
}

```

调用reuqest()  

```js  
request({
  url: '/home/data',
  params: {
  type: 'pop',
  page: 1
  }
 })
 .then(res=>{
   console.log(res);
 })
 .catch(err=>{
   console.log(err);
 })
```

此时一个axios模块封装就完成了，使用时直接调用request方法，若要更换网络请求框架则也只需要在request.js文件当中进行更改  

## 5.拦截器

axios提供了拦截器，在你发送网络请求/响应时提供了拦截可进行的操作  
详见：[axiosx拦截器](http://www.axios-js.com/zh-cn/docs/index.html#%E6%8B%A6%E6%88%AA%E5%99%A8)

### 5.1 拦截器四种模式

+ 请求成功
+ 请求失败
+ 响应成功
+ 响应失败

### 5.2 拦截器能做什么

+ 1.比如config中的一些信息与服务器不匹配
+ 2.每次发送网络请求时需要界面显示一个图标（加载中图标）
+ 3.某些网络请求需要携带一些信息（比如登陆时需要一个token）

### 5.3 全局使用  

```js
Axios.intereptors.request.use(success(config)=>{}.err=>{})
Axios.intereptors.respone.use(success(config)=>{}.err=>{})
```

### 5.4 实例中使用  

### 5.4.1 请求拦截

```js
 //请求拦截
  instance.interceptors.request.use(config => {
    // Do something before request is sent
      return config//处理完之后要将数据返回回去
    },error => {
    // Do something with request error
      console.log(error);
    });
```

### 5.4.2 响应拦截  

```js
 //响应拦截
    instance.interceptors.response.use(config=>{
      console.log(config);
      return config.data //一般返回data
    },error=>{
      console.log(error);
    })
```  

在处理完操作后一定要记得把数据返回回去
