<template>
  <div>
	  <InitTable :dataOpton="dataOpton" @deleteList="getDelete" @add="add" @edit="edit" @info="info"  @getSearch="getSearch"></InitTable>
  </div>
</template>
<script>
import InitTable from "../../components/table";
export default {
  data() {
    // ,enum:true,selectOPtion:{a:"是",b:"否"} 
    return {
      dataOpton: {
        url: "/hmapi/api_goods/grid",
        columns: [
          {type: "selection", width: 60,align: "center"},
          {title: "商品号", key: "hp_addonshop.aid", search: "hp_addonshop.aid", sortType:"desc", type: "",width: 200,sortable: true},
          {title: "商品名称",key: "hp_addonshop.name",search: "hp_addonshop.name", type: "",sortable: true, width: 200},
          {title: "发布者", key: "hp_addonshop.create_by", search: "hp_addonshop.create_by", type: "select", width: 200,url:"/hmapi/member/api_admin/grid",colKey:"id",colName:"tname"},
          {title: "价格",key: "hp_addonshop.trueprice",search: "hp_addonshop.trueprice",type: "number", ellipsis: true,width: 200 },
          {title: "商品图",key: "hp_addonshop.litpic",search: "",render:'img',width: 200 },
          {title: "浏览量", key: "hp_addonshop.click",search: "hp_addonshop.click", type: "number",width: 200},
          {title: "上架时间",key: "hp_addonshop.pubdate",search: "hp_addonshop.pubdate",type: "time", width: 200},
          {title: "库存",key: "hp_addonshop.stock", search: "hp_addonshop.stock", type: "number", width: 200 },
          {title: "销量", key: "hp_addonshop.sales",search: "hp_addonshop.sales",type: "number",width: 200},
          {title: "操作",key: "action", fixed: "right",align: "center",render:""
          }
        ],
        autoCol: true,
        primary:"hp_addonshop.aid",
        topBtnGroup: [
          { name: " 搜索", bgcolor: "info", url: "", type: "search",icon:"ios-search" },
          { name: "添加", bgcolor: "info", url: "/addTest", type: "add",icon:"plus" },
          { name: "批量删除", bgcolor: "error", url: "/hmapi/api_goods/delete", type: "plDel",icon:"trash-b"},
          { name: "导出表格", bgcolor: "success", url: "", type: "export",icon:"forward" }
        ],
        getList:{
          filter:""
        },
        toolEvent: [
          { type: "info",title:"详情", url: "/goodInfo" },
          { type: "edit",title:"编辑", url: "/editGoods" },
          { type: "del",title:"删除", url: "/hmapi/api_goods/delete" },
        ]
      }
    };
  },
  components: {
    InitTable
  },
  methods:{
    getDelete(id) {
      console.log(id);
    },
     /**
     * 获取该条记录的id
     */
    edit(id) {
      //  console.log(id);
    },
    add() {
      // this.$Message.info('123');
    },
    /**
     * 获取该条记录的id
     */
    info(id) {
      console.log(id);
    },
    getSearch(data) {
      console.log(data);
    }
  }
};
</script>
