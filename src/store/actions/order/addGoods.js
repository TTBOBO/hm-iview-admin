import * as type from '../../constant/type'

export const addGoodsActions = {
    addGoods({state,commit,dispatch},params) {
        // 执行添加商品
        commit(type.FETCH_ADDGOODS);  //执行添加成功更新数据
    }
}