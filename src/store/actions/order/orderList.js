import * as type from '../../constant/type'

import * as doAjax from '../../../api/AjaxApi'

import ykp from '../../../assets/js/ykp'

export const orderListAction = {
	//获取商品列表数据
	getOrderList({state, dispatch, commit}, params) {
		state.orderList.colList = [];
		doAjax.ajaxPost('/hmapi/api_goods/index',{
			"page": state.getList.page,
			"limit": state.getList.limit,
			"filter":state.getList.filter,
			"order":state.getList.order,
		},function(res){
			let data = res.body.data.items;
			let goodsList = state.orderList.colList;
			var Key = '';
			if(data.length > 0) {
				data.forEach((value,index,) => {
					goodsList.push({});
					for(var i in value) {
						console.log(i)
						if(i.indexOf("hm_archives.") != -1) {
							Key = i.replace(/hm_archives./,'');
						}else {
							Key = i.replace(/hp_addonshop./,'');
						}
						goodsList[index][Key] = Key == "pubdate" ? ykp.getNowTime(value[i])  :  value[i];
					}
				})
				state.getList.count = parseInt(res.body.data.totalCount);
				state.getList.page = parseInt(res.body.data.curPage);
			}
		})
	},

	fetchGoods({state,commit,dispatch} ,params) {
		state.orderList.colListStorage = [];
		doAjax.ajaxPost('/hmapi/api_goods/index',{
			"page": state.getList.page,
			"limit": state.getList.limit,
			"filter":state.getList.filter,
			"order":state.getList.order,
			
		},function(res){
			let data = res.body.data.items;
			let goodsList = state.orderList.colListStorage;
			var Key = '';
			data.forEach((value,index,) => {
				goodsList.push({});
				for(var i in value) {
				
					if(i.indexOf("hm_archives.") != -1) {
						Key = i.replace(/hm_archives./,'');
					}else {
						Key = i.replace(/hp_addonshop./,'');
					}
					goodsList[index][Key] = value[i];
				}
			})
			console.log(state.orderList.colListStorage);
		})
	},

	getGoodsList({state,dispatch,commit}) {
		state.orderList.colList = state.orderList.colListStorage;		
	},


	//批量删除  或删除单个
	delGroup({state,commit,dispatch},params) {
		const delGroup = [];  //删除组的id集合
		// let Storage = state.orderList.colListStorage;
		
		let id = [];
		if(typeof params.selectArr == 'object'){
			params.selectArr.forEach((item, index , key) => {
				id.push(item.id);
			})
		}else{
			id.push( params.selectArr);
		}
		doAjax.ajaxPost('/hmapi/api_goods/del',{
			id:id.join(',')
		},function(res) {
			if(res.code == 200){
				commit(type.DEL_GROUP);
			}
		})
		// commit(type.DEL_GROUP);
	},


	getNum: function () {
		return Math.floor(Math.random() * 100 + 1);
	}
}