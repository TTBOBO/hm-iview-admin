<<template>
  <div>
      <Card :style="{height:conHeight}">
        <p slot="title">
            <Icon type="ivu-icon ivu-icon-person"></Icon>
            个人资料
        </p>
        <Row class="row_padd" justify="space-around">
            <Col span="10" style="padding-left: 8px;">
            <!-- {{userInfo}} -->
                <Form ref="changeUserInfo" :model="changeUserInfo" :rules="userValidate" :label-width="90">
                        <FormItem label="用户名：" prop="tname">
                            <label v-show="infoStatus">{{ userInfo.tname}}</label>
                            <Input v-show="editStatus" v-model="changeUserInfo.tname" placeholder="用户名："></Input>
                        </FormItem>
                        <!-- {{login.userData}} -->
                         <FormItem label="我的头像：">
			         		 <div class="demo-upload-list" v-for="item in uploadList">
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
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                type="drag"
                                action="http://www.huiming.com/api/api_common/upload_img"
                                :headers= headers
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
			            </FormItem>
                        <FormItem label="电子邮箱：">
                            <label v-show="infoStatus">{{ userInfo.email}}</label>
                            <Input v-show="editStatus" v-model="changeUserInfo.email" placeholder="电子邮箱："></Input>
                        </FormItem>
                        <FormItem label="性别">
                            <label v-show="infoStatus">{{ userInfo.sex == 0 ? '男' : '女'}}</label>
                            <RadioGroup v-show="editStatus" v-model="changeUserInfo.sex">
                                <Radio label="0" >男</Radio>
                                <Radio label="1" >女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="密码：" >
                           <Button type="text" @click="changePassword">修改密码</Button>
                        </FormItem>
                </Form>
                <div v-show="infoStatus">
                    <Button type="primary" @click="goEdit">编辑</Button>
                </div>
                <div  v-show="editStatus">
                     <Button type="text" @click="reset(userInfo)">取消</Button>
                    <Button type="primary" @click="handleSubmit('userInfo')">保存</Button>
                </div>
            </Col>
        </Row>
    </Card>
    
    <Modal v-model="chanePwd"  title="修改密码" :loading="loading" width="500px" @on-cancel="rest" @on-ok="submit" ok-text="保存">
	    	<Form label-position="right" :rules="pwdValidate" :model="pwdData" ref="pwdData" :label-width="120">
	    		<Row>
	    			<Col span="24">
	    				<FormItem label="原始密码：" prop="oldPwd">
				             <Input   v-model="pwdData.oldPwd" type="password" ></Input>
				        </FormItem>
                        <FormItem label="新密码：" prop="newPwd">
				             <Input   v-model="pwdData.newPwd" type="password" ></Input>
				        </FormItem>
                        <FormItem label="确认新密码：" prop="testPwd">
				             <Input   v-model="pwdData.testPwd" type="password" ></Input>
				        </FormItem>
	    			</Col>
	    		</Row>
	     </Form>
		</Modal>
  </div>
</template>
<<script>
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import hm from '@/assets/js/hm.js';
export default {
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                 callback(new Error('请输入密码'));
            } else {
                if (this.pwdData.testPwd !== '') {
                    // 对第二个密码框单独验证
                     this.$refs.pwdData.validateField('testPwd');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.pwdData.newPwd) {
                 callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return{
            defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                goodsInfo:{},
                userValidate:{
                    tname:[ { required: true, message: '用户名不能为空', trigger: 'blur' },{type:'string',max:10,message:'名称多为10个',trigger:'blur'}],
                },
                conHeight:'',
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                editStatus:false ,  //编辑状态
                infoStatus:true,    //查看状态
                userInfo:{
                    sex:0,
                    uname:'123',
                    eamil:''
                },
                changeUserInfo:{},
                //model显示隐藏
                chanePwd:false,
                pwdData:{
                    oldPwd:"",
                    testPwd:"",
                    newPwd:""
                },  
                //验证修改密码
                pwdValidate:{
                    oldPwd:[ { required: true, message: '原始密码不能为空', trigger: 'blur' },{type:'string',message:'至少输入6位数',trigger:'blur'}],
                    newPwd: [
                        { required: true, validator: validatePass, trigger: 'blur' },{type:'string',message:'至少输入6位数',trigger:'blur'}
                    ],
                    testPwd: [
                        { required: true, validator: validatePassCheck, trigger: 'blur' },{type:'string',message:'至少输入6位数',trigger:'blur'}
                    ],
                },  
                loading:true,
        }
    },
    computed:{
        ...mapState([
            'login'
        ])
    },
  methods: {
       ...mapMutations([
            'LOGIN_OUT'
       ]),
        changePassword() {
            this.chanePwd = !this.chanePwd;
        },
        //编辑状态
        goEdit() {
            this.changeUserInfo = hm.getKey(this.login.userData);
            this.editStatus = !this.editStatus;
            this.infoStatus = !this.infoStatus;
           
        },
        handleSubmit(name) {
            this.$refs['changeUserInfo'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('edit',this.changeUserInfo);
                    setTimeout(() => {
                        console.log(this.login.changePwd.status);
                        if(this.login.changePwd.status){
                            this.$Message.success('编辑成功');
                            this.goEdit();
                            this.userInfo = hm.getKey(this.login.userData);
                        }
                    }, 200);
                }
            })
            
            
           
        },
        reset() {
            this.$refs.changeUserInfo.resetFields();
            this.goEdit();
        },
        submit() {
            this.$refs['pwdData'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('changePwd',this.pwdData);
                    setTimeout(() => {
                       console.log(this.login);
                       if(this.login.changePwd.status) {
                            this.$Message.success('修改成功!');
                            this.chanePwd = !this.chanePwd;
                            this.loading = false;
                            setTimeout(() => {
                                this.loading=true;
                            }, 100);
                            this.LOGIN_OUT();
                            if(!this.login.data.success) {
                                this.$router.next({path:'Login'});
                            }
                       }else{
                            this.$Message.error(this.login.changePwd.msg);
                            
                            this.loading = false;
                            setTimeout(() => {
                                this.loading=true;
                            }, 100);
                            
                       }
                    }, 500);
                } else {
                    this.chanePwd = true;
                    this.loading = false;
                    setTimeout(() => {
                        this.loading=true;
                    }, 100);
                }
            })
        },
        rest() {
            this.$refs.pwdData.resetFields();
        },
      
        getheight() {
            this.conHeight = (document.querySelector(".layout-content").clientHeight -10)+'px';
            // this.userInfo = hm.getkey(this.login.userData);
           
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
             this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            // 因为上传过程为实例，这里模拟添加 url
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
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
            console.log(this.uploadList.length);
            const check = this.uploadList.length < 5 ;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 5 张图片。'
                });
            }
            return check;
        },
        update() {
            setTimeout(() => {
                this.userInfo = this.login.userData;
            }, 100);
        }
  },
  updated() {
        this.update();
        
        
  },
  mounted() {
        this.getheight();
        this.uploadList = this.$refs.upload.fileList;
  }
}
</script>
<style>
.infoTitle {
  padding: 8px 8px;
  background: #f5f7f9;
  border-radius: 2px;
  margin: 15px 10px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>

