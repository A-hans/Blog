---
title: 'Object变化监测'
date: 2022-05-23
sidebar: 'auto'
categories:
 - Vue学习笔记
tags:
 - vue
---

## 变化监测  

### 什么是变化监测
数据发生变化，视图会跟着渲染，这一过程中首先需要监测这一变化的过程，才能通知视图进行更新  
目前主流框架中实现响应式的方式：
+ `Angular` 脏检查  
+ `React` 虚拟DOM
+ `Vue` 虚拟DOM  
在这几种方案的实现中，vue相比其它两种框架，所侦测的颗粒度会更细  

### 实现  
在Vue2中通过`Object.definePropety`  
在Vue3中通过`Proxy`

```js
    //代理监测辩护
function defineReactive(data,key,value){
    /* 默认值是false
        writable:false, //只读
        enumerable:false,//可迭代
        configurable:false //可删除
    */
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get(){
            return value
        },
        set(newVal){
            if(newVal === value ){
                return
            }
            value = newVal;
        }
    })
}
```  
现在,对象的每个`key`的`value`变化都可以进行监测了
## 收集依赖  
仅仅是对变化的监测还不能够知道是否需要对这次变化进行操作，所以需要有一个地方去收集依赖，数据发生变化，去通知使用了该数据的地方  
**tips:模板使用数据等同于组件使用数据，当数据发生变化时，将会通知组件，组件内部再通过虚拟DOM重新渲染**   
总结一句话就是：**在Getter中收集依赖，在setter中触发依赖**  
对上述代码进行修改
```js
//收集依赖
    function defineReactive(data,key,value){
        let dep = [];//收集依赖（在各种组件中又被使用到的地方收集到此）
        /* 默认值是false
            writable:false, //只读
            enumerable:false,//可迭代
            configurable:false //可删除
        */
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get(){
                //依赖是一个函数
                dep.push(window.target);
                return value
            },
            set(newVal){
                if(newVal === value ){
                    return
                }
                //循环更新所有依赖此属性的组件
                for(let i = 0;i<dep.length;i++){
                    dep[i](newVal,val);
                }
                value = newVal;
            }
        })
    }  
```
将依赖收集封装成一个类来帮助管理，它可以收集依赖，删除依赖，或者向依赖发送通知等相关操作
```js
class Dep {
    constructor(){
        this.subs  = [];//用于收集依赖
    }

    addSub(sub) {
        this.subs.push(sub);
    }
    removeSub(sub) {
        remove(this.subs,sub);
    }
    depend() {
        if(window.target){
            this.addSub(window.target)
        }
    }
    notifiy() {
        const subs = this.subs.slice();
        for(let i = 0,l=subs.length;i < l;i++){
            subs[i].update();
        }
    }
}

function remove(arr,item) {
if(arr.length) {
    const index = arr.indexOf(item);
    if(index > -1){
        return arr.splice(index,1);
    }
    }
}
```
对defineReactive进行改造  
```js
function defineReactive(data,key,value){
        let dep = new Dep();//收集依赖
        /* 默认值是false
            writable:false, //只读
            enumerable:false,//可迭代
            configurable:false //可删除
        */
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get(){
                //依赖是一个函数
                dep.depend();
                return value
            },
            set(newVal){
                if(newVal === value ){
                    return
                }
                value = newVal;
                dep.notifiy()
            }
        })
    }
```
## 观察者  
那么现在`window.target`是谁？  
我们需要通知用到数据的地方，用到数据的地方可以有很多，可以是模板，可以是组件，也可能是`Watch`中监听的数据，这时需要在创建一个类来处理这些情况，在依赖收集阶段我们只收集这个封装好的类实例进来，通知时只通知它一个，让它去负责通知其它使用到该依赖的地方，这就是`Watcher`
简单来说就是数据发生变化时通知`Watcher`，它在通知其它依赖此变化的地方  
```js
//调用例子
vm.$watch('a,b,c',function(newVal,oldVal){

})
```
创建Watch类
```js
export default class Watch {
    //vm：当前实例
    //expOrFn 需要监听的属性
    //cb 回调函数
    constructor(vm,expOrFn,cb) {
        this.vm = vm;
        this.getter = parsePath(expOrFn);
        this.cb = cb;
        this.value = this.get();
    }
    get(){
        window.target = this;
        let value = this.getter.call(this.vm,this.vm);
        window.target = undefined;
        return value;
    }

    update(){
        const oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm,this.value,oldValue);
    }
}

const bailRE = /[^\w.$]/;

function parsePath(path){
    if(bailRE.test(path)){
        return
    }
    const segments = path.split('.');
    return function(obj){
        for(let i =0;i<segments.length;i++){
            if(!obj){
                return
            }
            //读取obj[segments[i]]，触发getter收集依赖,
            obj = obj[segments[i]]
        }
        return obj;
    }
}
```  
在此处通过给window.target赋值this,在getter中被代理的属性会被读取，触发Object.definePropety中的`get`方法，往依赖中添加this,当数据发生更改，则会触发当前`Watcher`实例的update方法进行通知
## 侦测所有的Key  
现在我们只需要将所有的属性都转化为`getter\setter`就可以对每一个属性都进行监听  
创建`Obsever`类 
```js
class Obsever{
    constructor(value){
        this.value = value;
        if(!Array.isArray(value)){
            this.walk(value);
        }
    }
    //walk方法只对对象进行处理
    walk(obj){
        const keys = Object.keys(obj);
        //循环代理属性
        for(let i = 0;i<keys.length;i++){
            defineReactive(obj,keys[i],obj[keys[i]]);
        }
    }
}
```  
在对`defineReactive`进行改造，递归判断子属性是否是对象，已监听所有的属性  
```js
function defineReactive(data,key,value){
        if(typeof value === 'object'&&value !==null) {
            new Observer(value);
        }
        let dep = new Dep();//收集依赖
        /* 默认值是false
            writable:false, //只读
            enumerable:false,//可迭代
            configurable:false //可删除
        */
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get(){
                //依赖是一个函数
                dep.depend();
                return value
            },
            set(newVal){
                if(newVal === value ){
                    return
                }
                value = newVal;
                dep.notifiy()
            }
        })
    }
```
## 一些问题  
在Object.definePropety中我们通过getter/setter来处理数据的变化，但是对于新增加的属性，或者删除的属性无法被追踪到，因此Vue为了解决这个问题而增加了`$set`与`$delete`方法  

## 总结
+ 通过`Object.definePropety`来追踪变化  
+ 创建一个`Dep`类（包含对以来的操作），通过`getter/setter`来收集依赖和触发依赖，进行处理  
+ 通过一个`Watcher`来进行中转，在收集依赖时进行添加，通过通知`Watcher`,`watcher`在继续通知其它依赖，在触发依赖时循环通知处理相应操作  
+ 最后创建一个`Obsever`来对所有操作进行管理，递归`Object`，将所有的属性都转换为`getter/setter`来进行响应式追踪