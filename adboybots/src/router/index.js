import Vue from 'vue'
import Router from 'vue-router'
import AdboyBotsWelcome from '@/pages/AdboyBotsWelcome'
import adboyBotsDashboard from '@/pages/adboyBotsDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path:'/mydashboard',
        name:'adboyBotsDashboard',
        component:adboyBotsDashboard
    },
    {
      path:'/',
      name:'AdboyBotsWelcome',
      component:AdboyBotsWelcome
  }
  ]
})

