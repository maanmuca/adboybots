// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from "./router";

import {store} from './store';
// Tell Vue to use the plugin
var VueCookie = require('vue-cookie');






Vue.config.productionTip = false
Vue.use(VueCookie);


Vue.use(Vuetify, {
  theme: {
    "primary": "#007bff",
    "secondary": "#007bff",
    "accent": "#FFFFFF",
  }
})

Vue.use(Vuetify,{
  iconfont: 'mdi'
 })

 Vue.use(Vuetify, {
  iconfont: 'fa'
 })


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");