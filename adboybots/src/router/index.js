import Vue from 'vue'
import Router from 'vue-router'
import AdboyBotsWelcome from '@/pages/AdboyBotsWelcome'
import adboyBotsDashboard from '@/pages/adboyBotsDashboard'
import adboyBotsProfile from '@/pages/adboyBotsProfile'


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
    },
    ,
      {
        path:'/profilebot',
        name:'adboyBotsProfile',
        component:adboyBotsProfile
    }
  ]
})

