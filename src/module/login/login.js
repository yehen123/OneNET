import Vue from 'vue'
import app from './app'
import { RadonInstall } from 'radon-ui'



Vue.use(RadonInstall, {
    Modal: true,
    Notification: true
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { app }
})

