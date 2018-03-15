<template>
  <div>
      <Tag v-for="(item, index) in tagCount" style="height: 32px;line-height: 32px;" :name="item" closable @on-close="closeTag(index)" :key="index">{{ item }}</Tag>
      <template>
        <Input type="text"  style="width: 100px" v-model="tagName"></Input>
        <Button type="primary" icon="plus-round" @click="addTag"></Button>
    </template>
  </div>
</template>
<script>
export default {
  data() {
      return {
        //   tagCount:[],
          tagName:''
      }
  },
  props:{
      tagCount:Array,
      colKey:String
  },
  methods:{
      addTag() {
        let tagName = this.tagName;
        if(tagName){
            this.tagCount.push(tagName);
            this.$emit('changeTag',{
                key:this.colKey,
                tagCount: this.tagCount
            });
        }else{
            this.$Message.error('请输入再添加');
        }
        this.tagName = '';
      },
      closeTag(index) {
          this.tagCount.splice(index,1);
          this.$emit('changeTag',{
            key:this.colKey,
            tagCount: this.tagCount
          });
      }
  },
  created() {
  }
}
</script>

