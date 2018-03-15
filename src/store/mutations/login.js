import * as types from '../constant/type'

export const loginMutations = {
	[types.FETCH_USER_SUC](state,params) {
		state.data.success = true;
   	},
   	[types.FETCH_USER_ERR](state) {
   		state.data.logMsg = '请确认用户名或密码输入正确';
   	},
   	[types.LOGIN_OUT](state) {
   		state.data.success = false;
	},
	
	[types.CHANGE_SUC](state) {
		state.changePwd.status = true;
	},
	[types.CHANGE_ERR](state,params){
		state.changePwd = {
            status:false,
            msg: params
        }
		
	},

	// [types.CHANGE_SUC](state) {
	// 	state.changePwd.status = true;
	// },
}
