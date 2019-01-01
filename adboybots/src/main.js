// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from "./router";






Vue.config.productionTip = false


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

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
