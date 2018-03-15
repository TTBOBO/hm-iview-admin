import * as type from '../../constant/type'

export const orderListMutation = {
//	[type.FETCH_USER_SUC](state) {
//		console.log(1)
// 	},


    //删除执行的状态
    [type.DEL_GROUP](state) {
        state.delStatus = true;
    }
}
