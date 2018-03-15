<template>
  <div>
	  <InitTable :dataOpton="dataOpton"></InitTable>
  </div>
</template>
<script>
import InitTable from "../../components/table";
export default {
  data() {
    return {
      dataOpton: {
        url: "",
        columns: [
          {type: "selection", width: 60,align: "center"},
          {title: "商品名称",key: "hm_archives.name",search: "hm_archives.name", type: "", ellipsis: true,sortable: true, width: 200 },
          {title: "商品号", key: "hm_archives.id", search: "hm_archives.id", type: "", ellipsis: true,width: 200},
          {title: "名称", key: "hm_archives.writer", search: "hm_archives.writer", type: "",ellipsis: true, width: 200 },
          {title: "价格",key: "hp_addonshop.trueprice",search: "hp_addonshop.trueprice",type: "number", ellipsis: true,width: 200 },
          {title: "库存",key: "hp_addonshop.stock", search: "hp_addonshop.stock", type: "number", ellipsis: true, width: 200 },
          {title: "销量", key: "hp_addonshop.sales",search: "hp_addonshop.sales",type: "number",ellipsis: true,width: 200,selectOPtion:{1:"测试1",2:"测试2",3:"测试3"}},
          { title: "上架时间",key: "hm_archives.pubdate",search: "hm_archives.pubdate",type: "time", ellipsis: true, width: 200},
          { title: "浏览量", key: "hm_archives.click",search: "hm_archives.click", type: "number",ellipsis: true,width: 200},
          {title: "操作",key: "action", fixed: "right",align: "center",render:""
          }
        ],
        autoCol: true,
        primary:"hm_archives.id",
        topBtnGroup: [
          { name: " 搜索", bgcolor: "info", url: "", type: "search",icon:"ios-search" },
          { name: "批量删除", bgcolor: "error", url: "1213", type: "plDel",icon:"trash-b"},
          { name: "导出表格", bgcolor: "success", url: "", type: "export",icon:"forward" }
        ],
        getList:{
          filter:"hm_archives.is_del = 1"
        },
        toolEvent: [
          { type: "edit",title:"还原", url: "/hmapi/api_goods/get_back" },
          { type: "del",title:"删除", url: "/hmapi/api_goods/get_back" },
        ]
      }
    };
  },
  components: {
    InitTable
  },
  methods: { },
  mounted() {},
  create() {},
};
</script>


/hmapi/api_goods/get_back