import Vue from 'vue'
import Router from 'vue-router'
import AdboyBotsWelcome from '@/pages/AdboyBotsWelcome'
import adboyBotsDashboard from '@/pages/adboyBotsDashboard'
import adboyBotsProfile from '@/pages/adboyBotsProfile'
import adboyBotsAiFaq from '@/pages/adboyBotsAiFaq'
import adboyBotsScripts from '@/pages/adboyBotsScripts'
import adboyBotsMainPage from '@/pages/adboyBotsMainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home',
      name:'adboyBotsMainPage',
      component:adboyBotsMainPage
    },
    {
        path:'/mydashboardFacebook',
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
    ,
      {
        path:'/aifaq',
        name:'adboyBotsAiFaq',
        component:adboyBotsAiFaq
    }
    ,
      {
        path:'/scripts',
        name:'adboyBotsScripts',
        component:adboyBotsScripts
    }
  ]
})

