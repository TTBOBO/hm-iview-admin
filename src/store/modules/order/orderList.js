import {orderListAction} from '../../actions/order/orderList'

import {orderListMutation} from '../../mutations/order/orderList'
const orderList = {
	state:{
		orderList:{
			colListStorage:[],
			colList:[],
			goodsList:[]
		},
		trashArr:[],
		delStatus: false,
		pageSize:10,
		currentPage:1,
		getList:{
			limit:10,
			page:1,
			filter:'hm_archives.is_del = 0',
			order:'',
			count:0,
		}
	},
	actions:orderListAction,
	mutations:orderListMutation
}

export default orderList