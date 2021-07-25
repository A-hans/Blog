---
title: '重学JavaScript-Object'
date: 2021-07-25
sidebar: 'auto'
categories:
 - 重学JavaScript
tags:
 - "JavaScript"
---

## 创建对象的方式  

```js
const obj = new Object();//构造函数方法
const obj = {};//字面量方法
```  

## 文本和属性  

+ 属性的值可以是任意类型  
+ 使用`delete`操作符移出属性
+ 使用 const 声明的对象是可以被修改的,const声明的是obj的值,而不是obj对象的引用
+ `key`可以是关键字或保留字  
+ `Boolean`空对象的值也是`true`

```js
delete obj.name
```  

+ 可以使用多字词来作为属性名  

```js
let obj = {
  "My Name": "Lee"//对象的key本质是会被解析成字符串,多字词时必须使用字符串
}
```

## 中括号运算符  

当我们需要调用对象中的多字词时  

```js
obj["My Name"] //"Lee"
```  

中括号内的`key`也可以是一个变量,一个表达式  

```js
let name ="My Name";
obj[name];//"Lee"
```  

+ 中括号运算符比点运算符更加的灵活  
**点运算:** 只能是有效的变量<font color='red'> 标识符 </font>  
**中括号:** 允许任何属性和变量  

## 判断属性是否存在  

判断属性是否存在使用`in`操作符,存在返回true,不存在返回false

```js
let obj={};
"name" in obj //false
```  

+ 与undefined相比
使用`undefined`判断属性是否存在,若该`key`的值存储的即为`undefined`则无法判断是否真的存在  

## 遍历对象  

像数组一样,对象也可以进行遍历(数组本质上也是一种对象)  
遍历对象使用`for in`  

```js
const obj ={
  name: "Lee",
  age: 25
}

for(let key in obj){
    console.log(key);//"name","age"
}
```  

+ 关于对象遍历的排序  
若`key`是整数则遍历的顺序会按从小到大进行排序,非整数的`key`会按创建时的顺序进行排序  
若不想让其按顺序排序,可以在整数`key`前加上`+`号

```js
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```
