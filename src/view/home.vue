<template>
	<div class="layout">
		<Row type="flex">
			<Col span="3" class="layout-menu-left">
			<!--active-name="0-1"  默认选中项-->
			<Menu theme="dark" width="auto" :open-names="['0']" accordion >
				<div class="layout-logo-left">
					<img src="../assets/img/logo.png"  style="height: 100%;"/>
				</div>
				<Submenu :name="index" v-for="(item, index) in navData" :key="index">
					<template slot="title">
						<Icon :type="item.icon"></Icon>
						{{item.name}}
					</template>
					<router-link :to="cItem.url" v-for="(cItem,cIndex) in item.childen" :key="'c'+cIndex">
						<MenuItem :name="index+'-'+cIndex">{{cItem.name}}</MenuItem>
					</router-link>
				</Submenu>
			</Menu>
			</Col>
			<Col span="21">
			<!--头部-->
			<div class="layout-header">
				<div class="layout-ceiling">
					<!--登录成功显示-->
		            <div class="layout-ceiling-main" v-if="this.login.data.success">
						<div class="layout-ceiling-main">
							<Dropdown trigger="click">
						        <a href="javascript:void(0)">
						          	  {{userInfo.tname}}
						            <Icon type="arrow-down-b"></Icon>
						        </a>
						        <DropdownMenu slot="list" >
						            <DropdownItem><span @click="goUserInfo()">个人信息</span></DropdownItem>
						            <DropdownItem><span @click="loginOut()">退出登录</span></DropdownItem>
						        </DropdownMenu>
						    </Dropdown>
						</div>
						<div class="layout-ceiling-main">
							<Avatar src="https://cn.vuejs.org/images/logo.png" size="large" style="object-fit: cover; margin: 10px 15px; cursor: pointer;" />
						</div>
					 </div>
					<div class="layout-ceiling-main" v-else>
						<a href="#">登录</a> |
						<a href="#">注册</a>
					</div>
					
				</div>
			</div>
			<!--面包屑-->
			
			<div class="layout-breadcrumb">
				<Breadcrumb>
					<BreadcrumbItem v-if="index == $route.matched.length-1" v-for="(item , index) in $route.matched"  :key="index">{{item.name}}</BreadcrumbItem>
					<BreadcrumbItem v-else-if="index == 0"  href="$route.matched.path"  :key="index">{{item.name}}</BreadcrumbItem>
				</Breadcrumb>
			</div>
			<!--中部内容部分-->
			<div class="layout-content">
				<router-view></router-view>
			</div>
			<!--底部footer-->
			<div class="layout-copy">
				2017-2017 &copy; From Tab
			</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	import ykp from '@/assets/js/ykp.js';
	import * as types from '../store/constant/type'
	export default {
		data() {
			return {
				navData: [{
					name: '商品管理',
					icon: 'ios-navigate',
					childen: [{
							name: '商品列表',
							icon: 'ios-analytics',
							url: '/commlist'
						},
						{
							name: '商品分组',
							icon: 'ios-analytics',
							url: '/test'
						},
						{
							name: '商品回收站',
							icon: 'ios-analytics',
							url: '/recycle'
						},
						{
							name: '测试',
							icon: 'ios-analytics',
							url: '/demo'
						}
					]
				}, {
					name: '文章管理',
					icon: 'ios-navigate',
					childen: [{
							name: '普通文章列表',
							icon: 'ios-analytics',
							url: '/'
						},
						{
							name: '有图文章',
							icon: 'ios-analytics',
							url: '/main'
						},
						{
							name: '文章回收站',
							icon: 'ios-analytics',
							url: '/'
						},
						{
							name: '文章评论',
							icon: 'ios-analytics',
							url: '/main'
						}
					]
				}, {
					name: '系统设置',
					icon: 'ios-navigate',
					childen: [{
							name: '基本信息',
							icon: 'ios-analytics',
							url: '/'
						}
					]
				}],
				userInfo:{}
			}
		},
		computed:{
			...mapState([
				'login'
			])
		},
		methods:{
			...mapMutations([
				'LOGIN_OUT'
			]),
			loginOut() {
				this.LOGIN_OUT();
				if(!this.login.data.success) {
					this.$Message.success('退出成功!');
					this.$router.next({path:'Login'});
				}
			},
			getUserInfo() {
				this.userInfo = JSON.parse(ykp.getSessionStorage('userInfo'));
				this.$store.dispatch('getUserInfo');
				if(this.userInfo) {
					this.$store.commit(types.FETCH_USER_SUC,{
						data : true,
						userInfo:this.userInfo
					})
				}
			},
			goUserInfo() {
				this.$router.next({path:'personInfo'});
			}
		},
		mounted() {
			this.getUserInfo();
		}
	}
</script>

<style>
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	span {
		font-family: "微软雅黑";
		font-weight: 100;
	}
	.ivu-menu-drop-list {
		z-index: 999;
	}
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: absolute;
		width: 100%;
		top: 0px;
		bottom: 0px;
	}
	.ivu-breadcrumb>span:last-child{
		font-weight: 500;
	}
	.ivu-select-dropdown{
		margin: auto;
	}
	.ivu-row-flex {
		width: 100%;
		height: 100%;
	}
	
	.ivu-menu-item a {
		color: rgba(255, 255, 255, .7) !important;
	}
	
	.ivu-menu-item a:hover {
		color: #fff !important;
	}
	
	.router-link-active {
		color: #fff !important;
	}
	
	.layout-breadcrumb {
		padding: 10px 15px 0;
	}
	
	.layout-content {
		min-height: 200px;
		position: absolute;
		width: calc(100% - 30px);
		top: 105px;
		bottom: 50px;
		right: 15px;
		left: 15px;
		overflow: auto;
		background: #fff;
		border-radius: 4px;
	}
	
	.layout-content-main {
		padding: 10px;
	}
	
	.layout-copy {
		text-align: center;
		padding: 10px 0 20px;
		color: #9ea7b4;
		position: absolute;
		bottom: 0px;
		width: calc(100% - 30px);
	}
	
	.layout-menu-left {
		/*width:220px;*/
		background: #464c5b;
		height: 100%;
		overflow-y: scroll;
	}
	
	.layout-menu-left::-webkit-scrollbar {
		width: 0px;
	}
	
	.layout-header {
		height: 60px;
		background: #fff;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
	}
	
	.layout-ceiling {
		line-height: 60px;
		overflow: hidden;
	}
	
	.layout-ceiling-main {
		float: right;
		margin-right: 15px;
	}
	
	.layout-ceiling-main a {
		color: #9ba7b5;
	}
	
	.layout-logo-left {
		width: 90%;
		height: 50px;
		/* background: #5b6270; */
		border-radius: 3px;
		margin: 5px auto;
	}
</style>