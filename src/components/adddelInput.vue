<template>
  <div>
      <!-- {{value}} -->
      <Input v-model="value1"  style="width:150px">
        <Button :disabled="disabled"  icon="minus-round" @click="reduce"  slot="prepend"></Button >
        <Button  icon="plus-round" @click="add"  slot="append"></Button >
    </Input>
  </div>
</template>
<script>
export default {
  data() {
      return {
        value1:'',
        disabled:false
      }
  },
  props:{
    value: Number,
  },
  methods:{
      reduce() {
        //   this.value1 = this.value;
          this.value1 = parseInt(this.value1) - 1;
          this.disabled = this.value1 == 0 ? true : false;
          this.$emit('changeNum',this.value1);
      },
      add() {
          this.value1 = parseInt(this.value1) + 1;
          this.disabled = this.value1 == 0 ? true : false;
          this.$emit('changeNum',this.value1);
      }
  },
  mounted() {
      this.value1 = this.value;
      this.disabled = this.value == 0 ? true : false;
  }

}
</script>

