<template>
  <div>
      <addEdit :params="params" @getData="changeData"></addEdit>
  </div>
</template>
<script>
import addEdit from "../../components/add_edit";
import hm from "../../assets/js/hm";
export default {
  data() {
    return {
      params: {
        formList: [
          { field: "hp_addonshop.name",title: "商品名称",value: "", validate: "required",type:"input"},
          { field: "hp_addonshop.create_by",title: "发布者",value: "", validate: "required",type:"select",url:"/hmapi/member/api_admin/grid",colKey:"id",colName:"tname"},
          { field: "hp_addonshop.trueprice",title: "价格",value: '', validate: "pInt",type:"input" },
          { field: "hp_addonshop.typeid",title: "商品类型",value:[],validate: "required",type:"select",option:{3:"测试",1:"测试1",2:"测试2"} },
          { field: "hp_addonshop.litpic",title: "商品图",value: [],  validate: "required",type:"upload"},
          { field: "hp_addonshop.click",title: "浏览量",value: '', validate: "required",type:"input"},
          { field: "hp_addonshop.pubdate",title: "上架时间",value: '', validate: "required",type:"time",dataType:"datetime"},
          { field: "hp_addonshop.stock",title: "库存",value: "", validate: "required",type:"input"},
          { field: "hp_addonshop.sales",title: "销量",value: "", validate: "required",type:"input"},
          { field: "hp_addonshop.des",title: "描述",value: "", validate: "required",type:"tag"},
        ],
        infoUrl:"/hmapi/api_goods/info",  //获取详情url
        addEditUrl:"/hmapi/api_goods/update_or_add",
        validata:{},
        primaryKey:'aid'
      }
    };
  },
  mounted() {},
  methods: {
    changeData(data) {
      console.log(data);
    },
    test() {

    },
    test1() {
      
    }
  },
  components: {
    addEdit
  }
};
</script>