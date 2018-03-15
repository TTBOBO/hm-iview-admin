<template>
  <div>
      <addEdit :params="params"></addEdit>
  </div>
</template>
<script>
import addEdit from "../../components/add_edit";
export default {
  data() {
    return {
      params: {
        formList: [
          { field: "name",title: "商品名称",value: "",validate: "",type:"input"},
          { field: "name2",title: "商品名称1",value: "", validate: "",type:"select",option:[{value:"1",label:"测试1"}]},
          { field: "name2",title: "商品名称2",value: "2016-01-01", validate: "",type:"time"},
          { field: "name2",title: "商品名称2",value: ['2016-01-01', '2016-02-15'], validate: "",type:"time" ,dataType:"dataType"},
          { field: "name2",title: "商品名称3",value: [], validate: "",type:"select",multiple:true,option:[{value:"1",label:"测试1"},{value:"2",label:"测试2"}]},
          { field: "name2",title: "商品名称4",value: 2, validate: "",type:"radio",option:[{value:"1",label:"测试1"},{value:"2",label:"测试2"}]},
          { field: "name2",title: "商品名称5",value: [], validate: "",type:"checkbox",option:[{value:"1",label:"测试1"},{value:"2",label:"测试2"}]},
          { field: "name2",title: "商品名称6",value: true, validate: "",type:"switch"},
          { field: "name2",title: "上传图片",value: [
                {'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',name:'1.jpg'},
                {'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',name:'2.jpg' }
            ], validate: "",type:"upload"},
          { field: "name2",title: "富文本",value: "", validate: "",type:"editor"},
        ],
        infoUrl:"",  //获取详情url
      }
    };
  },
  mounted() {},
  methods: {},
  components: {
    addEdit
  }
};
</script>

