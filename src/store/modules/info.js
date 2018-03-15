import { infoAction } from '../actions/info'

import { infoMutations } from '../mutations/info'



const pageInfo = {
	state:{
		//时间范围  'new Data(1507909753) new Data(1507909753)'
		time:'',
		timeVa:{
            shortcuts: [{
                text: '最近一周',
                value () {
	                const end = new Date();
	                const start = new Date();
	                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	                return [start, end];
            	}
            },
            {
                text: '最近一个月',
                alue () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                }
            },
            {
            text: '最近三个月',
            value () {
	            const end = new Date();
	            const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
            }
            }]
        },
		card:[
			{icon:'ios-pricetag',title:'订单数',num:'111',bgcolor:'#2d8cf0',color:'#fff',type:'条'},
			{icon:'edit',title:'待处理',num:'222',bgcolor:'#19be6b',color:'#fff',type:'条'},
			{icon:'social-usd-outline',title:'成交金额',num:'333',bgcolor:'#ff9900',color:'#fff',type:'元'},
			{icon:'android-list',title:'文章数',num:'444',bgcolor:'#ed3f14',color:'#fff',type:'条'}
		],
		order:{
			title: {
				text: `2017年订单量统计图`,
				x: 'center'
			},
			lData:['交易金额'],
			name:'交易金额',
			xData:['1月', '2月', '3月', '4月', '5月','6月','7月','8月','9月','10月','11月','12月'],
			sData:[5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
		},
		article:{
			title: {
				text: `本周文章数量统计图`,
				x: 'center'
			},
			xData:['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期七'],
			sData:[10, 52, 200, 334, 390, 330, 220],
			name:'文章数量',
		},
	},
	actions:infoAction,
	mutations:infoMutations
}

export default pageInfo
