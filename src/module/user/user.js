/**
 * Created by Mahao on 2016/9/13.
 */

import Vue from 'vue'
import app from './app'
import VueRouter from 'vue-router'
import home from 'components/home.vue'
import userTable from 'components/paging-nav'
import userdetail from './view/userdetail.vue'
import { RadonInstall } from 'radon-ui'
Vue.use(RadonInstall, {
    Modal: true,
    Notification: true
});


Vue.use(VueRouter);
window.router = new VueRouter({
//  hashbang: false,
	abstract: true
//  history: true //html5模式 去掉锚点
});
var App = Vue.extend({
	el: function() {
		return 'body'
	},
	components: { app },
	data : function() {
		return {t :2}
	}
});
router.map({
	'/': {
		component: 	home
	},
	'/user': {
		component: userTable
	},
	'/detail/:id': {
		name: "detail",
		component: userdetail
	}
});
router.start(App, '#app');


