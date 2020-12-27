---
title: 'TabBar的几种实现方式'
date: 2020-12-27
sidebar: 'auto'
categories:
 - 前端笔记
tags:
 - javaScript
 - vue
---

&#160;&#160;&#160;&#160;TabBar是现在几乎所有页面都具有的一个最常见的功能,它的作用就是点击时,按钮的样式和内容要随着鼠标的点击而切换,在这周的工作学习中了解到了JQuery实现选项卡的方法,因此在这总结一下我所了解的几种实现TabBar的方式  
**注:** 同一个功能可能有一百种实现的方法,在此仅提供一种实现的思路

## 示例Html代码

```html
 <style>
    #change-tab{
      width: 320px;
      text-align: center;
    }

    .btn{
      margin: 10px 0;
      padding: 0;
      width: 100px;
      cursor:pointer;
    }

    .content{
      height: 200px;
      border: 1px solid black;
      display: none;
    }

    .active {
      background-color: yellow;
    }
  </style>

  <div id='change-tab'>
    <button class='btn' >新闻</button>
    <button class='btn' >娱乐</button>
    <button class='btn' >科技</button>
    <div class='content'>
      <p>我是新闻内容</p>
    </div>
    <div class='content'>
      <p>我是娱乐内容</p>
    </div>
    <div class='content'>
      <p>我是科技内容</p>
    </div>
  </div>
```

**实现效果**

[![rIjka8.md.jpg](https://s3.ax1x.com/2020/12/28/rIjka8.md.jpg)](https://imgchr.com/i/rIjka8)

## 原生JS实现

**实现思路:** 使用两次for循环,第一次遍历点击事件,将点击对应元素的样式激活,第二次遍历则用于重置所有元素的样式

```js
//1.获取需要操作的DOM元素
let oBtn = document.getElementByClassName('btn');
let oContent = document.getElementByclassName('content');

//2.默认状态下激活第一组样式
oBtn[0].calssList.add('active');
oContent[0].style.display = 'block';

//3.循环点击事件
for(let i=0;i<oBtn.length;i++){
  //在对应点击的元素对象中增加一个index作为与内容匹配的唯一值
  oBtn[i].index=i;
  oBtn[i].onclick = function(){
    //第二次循环用于初始化样式
    for(let j=0;j<oBtn.length;j++){
      oBtn[j].classList.remove('active');
      oContent[j].style.display = 'none';
    }
    //此处this指向oBtn[i]
    this.classList.add('active');
    oContent[this.index].style.display = 'block';
  }
}
```

## JQuery实现

**实现思路:**  JQuery由于是封装好的JavaScript库,所以在实现的方式上和原生JS差不多,都是通过操作DOM元素去实现样式的更改,比起原生的实现方式JQuery的语法会更加的简洁,快速

```js
//默认激活第一组样式
$('.btn:first').addClass('active');
$('.content:first').css('display','block');

//获取需要操作的DOM元素
$('.btn').click(function(){
  //eq为选择器,此处this指向对应点击的btn对象,.index方法返回指定元素相对其它指定元素的索引,并添加样式将其激活
  //.siblings方法则返回带有(.btn)类名的所有元素,并将样式重置
$('.btn').eq($(this).index()).addClass('active').siblings('.btn').removeClass('active');
$('.content').eq($(this).index()).css('display','block').siblings('.content').css('display','none');
})
```

## Vue实现

**实现思路:** Vue的核心思想为数据驱动和响应式,避免直接去操作DOM元素,在此只需要动态绑定class(v-bind:class),根据数据变化赋予true or false来判断样式是否激活,因此我们只需要操作数据  

```html
<style>
    #app{
      width: 320px;
      text-align: center;
    }

    .btn{
      margin: 10px 0;
      padding: 0;
      width: 100px;
      cursor:pointer;
    }

    .content{
      height: 200px;
      border: 1px solid black;
      display: none;
    }

    .active {
      background-color: yellow;
    }

    .activecontent{
      display:block
    }
  </style>

  <div id='app'>
    <!-- 当currentIndex与index相匹配时返回true则激活样式 -->
    <button class='btn' 
    v-for="(item,index) in buttonList"
    :class="{active:currentIndex===index}"
    @click="changeTab(index)"
   >
     {{item}}
     </button>
    <div class='content' 
    v-for="(item,index) in contentList"
    :class="{activecontent:currentIndex===index}"
    >
      <p>{{item}}</p>
    </div>
  </div>
```

```js
const app = new Vue({
  el:'#app',
  data:{
    //按钮
    buttonList:['新闻','娱乐','科技'],
    //显示内容
    contentList:['我是新闻内容','我是娱乐内容','我是科技内容'],
    //当前激活样式,默认下标为0
    currentIndex:0
  },
  methods:{
    //切换激活样式
    changeTab(index){
      //点击按钮后将当前点击元素的索引赋值给currentIndex,用于激活相匹配的样式
      this.currentIndex = index;
    }
  }
})
```
