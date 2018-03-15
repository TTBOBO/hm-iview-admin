<template>
  <div>
	  <InitTable :dataOpton="dataOpton" @deleteList="getDelete" no-data-text="暂无数据1" @add="add" @edit="edit" @info="info"  @getSearch="getSearch"></InitTable>
  </div>
</template>
<script>
import InitTable from "../../components/table";
export default {
  data() {
    return {
      dataOpton: {
		url: "",
		/**
			 * title ： theard 显示的标题   
			 * search：  搜索的字段   
			 * type [select（下拉框）number (搜索时左侧有范围)  time (普通日期)  switch(表格里生成  switch插件)]
			 */
        columns: [
          {type: "selection", width: 60,align: "center"},
          {title: "商品号", key: "hm_archives.id", search: "hm_archives.id", type: "",width: 200},
          {title: "商品名称",key: "hm_archives.name",search: "hm_archives.name", type: "",sortable: true, width: 200,enum:true,selectOPtion:{a:"是",b:"否"} },
          {title: "名称", key: "hm_archives.writer", search: "hm_archives.writer", type: "", width: 200 },
          {title: "价格",key: "hp_addonshop.trueprice",search: "hp_addonshop.trueprice",type: "number", ellipsis: true,width: 200 },
          {title: "商品图",key: "hm_archives.litpic",search: "",render:'img',width: 200 },
          { title: "浏览量", key: "hm_archives.click",search: "hm_archives.click", type: "number",src:"https://cn.vuejs.org/images/logo.png",width: 200},
          { title: "上架时间",key: "hm_archives.pubdate",search: "hm_archives.pubdate",type: "time", width: 200},
           {title: "库存",key: "hp_addonshop.stock", search: "hp_addonshop.stock", type: "switch", width: 200 ,url:"123",selectOPtion:{1:"测试1",2:"测试2",3:"测试3"}},
          {title: "销量", key: "hp_addonshop.sales",search: "hp_addonshop.sales",type: "select",width: 200,selectOPtion:{1:"测试1",2:"测试2",3:"测试3"}},
         
          {title: "操作",key: "action", fixed: "right",align: "center",render:""
          }
        ],
        autoCol: true,
        primary:"hm_archives.id",
        topBtnGroup: [
          { name: " 搜索", bgcolor: "info", url: "", type: "search",icon:"ios-search" },
          { name: "添加", bgcolor: "info", url: "", type: "add",icon:"plus" },
          { name: "批量删除", bgcolor: "error", url: "1213", type: "plDel",icon:"trash-b"},
          { name: "导出表格", bgcolor: "success", url: "", type: "export",icon:"forward" }
        ],
        getList:{
          filter:"hm_archives.is_del = 0"
        },
        toolEvent: [
          { type: "info",title:"详情", url: "/addGoods" },
          { type: "edit",title:"编辑", url: "/addGoods" },
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
       console.log(id);
    },
    add() {
      this.$Message.info('123');
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

