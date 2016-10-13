import Vue from 'vue'
import app from './app'
import VueRouter from 'vue-router'
import Button from 'components/Button'
import home from 'components/home'
import create from './view/create'
import list from './view/list'
import pagingAccount  from './view/pagingAccount'
import edit from './view/edit'
import { RadonInstall } from 'radon-ui'
//new Vue({
//el: 'body',
//components: { app },
//data : {
//    t :2
//}
//})

Vue.use(RadonInstall, {
  Notification: true,
  Modal: true
});

Vue.use(RadonInstall, {
  Notification: true
});
Vue.use(VueRouter);
window.router = new VueRouter({
//  hashbang: false,
    abstract: true
//  history: true //html5模式 去掉锚点
});
// var home = Vue.extend({
//   template: '<p>This is home page!</p>'
// });
var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
});
var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
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
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    },
    '/cus': {
        component: Button
    },
    '/create': {
        component: create
    },
    '/list': {
      component: list
    },
    '/pagingAccount': {
      component: pagingAccount
    },
    '/edit/:currData': {
      name:"edit",
      component: edit
    }
});
router.start(App, '#app')

