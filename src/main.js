// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入iviw组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor);

//import axios from 'axios';
//axios.defaults.baseURL = '';
Vue.use(router);
Vue.use(iView);
Vue.config.productionTip = false;

import animate from 'animate.css';

Vue.use(animate);

import store from './store/index';

import ykp from '@/assets/js/ykp.js'
// 引入扩展文件
import hm from './assets/js/hm';


Vue.prototype.hm = hm;

router.beforeEach((to, from, next) => {
	var loginStatus = ykp.getSessionStorage('userInfo');
	if(!loginStatus && to.path != '/login') {
		next({
	      path: '/login'
	  })
	}else if(to.path == '/' && loginStatus) {
		next({
			path: '/info'
		})
	}else if(to.path == '/login' && loginStatus){
		next({
			path: '/info'
		})
	}else{
		next();
	}
})
new Vue({
	router,
	store,

	render: h => h(App)
}).$mount('#app')