import * as types from '../constant/type'

import * as doAjax from '../../api/AjaxApi'

import ykp from '@/assets/js/ykp.js'
export const infoAction ={
	
	//页面初始化 获取顶部4栏数据
	getCardInfo({state,commit,dispatch},params) {

		doAjax.ajaxPost('/hmapi/api_home/index',{

		}
		,function(res){
			if(res.data.code == 200) {
				console.log(res.data.data);
				state.card[0].num = res.data.data.order_num;
				state.card[1].num = res.data.data.handle;
				state.card[2].num = res.data.data.price_sum;
				state.card[3].num = res.data.data.article_num;
			}
		})
	},
	//搜索时间获取echarts表数据
	/**
	 * params  Array 时间参数
	 */
	getChart({state,commit,dispatch},params) {
		console.log(state.time);
	}



}
