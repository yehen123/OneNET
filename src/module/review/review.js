import Vue from 'vue'
import app from './app'
import VueRouter from 'vue-router'
import home from 'components/home.vue'
//import audit from './view/audit'
import mana from './view/mana'
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
    '/mana': {
        component: mana
    }
})
router.start(App, '#app')

