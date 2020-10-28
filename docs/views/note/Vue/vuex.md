---
title: 'VueX'
date: 2020-08-25
sidebar: 'auto'
categories:
 - 前端笔记
tags:
 - vue
 - vuex
---
## 1.简单介绍  

 VueX是一个Vue官方提供的状态管理工具  
 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化  
 在Vue中它同样也是响应式的。  

### 1.1 什么是状态管理  

状态管理(官方总是爱用概念来解释概念😕)  
可以先简单理解把需要多个组件共享的变量全部存储在一个对象里面，
然后，将这个对象放在顶层的Vue实例中，让其他组件可以使用，这时多个组件就可以共享这个对象里的所有属性了。

举个例子：用户在访问网站时要进行登录，此时账号密码是唯一的且可以访问多个页面，这时我们就可以把用户的登录状态保存在公共的变量当中由多个页面来使用

![0mmmxH.jpg](https://s1.ax1x.com/2020/09/29/0mmmxH.jpg)  
VueX在这里就相当于一个大管家对所有的组件使用的公共状态进行管理，当然了他自己也有一套自己的管理规则  

## 2.配置VueX  

### 2.1安装  

```js
npm install vuex --save
```

### 2.2 配置  

在根目录创建一个文件夹（一般文件夹名为Store）来存放VueX相关文件，方便管理  
1.在index中导入所需要的包

```js
import Vue from 'vue'
import VueX from 'vuex'
```

2.在Vue中使用它

```js
Vue.use(VueX)
```  

此时Vue内部会执行install方法来使用它  
3.实例化VueX  

```js
const Store = new VueX.Store({

})
```  

:::tip
 注意：这里和Vue-Router不同的是使用的是VueX内部的Store方法，这也是为什么我们命名要为Store的原因
:::  
4.导出Store对象

```js
export default Store
```  

5.挂载至Vue实例

```js
import store from './store'

new Vue({
----
  store,
----
})
```

挂载实例后相当于往Vue当中增加store对象，可通过$store进行全局调用

## 3.使用VueX  

### 3.1 VueX中的属性

VueX当中由5个属性可供选择配置分别是:

+ state(状态管理)

+ mutations(同步执行操作)

+ actions(异步执行操作)

+ getters(计算属性)

+ module(模块)

### 3.2 VueX的运作流程  

![0mMy7R.jpg](https://s1.ax1x.com/2020/09/29/0mMy7R.jpg)  
如何运作？  
首先state中的状态在编译时被渲染成Render函数到组件当中，组件中需要修改state中的状态，若是同步操作则执行commit方法到达Mutations在Mutations中对state进行处理，最后把处理好的状态返回state中，若是异步操作则在组件中需要通过dispatch方法到达actions中进行异步处理，再commit到Mutations中，最后返回state  
:::tip
注意: 在组件修改当中，无论是同步还是异步操作，最后的数据返回都要经过mutations进行处理最后返回state，这么做是因为能被Vue官方在浏览器上推出的Devtools所监听数据在哪一个页面中发生变化，若绕过mutations对state状态进行更改，Devtools是无法监听到数据的改变的
:::  

### 3.3 state  

state属性里面存储着需要使用的公共变量

```js
const state = {
    count: 0,
    students: [
        { id: 1, name: 'li', age: 18 },
        { id: 2, name: 'wang', age: 24 },
        { id: 3, name: 'zhang', age: 20 },
        { id: 4, name: 'huang', age: 22 }
    ],
    info: {
        id: 6,
        name: 'Kobe',
        age: 25
    },
}
```

因为在Vue实例中挂载了store对象，当我们要使用它的时候只需要在组件中使用$store.state.(你想使用的属性)

```js
<p>count:{{ $store.state.count }}</p>//count:0
```  

:::tip
在state中有着单一状态树的概念，使用single source of truth（单一数据源）,即一个项目对应一个store  
若需要有多个状态管理后面会说到在module中进行配置
:::

### 3.4 mutations  

所有的状态更改最后都要在mutations中进行处理（同步操作），现在就来试着实现一个计数器，点击+/-更改state中count的值  

```JS
//在组件中
<p>count:{{ $store.state.count }}</p>
<button @click="addition">+</button>
<button @click="subtraction">-</button>

export default {
  methods: {
    addition() {
      //此处是通过commit方法提交，括号内跟mutilation内定义的方法一致
      this.$store.commit('increment');
    },
    subtraction() {
      this.$store.commit('decrement');
    }
```

```js
//在store实例中
 mutations: {
        //默认传入一个state的对象
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        }
 }
```  

现在我们希望每次点击进行+5/+10,此时我们可以带参数提交至mutation中进行处理  

```js
//在组件中
<p>count:{{ $store.state.count }}</p>
<button @click="addcount(5)">+5</button>
<button @click="addcount(10)">+10</button>

export default {
methods: {
addcount(count) {
  this.$store.commit('addcount',count)
 }
```

```js
//在store实例中
mutations: {
addcount(state) {  
   state.count+=count
  }
}
```

不仅如此mutations中还提供了第二种提交风格，此种提交时传递一个对象  

```js
//在组件中
<p>count:{{ $store.state.count }}</p>
<button @click="addcount(5)">+5</button>
<button @click="addcount(10)">+10</button>
export default {
methods: {
  addcount(count) {
      //第二种提交风格，此种提交是传递一个对象
      this.$store.commit({
        type: addcount,
        count,
     });
  },
}
```

一般使用payload命名来接收commit来的对象

```js
//在store实例中
mutations: {
 addcount(state,payload){
    state.count+=payload.count
  },
}
```

+ 第一种方式直接提交拿到的是对应的值
+ 第二种方式提交拿到的是对象  

### 3.5 getters  

getters在VueX中相当于全局的计算属性，负责对state中的数据进行加工返回一个复杂的结果  

对上述state中的count进行求平方

```js
//在store实例中
getters:{
 powercounter(state) {
      return state.count * state.count
  }
}
```

通过this.$store.getters访问定义好的getters

```js
//在组件中
<p>count^2:{{$store.getters.powercounter}}</p>
```

在getters的方法中不但会默认传入一个state，还可以在传入一个getters进行回调getters的属性  
例如现在要给powercounter返回的结果在乘2

```js
//在store实例中
getters:{
 powercountermulti(state，getters) {
      return getters.powercounter *  2
  }
}
```

此处可以直接return getters中的方法进行使用  
如果我想动态的决定让count乘几，可以这样定义

```js
//在store实例中
getters:{
  powercountnum(state){
    return function(num){
        return state.count *num
    }
  }
}
```

在此处返回一个函数，给调用者进行赋值操作，在返回结果

```js
//在组件中
<p>count*num:{{$store.getters.powercountnum(3)}}</p>
```

### 3.6 actions

actions在VueX中是专门进行处理异步操作的地方
:::tip
注意：actions是components和mutations之间增加的一道操作，相当于一个中转站，actions中不能直接修改state中的数据，最后处理完的数据还是在mutaitions中进行处理（只有在mutaitions中处理的数据才会在devtools中监听）
:::
用settimeout模拟一个异步操作，来更新state中info对象的那么属性  

```js
//在store实例中
mutations:{
  updateinfo(state){
    state.info.name='Lee'
    //在此处直接进行异步操作，devtools工具是监听不到数据变化
     // setTimeout(() => {
    //     state.info.name='hans';
    // }, 1000);
  }
},
actions:{
  asyncupdateinfo(context){
    settimeout(()=>{
      context.commit('updateinfo')
    },2000)
  }
}
```

在mutatios中不能直接进行异步操作，devtools是无法监听到数据变化的，context（上下文）在不同的地方具有不同的含义，在此处的含义相当于store  

```js
//在组件中
<p>name:{{$store.state.info.name}}</p>
<button @click='upadtename'>修改名字</button>

<script>
export default {
  methods:{
    updatename(){
  this.$store.dispatch('asyncupdateinfo')
    }
  }
}
</script>
```  

组件中需要先通过dispatch到actions，actions异步处理完后在回到mutations中进行处理，最后返回数据至state

在actions完成操作后我需要让它告诉我操作已执行/数据修改成功，这时我们可以在异步操作中使用promise  

```js
//在store实例中
mutations:{
  updateinfo(state){
    state.info.name='Lee'
},
actions:{
  asyncupdateinfo(context,payload){
    return Promise((res)=>{
      settimeout(()=>{
      context.commit('updateinfo')
      console.log(payload);
      resolve('回调成功')
    },2000);
    })
  }
}
```

让调用的函数传入一个已完成操作的参数，在Promise中异步请求成功resolve一个结果

```js
//在组件中
<p>name:{{$store.state.info.name}}</p>
<button @click='changeinfo'>修改名字</button>

<script>
export default {
  methods:{
    changeinfo(){
  this.$store
  .dispatch('asyncupdateinfo','操作已执行')
  .then(res-=>{
    console.log(res)
  })
    }
  }
}
```

因为在调用时返回的时候是一个Promise对象，则异步请求成功后的操作我们在调用它的组件中进行

### 3.7 module  

module相当于模块，可以定义新的模块用于存储新的state，mutation，getters，actions  
定义一个module a

```js
//在store实例中
module:{
  a:{
     state:{
        //此处会直接添加至根state
        name:'Li Lei'
    },
    mutations:{
        //优先先在根mutations中找，若没有在往模块内找，起名不能重复
        updatename(state,payload){
            state.name=payload
        }
    },
    getters:{
        fullname1(state){
            return state.name+'11111'
        },
        fullname2(state,getters){
            return getters.fullname1+'22222'
        },
        fullname3(state,getters,rootstate){
            return getters.fullname2+rootstate.count
        }
    },
    actions:{
        asyncupdatename(context,payload){
            return new Promise((reslove,reject)=>{
                context.commit('updatename',payload);
                console.log('正在修改');
                reslove('修改完成')
            })
        }
    }
  }
}
```

```js
//在组件中
 <h1>模块a内容演示</h1>
    <p>{{$store.state.a.name}}</p>
    <button @click='updatename'>修改名字</button>
    <p>{{$store.getters.fullname1}}</p>
    <p>{{$store.getters.fullname2}}</p>
    <p>{{$store.getters.fullname3}}</p>
```

在模块内使用属性的方法与根实例大致相同，但还是有些要注意的地方  

+ 在module中定义的state还是挂载在根state上的，在调用时只需要$store.state.a.name
+ 模块中的mutations调用方法和根state中的一样，VueX会先在根mutations中找，若没有在往模块内找，此处起名不能重复
+ 在getters中调用方法和根实例相同，当在模块中想访问根实例的state时，可以传入第三个属性rootstate拿到根实例中的数据

## 4.辅助函数

个人理解：在template mustache语法中渲染时，不希望是一个表达式，此时可以在计算属性中，进行调用，但是为了区分与对应组件实例的计算属性，引入辅助函数的概念对VueX中状态使用到的计算属性进行集中管理
在组件中引入辅助函数

```js
import {mapGetters} from "vuex";
```

拿上述getters举例：

```js
computed:{
    //通过辅助函数来与本地的计算属性做一个区分，并且使用对应的辅助函数来对vuex内对应对象内的属性进行集中管理
    ...mapGetters(
      { powercounter:'powercounter'})//{计算属性名:getters中事件类型名}
}
```

使用计算属性使用

```js
<p>count^2:{{powercounter}}</p>
```

具体参考[辅助函数](https://vuex.vuejs.org/zh/api/#%E7%BB%84%E4%BB%B6%E7%BB%91%E5%AE%9A%E7%9A%84%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0)  
VueX中还提供了mapState，mapMutations，mapActions来分别进行管理

## 5.补充  

### 5.1 mutaitions中的响应式规则  

在Vue中不是所有的数据发生变化都是响应式的，已经定义好的属性会被添加进Vue的响应式系统中，响应式系统会监听属性的变化，当属性发生变化时，会通知所有界面种用到该属性的地方，让界面发生刷新响应式实现的前提需要先定义好属性

例如在上述info属性中增加一个地址为Shen Zhen  

```js
//在store实例中
mutations:{
  updateinfo(state){
  //此方法老本不会进行响应式更新
   state.info['address']='Shen Zhen'
},
```

可以在控制台中输出state.info可以看到数据已经添加上去但是界面没有发生变化(但是这个问题貌似在Vue2.6中已经修复了)

```js
//在store实例中
mutations:{
  //使用此方法能做到响应式
   Vue.set(state.info,'address','Shen Zhen');
},

```

在此处使用Vue.set方法可以做到响应式

### 5.2 mutaitions中命名的优化

在store实例中mutations属性定义的事件类型和在组件中需要commit的事件类型是一一对应的，这时候如果有一边写错往往就提交不到mutations中进行处理，针对这个问题我们可以新建一个文件(Mutation-Type.js)用一个变量来对所有的的事件类型命名进行集中管理  

```js
//vueX官方推荐使用类型常量来定义mutation属性
export const increment = 'increment '
export const decrement = 'decrement '
```

导入后在store实例中使用

```js
import{increment}from './Mutation-Type'
import{decrement}from './Mutation-Type'
```

在Mutations中

```js
mutations:{
  [increment](state) {
    state.count++
},
  [decrement](state) {
    state.count--
}
 }
```

在组件中导入

```js
import{increment}from './Mutation-Type'
import{decrement}from './Mutation-Type'
```

在组件中使用

```js
 addition() {
      //此处是通过commit方法提交，括号内跟mutilation内定义的方法
      this.$store.commit(increment);
    },
    subtraction() {
      this.$store.commit(decrement);
    },
```

将所有事件类型集中在一处管理，即使定义的时候拼写错了，使用的时候依然可以互相匹配

## 6.目录结构的搭建

为了使整个store实例中的属性管理起来更清晰，将属性抽离成单个js文件进行管理，一个文件一个属性，利于后期项目的开发与维护

### 6.1 各属性间进行模块化抽离  

```js
//1.引入所需要的包
import Vue from 'vue';
import VueX from 'vuex'
import mutations from './Mutations'
import getters from './Getters'
import actions from './Actions'
import moduleA from './module/ModuleA'

//2.使用VueX
Vue.use(VueX);

const state = {
    count: 0,
    students: [
        { id: 1, name: 'li', age: 18 },
        { id: 2, name: 'wang', age: 24 },
        { id: 3, name: 'zhang', age: 20 },
        { id: 4, name: 'huang', age: 22 }
    ],
    info: {
        id: 6,
        name: 'Kobe',
        age: 25
    },
}

//3.实例化Vuex对象
const Store = new VueX.Store({
    //状态管理
    state,
    //同步执行操作
    mutations,
    //异步执行操作
    actions,
    //计算属性
    getters,
    modules: {
        a: moduleA
        }
    });

//4.导出VueX
export default Store
```

将state留在根文件中，其余模块通通抽离，整个结构瞬间清晰

### 6.2 目录结构

![0QQjcq.jpg](https://s1.ax1x.com/2020/10/02/0QQjcq.jpg)
