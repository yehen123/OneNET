/**
 * Created by Mahao on 2016/9/13.
 */

import Vue from 'vue'
import app from './app'
import VueRouter from 'vue-router'
import productTable from './view/paging-product'
import userTable from './view/paging-user'
import home from 'components/home'
import { RadonInstall } from 'radon-ui'
Vue.use(RadonInstall, {
    Modal: true,
    Notification: true
});
Vue.use(VueRouter);
window.router = new VueRouter({
	abstract: true
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
		component: home
	},
	'/user': {
		name: "user",
		component: userTable
	},
	'/product': {
		name: "product",
		component: productTable
	}
});
router.start(App, '#app');

