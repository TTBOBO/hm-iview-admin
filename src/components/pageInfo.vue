<template>
  <div>1</div>
</template>
<script>
import ykp from "../assets/js/ykp";
import util from "../assets/js/util";
import * as doAjax from "../api/AjaxApi";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      id:"",
      test:""
    };
  },
  props: {
    params: {
      default: function() {
        
        return {
          formList: [],
          infoUrl: ""
        };
      }
    }
  },
  methods: {
    initPage() {
      this.id = this.$route.query.id;
      doAjax.ajaxPost(this.params.infoUrl, {filter: this.params.primaryKey +'='+this.id},res => {
        console.log(res); 
      })
    },
    getInfo() {
      this.test = this.orderList;
      console.log(this.test);
    }
  },
  computed: {
    ...mapState(["orderList"])
  },
  mounted() {
    this.initPage();
    this.getInfo();
  }
};
</script>

