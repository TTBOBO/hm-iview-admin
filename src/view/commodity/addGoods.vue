
<template>
	<div>
		<Row type="flex" justify="space-around" class="row_padd">
			<Col span="23" class="infoTitle">基本信息</Col>
		</Row>
		<Row class="row_padd" justify="space-around">
			<Col span="10" style="padding-left: 8px;">
			<!-- {{goodsValidate}}  {{goodsInfo}} -->  {{goodsInfo}}
				<Form ref="goodsInfo"  :model="goodsInfo" :rules="goodsValidate" :label-width="90">
					<FormItem label="商品名称" prop="name">
						 <Input v-model="goodsInfo.name" @on-change="changeNum" placeholder="商品名称"></Input>
					</FormItem>
					<FormItem label="类目" prop="type">
			            <Select v-model="goodsInfo.type" placeholder="请选择类目">
							<Option v-for="item in addGoods.typeList" :value="item.value" key=item>{{item.label}}</Option>
			            </Select>
			        </FormItem>
			         <FormItem label="商品图片" prop="uploadList">
			         		<div class="demo-upload-list" v-model="goodsInfo.uploadList" v-for="item in goodsInfo.uploadList" key=item>
						        <template v-if="item.status === 'finished'">
						            <img :src="item.url">
						            <div class="demo-upload-list-cover">
						                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
						                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
						            </div>
						        </template>
						        <template v-else>
						            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						        </template>
						    </div>
						    <Upload
						        ref="upload"
						        :show-upload-list="false"
						        :default-file-list="addGoods.goodsInfo.defaultList"
						        :on-success="handleSuccess"
								
						        :format="['jpg','jpeg','png']"
						        :max-size="2048"
						        :on-format-error="handleFormatError"
						        :on-exceeded-size="handleMaxSize"
						        :before-upload="handleBeforeUpload"
						        multiple
								method="post"
						        type="drag"
						        action="http://www.huiming.com/api/api_common1/upload_file"
						        style="display: inline-block;width:80px;">
						        <div style="width: 80px;height:80px;line-height: 80px;">
						            <Icon type="camera" size="20"></Icon>
						        </div>
						    </Upload>
			        </FormItem>
			        <FormItem label="本店售价" prop="currentPrice">
						 <Input v-model="goodsInfo.currentPrice" number placeholder="本店售价"></Input>
						 <!-- <InputNumber :min="1" v-model="goodsInfo.currentPrice"></InputNumber> -->
					</FormItem>
					<FormItem label="市场价" prop="marketPrice">
						 <Input v-model="goodsInfo.marketPrice" number placeholder="市场价"></Input>
					</FormItem>
					<FormItem label="商品库存" prop="stock">
						{{goodsInfo.stock.value}}
						 <Input :model="goodsInfo.stock.value" number placeholder="商品库存"></Input>
					</FormItem>
					<FormItem label="库存预警值" prop="noticeNum">
						 <Input v-model="goodsInfo.noticeNum.value" number placeholder="库存预警值"></Input>
					</FormItem>
					<FormItem label="销量" prop="salesNum">
						 <Input v-model="goodsInfo.salesNum" number placeholder="销量"></Input>
					</FormItem>
					<FormItem label="邮费" prop="postage">
						 <Input v-model="goodsInfo.postage" number placeholder="邮费"></Input>
					</FormItem>
					<FormItem label="上架" prop="status">
						 <RadioGroup v-model="goodsInfo.status">
			                <Radio label="1" >立即上架</Radio>
			                <Radio label="2" >暂不上架</Radio>
			                <Radio label="3" >定时上架</Radio>
			            </RadioGroup>
					</FormItem>
					<FormItem label="商品服务" prop="service">
			            <CheckboxGroup v-model="goodsInfo.service">
			                <Checkbox  v-for="item in addGoods.serviceList" :label=item.label key=item>{{item.title}}</Checkbox>
			            </CheckboxGroup>
			        </FormItem>
				</Form>
			</COl>
		</Row>
		<Row type="flex" justify="space-around" class="row_padd">
			<Col span="23" class="infoTitle">商品详情</Col>
			<div style="width: 1080px;">
				<quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      style="height: 150px; width: 100%; margin-top: 10px;"
                      >
        		</quill-editor>
			</div>
		</Row>
		<div class="buttonTool">
				<Button type="primary" @click="handleSubmit('goodsInfo')">保存</Button>
				<Button type="primary" @click="reset">取消</Button>
			</div>
	</div>
</template>

<script>
	import {mapState, mapActions, mapMutations} from 'vuex'
	export default {
		data() {
			const validateNum = (rule,value,callback) => {
				console.log(value);
				setTimeout(() => {
					if(!/^[1-9]\d*(\.\d+)?$/.test(value)) {
						callback(new Error('请输入大于0的数字值'));
					}else {
						callback();
					}
				},200)
			};
			return {
				msg:'添加商品!',
				goodsInfo:{
					name:'',
					type:'',
					img:''
				},
				content:'13',
				editorOption: {},
				goodsValidate:{
					name:[{ required: true, message: '名称不能为空', trigger: 'blur' },{type:'string',min:6,message:'名称最少为6个',trigger:'blur'}],
					type:[{required:true,message:'类型不能为空',trigger:'change'}],
					currentPrice:[{required:true,validator:validateNum,trigger:'blur',key:"123"}],
					marketPrice:[{required:true,validator:validateNum,trigger:'blur'}],
					stock:[{required:true,validator:validateNum,trigger:'blur'}],
					noticeNum:[{required:true,validator:validateNum,trigger:'blur'}],
					salesNum:[{required:true,validator:validateNum,trigger:'blur'}],
					postage:[{required:true,validator:validateNum,trigger:'blur'}],
					status:[{required:true,validator:validateNum,trigger:'change'}],
				},
				defaultList: [], //默认显示图片
                imgName: '',
				uploadList: [],
				header:{"Content-Type":"application/json; charset=utf-8;"},
			}
		},
		computed: {
			editor() {
				return this.$refs.myTextEditor.quill
			},
			...mapState([
				'addGoods'
			]),
		},
		creat() {
			
			this.defaultList = this.addGoods.goodsInfo.defaultList;   //页面初始化图片
		},
		watch:{
			$router:'setDate'
		},
		methods:{
			setDate() {
				alert(1);
			},
			init() {
				this.goodsInfo = this.addGoods.goodsInfo;   //页面初始化数据
				this.defaultList = this.addGoods.goodsInfo.defaultList;   //页面初始化图片
				console.log(this.$refs.upload.fileList);
				this.goodsInfo.uploadList = this.$refs.upload.fileList;
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.goodsInfo.uploadList.length == 0) {
							this.$Message.error('最少上传一张图片！');
						}else {
							this.$store.dispatch('addGoods',this.goodsInfo);
							console.log(this.addGoods.addStatu+"--------------------");
							if(this.addGoods.addStatu) {
								this.$Message.success('添加成功!');
								this.$router.back(-1);
							}else {
								this.$Message.error('添加失败!');
							}
						}
					}else {
						 this.$Message.error('红色带星项不能为空');
					}
					
				})
			},
			changeNum(event) {
				alert(event);
			},
			reset() {
				this.$Message.success('添加成功!');
			},
			handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
				const fileList = this.$refs.upload.fileList;
                this.goodsInfo.uploadList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file,response) {
				console.log(res);
				// 因为上传过程为实例，这里模拟添加 url
				// this.goodsInfo.uploadList.push({"name":file.name,"url":"https://file.iviewui.com/dist/fe8d29da1225d943e30f9ee1bddce78f.png"});
                file.url = res.data;
                file.name = file.name;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            }
		},
		mounted () {
			this.init();
			console.log(this.goodsValidate);
        }
	}
</script>

<style>
	.buttonTool {
		margin-top: 100px;
		margin-left: 40px;
	}
	.infoTitle {
		padding: 8px 8px;
		background: #f5f7f9;
		border-radius: 2px;
		margin: 15px 10px;
	}
	.demo-upload-list{
        display: inline-block;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>