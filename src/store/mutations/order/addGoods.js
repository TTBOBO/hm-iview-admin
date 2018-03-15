import * as type from '../../constant/type'

export const addGoodsMutations = {
    [type.FETCH_ADDGOODS](state) {
        state.addStatu = true;
        state.goodsInfo = {   //清空数据 防止进入添加还有数据
            name:"",
            type:"",
            defaultList:[],
            uploadList:[
                {'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',name:'1.jpg'},
                {'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',name:'2.jpg' }
            ],
            currentPrice:0,   //本店售价
            marketPrice:"",    //市场售价
            stock:"",         //库存
            noticeNum:'',        //预警值
            salesNum:'',     //销量,
            postage:'',         //邮费
            status:'',          // 1 上架   2 下架  3 定时上架
            service:[],         // 1售后保障 2正品 3 自退  4技术发货
            info:'商品详情',      //商品详情
            defaultList:[
                {'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',name:'1.jpg'},
                {'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',name:'2.jpg' }
            ]
        }

        console.log(state.addStatu+"............");
    }
}