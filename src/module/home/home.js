import Vue from 'vue'
import app from './app'
import VueRouter from 'vue-router'
import Button from 'components/Button'
import home from 'components/home'
import index from './view/index'
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
var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
})
var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})
var App = Vue.extend({
  el: function() {
      return 'body'
  },
  components: { app },
  data : function() {
      return {t :2}
  }
})
router.map({
    '/': {
        component: home
    },
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    },
    '/cus': {
        component: Button
    },
    '/index': {
        component: index
    }
})
router.start(App, '#app')

