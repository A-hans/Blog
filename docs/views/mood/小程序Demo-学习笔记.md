---
title: '小程序Demo-学习笔记'
date: 2021-03-14
sidebar: 'auto'
categories:
 - 前端笔记
tags:
 - 小程序
---

## 前言  

&#160;&#160;&#160;&#160;这是一个基于慕课网的<<微信小程序入门与实战>>的小程序学习笔记,在这里记录了一些我个人认为比较重要的,比较需要注意的点  
[源码地址](https://github.com/A-hans/MiNi-Program-Demo)
&#160;&#160;&#160;&#160;**欢迎补充,一起交流,一起进步😆**

## 小程序的基本概述  

&#160;&#160;&#160;&#160;小程序可以理解为一个基于HTML,CSS,JS由微信团队自己搞得一套框架,它不同于Vue和React(当然现在也有使用Vue和React来进行开发的跨平台解决方案),但又有一些相似之处  

+ app.json为小程序运行的最低配置需要文件
+ 小程序一个页面由(js,wxml,wxss,json)文件所组成
+ 小程序自带路由在app.json中的pages里进行配置(数组的第一项为默认启动页)
+ 小程序引入了rpx作为计量单位,1px=2rpx(在iPhone6屏幕的尺寸大小下)
+ 小程序同样可以使用第三方组件库,通过npm安装,但在使用上需要在工具中构建npm,会将你引入的组件自动生成一个对应的文件夹,在你需要使用的页面的.json中的usingComponents中进行配置,全局使用组件则在app,json中配置格式为:("componentsName": path)
+ 需要访问指定页面可以在编译模式中添加指定的路由  
+ 小程序也拥有简易的双向绑定

## 组件的使用  

&#160;&#160;&#160;&#160;小程序本身可以理解为一个框架,在此框架中有着内置封装好的组件可以直接使用,使用原生的组件不需要在usingComponents中引入使用,可以直接以标签的形式在wxml中进行使用

### Swiper
  
&#160;&#160;&#160;&#160;Swiper(轮播组件)是一个开发中经常会遇到的一个需求,在小程序中以标签的形式直接使用  

  ```html
  <swiper></swiper>
  ```

&#160;&#160;&#160;&#160;当让只引入一个Swiper还不足以能让轮播图滚动起来,swiper标签在这充当着存放轮播内容的容器作用,若要控制内容的显示大小还需要给定swiper一个指定的宽高  
&#160;&#160;&#160;&#160;容器现在有了,需要在swiper中放入轮播的内容则需要与swiper-item配合使用  

```html
<swiper>
  <swiper-item>
<!-- 此处为轮播内容 -->
</swiper-item>
</swiper>
```

&#160;&#160;&#160;&#160;swiper还有一些属性可以进行配置,具体配置参考[Swiper](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html)  

```html
<view>
  <swiper circular="{{true}}" 
          interval="{{3000}}" 
          indicator-dots="{{true}}" 
          autoplay="{{true}}">
  <swiper-item>
    <image src="/images/bestplayers.png"></image>
  </swiper-item>
  <swiper-item>
    <image src="/images/lpl.png"></image>
  </swiper-item>
  <swiper-item>
    <image src="/images/jumpfly.png"></image>
  </swiper-item>
  </swiper>
```

+ 小程序中若需要传入一个布尔值或变量需要使用{{}}来进行传值,不加默认为一个字符串形式,(虽然由内容的字符串也为true,但是"false"也同样为true,这一块需要注意)

## 关于布局  

&#160;&#160;&#160;&#160;小程序推荐使用flex布局  

+ 布局思路

1. 将整个容器设置为flex  
2. 思考flex的布局方向为横向还是纵向  
3. 使用语义化标签  

+ 举个栗子:  
[![6BMOGd.jpg](https://s3.ax1x.com/2021/03/15/6BMOGd.jpg)](https://imgtu.com/i/6BMOGd)

```html
<view class="post-container">
    <view class="post-author-date">
      <image class="post-author" src="{{avatar}}"></image>
      <text class="post-date">{{date}}</text>
    </view>
    
    <text class="post-title">{{title}}</text>

    <image class="post-image" src="{{image}}"></image>

    <text class="post-content">{{content}}</text>

    <view class="post-like">
      <l-icon class="post-like-image" name="favor" size="{{32}}" color="#666"/>
      <text class="post-like-font">{{likes}}</text>
      <l-icon class="post-like-image" name="eye" size="{{32}}" color="#666"/>
      <text class="post-like-font">{{views}}</text>
    </view>  
```  

## 小程序中数据的定义/使用  

&#160;&#160;&#160;&#160;小程序的数据渲染通现代话前端框架一样都是关注视图层(View),我们需要把在页面中展示的数据定义在对应页面的Js文件中的data对象中,或者使用this.setData进行数据存储  

```js
//第一种方式
data:{
  title:"我是标题"
}
//第二种
onLoad(){
  this.setData({
    title:"我是标题"
  })
}
```  

+ this.setData同在data中定义一样,在执行完成后会将数据一起添加到data中(不是显示的)  
两种方式的使用:  

1. 在data中推荐对变量进行初始化时使用(主要在于初始化)
2. this.setData推荐在更新data中的数据,或者在新的方法执行完成后需要存储数据是使用(主要在于更新数据)
3. 使用data中定义的数据需要使用this.data.title(不同于Vue,需要注意)  

在wxml中使用data中的数据  

```html
<!-- {{}}用于变量的使用 -->
<view>
  <text>{{title}}</text>
</view>
```  

## 小程序的生命周期  

&#160;&#160;&#160;&#160;同其它框架一样,小程序也拥有自己的生命周期和页面生命周期,详细参考:[生命周期](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html)

+ 主要执行顺序为  
**onLoad**: 页面加载时执行  
**onShow**: 页面展示则执行  
**onready**: 页面第一渲染完成时执行  
**onhide**: 页面被隐藏时执行(例如进入后台,页面切换但未卸载)
**onunload**: 页面卸载时执行(例如页面跳转时执行)
