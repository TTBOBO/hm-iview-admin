import {addGoodsActions} from '../../actions/order/addGoods'

import {addGoodsMutations} from '../../mutations/order/addGoods'

const addGoods  = {
    state:{
        goodsInfo:{
            name:"",
            type:"",
            defaultList:[],
            uploadList:[
                {'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',name:'1.jpg'},
                {'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',name:'2.jpg' }
            ],
            currentPrice:0,   //本店售价
            marketPrice:"",    //市场售价
            stock:{value:"123"},         //库存
            noticeNum:{value:""},        //预警值
            salesNum:'',     //销量,
            postage:'',         //邮费
            status:'',          // 1 上架   2 下架  3 定时上架
            service:[],         // 1售后保障 2正品 3 自退  4技术发货
            info:'商品详情',      //商品详情
            defaultList:[
                {'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',name:'1.jpg'},
                {'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',name:'2.jpg' }
            ]
        },
        typeList:[{value:'1',label:'衣服' },{value:'2',label:'裤子' },{value:'3',label:'鞋子' }],
        serviceList:[{title:'售后保障',label:"1"},{title:'正品保证',label:"2"},{title:'支持自退',label:"3"},{title:'技术发货',label:"4"}],
        addStatu:false
    },
    actions:addGoodsActions,
    mutations:addGoodsMutations
}


export default addGoods;