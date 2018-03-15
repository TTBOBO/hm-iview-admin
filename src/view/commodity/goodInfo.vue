<template>
  <div>
      <goodInfo :params="params"></goodInfo>
  </div>
</template>
<script>
import goodInfo from "../../components/pageInfo";
export default {
  data() {
      return {
          params:{
              formList:{

              },
              infoUrl:"/hmapi/api_goods/info",
              primaryKey:"hp_addonshop.aid"
          }
      }
  },
  components: {
      goodInfo
  }
}
</script>
