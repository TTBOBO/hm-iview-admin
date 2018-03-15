import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import Index from '@/view/'

import Home from '@/view/home'

import Main from '@/view/main'

import Test from '@/view/test'


//登录页面
import Login from '@/view/login/login'

import PersonInfo from '@/view/login/personInfo'

//商品管理
import CommList from '@/view/commodity/commodityList'

//添加商品
import addGoods from '@/view/commodity/addGoods'

//编辑商品
import editGoods from '@/view/commodity/editGoods'

//编辑商品
import goodInfo from '@/view/commodity/goodInfo'

//商品回收站

import recycle from '@/view/commodity/recycle'

//测试页面
import demo from "@/view/examplate/test"


//测试页面
import addTest from "@/view/examplate/addTest"
Router.prototype.back = function() {
	this.go(-1);
}

Router.prototype.next = function(...arg) {
	this.push(...arg)
}

Router.prototype.goto = function(rt, isBack = false){
  this.isBack = isBack
  this.push(rt)
}



Vue.use(Router)

export default new Router({
  	routes: [
	  	{
	      path: '*',redirect: '/Info'
	   	},
	    {
        	path: '/',
	        component: Home,
	        name: '首页',
	        hidden: true,
	        children: [
				{ path: '/Info', component: Index, name: '流量数据', meta: {requireAuth: true} },
				{
					path:'/personInfo',
					name:'个人信息',
					component: PersonInfo,
				},
	        ]
	    },
		{
			path: '/',
			component: Home,
			name: '首页',
			hidden: true,
			children: [
				{ path: '/commlist', component: CommList,hiddent: true, name:'商品列表'},
				{ path: '/addGoods', component: addGoods,hiddent: true, name:'添加商品'},
				{ path: '/editGoods', component: editGoods,hiddent: true, name:'编辑商品'},
				{ path: '/test', component: Test, hidden: true, name: '商品分组' },
				{ path: '/recycle', component: recycle, hidden: true, name: '商品回收站' },
				{ path:'/demo',component: demo, hidden: true, name: '商品列表测试' },
				{ path:'/addTest',component: addTest, hidden: true, name: '添加商品测试' },
				{ path:'/goodInfo',component: goodInfo, hidden: true, name: '商品详情' },
			]
		},
	    {
			path: '/login',
			name: '登录',
			component: Login,
		},
		
	   
	   
  	]
})
