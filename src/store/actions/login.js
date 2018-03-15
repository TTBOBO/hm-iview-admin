import * as types from '../constant/type'

import * as doAjax from '../../api/AjaxApi'

import ykp from '@/assets/js/ykp.js'

export const loginAction = {
	
	fetchACtionLogin({state,commit,dispatch},params) {
		doAjax.ajaxPost('/hmapi/api_login/login',{
			"uname": params.name,
			"pwd":  params.password,
		},function(res){
			if(res.data.code == 200) {
				state.userData = res.data.data;
				commit(types.FETCH_USER_SUC,{
					data : true,
				})
				ykp.setSessionStorage('userInfo',JSON.stringify(res.data.data));
			}else {
				commit(types.FETCH_USER_ERR,{})
			}
		})
		// if(params.name == state.userData.username && params.password == state.userData.password) {
			
		// 	commit(types.FETCH_USER_SUC,{
		// 		data : true
		// 	})
		// }else{
		// 	commit(types.FETCH_USER_ERR,{
				
		// 	})
		// }
	},

	//获取用户信息
	getUserInfo({state, commit, dispatch}){
		var id =  JSON.parse(ykp.getSessionStorage('userInfo')).id;
		doAjax.ajaxPost('/hmapi/api_login/userInfo',{
			"id": id,
		},function(res){
			if(res.data.code == 200) {
				ykp.setSessionStorage('userInfo',JSON.stringify(res.data.data));
				state.userData = res.data.data;
			}
		})
	},


	//修改密码
	changePwd({state, commit, dispatch} , params) {
		var id =  JSON.parse(ykp.getSessionStorage('userInfo')).id;
		doAjax.ajaxPost('/hmapi/api_login/change_pwd',{
			"id": id,
			"pwd":  params.oldPwd,
			"newPwd":  params.newPwd,
		},function(res){
			console.log(res.data);
			if(res.data.code == 200) {
				commit(types.CHANGE_SUC);
				// dispatch('getUserInfo');
				// ykp.setSessionStorage('userInfo',JSON.stringify(res.data.data));
			}else {
				commit(types.CHANGE_ERR,res.data.msg)
			}
		})
	},

	edit({state, commit, dispatch} , params) {
		var data = {};
		for(var key in params){
			if(params[key] != "" || params[key] === 0) {
				data[key] = params[key]
			}	
		}

		var id =  JSON.parse(ykp.getSessionStorage('userInfo')).id;
		data.id = id;
		doAjax.ajaxPost('/hmapi/api_login/edit_info',data,function(res){
			console.log(res.data);
			if(res.data.code == 200) {
				commit(types.CHANGE_SUC);
				dispatch('getUserInfo');
				// ykp.setSessionStorage('userInfo',JSON.stringify(res.data.data));
			}else {
				commit(types.CHANGE_ERR,res.data.msg)
			}
		})
	}

	
}
