import Vue from 'vue'
import app from './app'
import VueRouter from 'vue-router'
import Button from 'components/Button'
import home from 'components/home.vue'
import applist from './view/applist'
import priv from './view/private'
import pub from './view/public'
import plist from './view/plist'
import { RadonInstall } from 'radon-ui'
//new Vue({
//el: 'body',
//components: { app },
//data : {
//    t :2
//}
//})

Vue.use(VueRouter);
window.router = new VueRouter({
//  hashbang: false,
    abstract: true
//  history: true //html5模式 去掉锚点
})
Vue.use(RadonInstall, {
    Modal: true,
    Notification: true
})
//var home = Vue.extend({
//  template: '<p>This is home page!</p>'
//})
var App = Vue.extend({
  el: function() {
      return '#app'
  },
  components: { app },
})
router.map({
    '/': {
        component: home
    },
    '/applist': {
        component: applist
    },
    '/private': {
        component: priv
    },
    '/public': {
        component: pub
    },
    '/plist': {
        component: plist
    }
})
router.start(App, '#app')

