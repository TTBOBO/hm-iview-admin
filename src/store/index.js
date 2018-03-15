import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


import login from './modules/login'   //登录状态

import pageInfo from './modules/info'   //首页状态

import orderList from './modules/order/orderList'   //商品列表

import addGoods from './modules/order/addGoods'   //添加商品

import pubData from './modules/pubData'  //公共的储存为下拉框提供实时数据


const store = new Vuex.Store({
	modules: {
		login,
		pageInfo,
		orderList,
		addGoods,
		pubData
	}
})

export default store