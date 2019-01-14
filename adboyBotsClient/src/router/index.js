import Vue from 'vue'
import Router from 'vue-router'
import AdboyBotsWelcome from '@/pages/AdboyBotsWelcome'
import adboyBotsDashboard from '@/pages/adboyBotsDashboard'
import adboyBotsProfile from '@/pages/adboyBotsProfile'
import adboyBotsAiFaq from '@/pages/adboyBotsAiFaq'
import adboyBotsScripts from '@/pages/adboyBotsScripts'
import adboyBotsScripts1 from '@/pages/adboyBotsScripts.1'
import adboyBotsMainPage from '@/pages/adboyBotsMainPage'
import adboyBotsFbUsers from '@/pages/adboyBotsFbUsers'

import {store} from '../store'
import cookie from 'vue-cookie';


Vue.use(Router)
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);


export default new Router({
  routes: [
    {
        path:'/script',
        name:'adboyBotsScripts1',
        component:adboyBotsScripts1
      },
    {
      path:'/',
      name:'AdboyBotsWelcome',
      component:AdboyBotsWelcome
    },
    {
        path:'/home',
        name:'adboyBotsMainPage',
        component:adboyBotsMainPage 
    },
    {
        path:'/mydashboardFacebook',
        name:'adboyBotsDashboard',
        component:adboyBotsDashboard,
        beforeEnter: (to, from, next) => {

          let loggedIn =cookie.get('request_adboyBots_token');
          if(loggedIn)
          { 
              next();
          }
          if(!loggedIn || loggedIn==null || loggedIn==undefined || loggedIn=="")
          {
            next('/');
          }
        }
    },
      {
        path:'/profilebot/:id',
        //path:'/profilebot',
        name:'adboyBotsProfile',
        component:adboyBotsProfile,
        beforeEnter: (to, from, next) => {
          let leToken =cookie.get('request_adboyBots_token');
          console.log("to.params.id...."+to.params.id);
          let fbPgId = to.params.id;
          if(leToken)
          {
            let url = 'https://localhost/api/facebookPage';
            axios({
            method:'get',
            url:url,
            params: {
                fbPgId: fbPgId
            },
            headers: {'Authorization': `bearer ${leToken}`}
            })
            .then(fbPage => {
               console.log("FbPage router..."+JSON.stringify(fbPage))
               let newChatbot = 
            {
                facebookPageId:fbPgId,
                bussinesName:fbPage.data.name_page,
                category:fbPage.data.category_page,
                openingHours:
                    [
                        {day:"Monday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
                        {day:"Tuesday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
                        {day:"Wednesday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
                        {day:"Thursday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
                        {day:"Friday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
                        {day:"Saturday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
                        {day:"Sunday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true}
                    ],
                categories:
                    [
                    
                    {
                        categoryName:"Services",
                        categoryIsEditable:false,
                        dialogDeleteCategory:false,
                        panel:[true],
                        buttonSelected:"Select a button",
                        labelCheckboxbutton:"Use same button all category",
                        sameButtonAllCategory:true,
                        attrEditable:true,
                        dialogConfirmDeleteAttribute:false,
                        myAttributeText:null,
                        posAttributeOnheaders:null,
                        dialogAddNewAttribute:false,
                        dialogChangePropertiesAttributes: false,
                        buttonList:[
                            "Send message",
                            "Buy Now",
                            "Book Now",
                            "Get Quote",
                            "Pricing",
                            "Enquire now",
                            "Learn More",
                            "Schedule call",
                            "Schedule appointment",
                            "Request appointment"
                        ],
                        headers: [
                            { text: 'Actions', value: 'actions' ,sortable: false,align:"center"},
                            { text: 'Title',value: 'title', sortable: false,align:"left"},
                            { text: 'Subtitle', value: 'subtitle', sortable: false ,align:"left"},
                            { text: 'Button', value: 'button' , sortable: false,align:"left"},
                            
                        ],
                        myRows: [
                            {
                            title: 'Service 1',
                            subtitle: 'Subtitle Service 1',
                            button: "Send message",
                            },
                            {
                            title: 'Service 2',
                            subtitle: 'Subtitle Service 2',
                            button: "Send message",
                            },
                            {
                            title: 'Service 3',
                            subtitle: 'Subtitle Service 3',
                            button: "Send message",
                            }
                        ]
                    },
                    {
                        categoryName:"Products",
                        categoryIsEditable:true,
                        dialogDeleteCategory:false,
                        panel:[true],
                        buttonSelected:"Select a button",
                        labelCheckboxbutton:"Use same button all category",
                        sameButtonAllCategory:true,
                        attrEditable:true,
                        dialogConfirmDeleteAttribute:false,
                        myAttributeText:null,
                        posAttributeOnheaders:null,
                        dialogAddNewAttribute:false,
                        dialogChangePropertiesAttributes: false,
                        buttonList:[
                            "Send message",
                            "Buy Now",
                            "Book Now",
                            "Get Quote",
                            "Pricing",
                            "Enquire now",
                            "Learn More",
                            "Schedule call",
                            "Schedule appointment",
                            "Request appointment"
                        ],
                        headers: [
                            { text: 'Actions', value: 'actions' ,sortable: false,align:"center"},
                            { text: 'Title',value: 'title', sortable: false,align:"left"},
                            { text: 'Subtitle', value: 'subtitle', sortable: false ,align:"left"},
                            { text: 'Button', value: 'button' , sortable: false,align:"left"},
                            { text: 'Image Url', value: 'imageUrl' , sortable: false,align:"left"},
                            
                        ],
                        myRows: [
                            {
                            title: 'Development',
                            subtitle: 'Software Development',
                            button: "Buy Now!",
                            imageUrl:"http://www.example.com/image.png"
                            }
                        ]
                    }
                    ]
                };
                let url ='https://localhost/api/createChatbot'; 
                axios({
                method:'post',
                url:url,
                data:{chatbot:newChatbot},
                headers: {'Authorization': `bearer ${leToken}`}
                })
                .then(chatbot => {
                  let url ='https://localhost/api/updateStateFacebookPage'; 
                  axios({
                  method:'post',
                  url:url,
                  data:{fbPgId:fbPgId,state:"inactive"},
                  headers: {'Authorization': `bearer ${leToken}`}
                  })
                  .then(chatbot => {
                    
                  next();

                  })
                  .catch(function (error) {
                      console.log(error);
                    
                  });
                

                })
                .catch(function (error) {
                    console.log(error);
                   
                });
            }).catch(function (error) {
                console.log(error);
            }); 
            
     
              
          }
          if(!leToken || leToken==null || leToken==undefined || leToken=="")
          {
            next('/');
          }
        }
    }
    ,
      {
        path:'/aifaq/:id',
        name:'adboyBotsAiFaq',
        component:adboyBotsAiFaq,
        beforeEnter: (to, from, next) => {
            let leToken =cookie.get('request_adboyBots_token');
            let fbPgId = to.params.id;
            store.commit('setCurrentFbPgId',fbPgId);
  
            // console.log("loggedIn..."+leToken);
            // console.log("The value in store of fbPgId..."+store.state.currentFbPgId);
            if(leToken){
                next();
            }
            if(!leToken || leToken==null || leToken==undefined || leToken=="")
            {
              next('/');
            }
        }
    }
    ,
    {
        path:'/fbusers/:id',
        name:'adboyBotsFbUsers',
        component:adboyBotsFbUsers,
        beforeEnter: (to, from, next) => {
            let leToken =cookie.get('request_adboyBots_token');
            let fbPgId = to.params.id;
            store.commit('setCurrentFbPgId',fbPgId);
  
            // console.log("loggedIn..."+leToken);
            // console.log("The value in store of fbPgId..."+store.state.currentFbPgId);
            if(leToken){
                next();
            }
            if(!leToken || leToken==null || leToken==undefined || leToken=="")
            {
              next('/');
            }
        }
    }
    ,
    
      {
        path:'/scripts/:id',
        name:'adboyBotsScripts',
        component:adboyBotsScripts,
        beforeEnter: (to, from, next) => {
          let leToken =cookie.get('request_adboyBots_token');
          let fbPgId = to.params.id;
          store.commit('setCurrentFbPgId',fbPgId);

        //   console.log("loggedIn..."+leToken);
        //   console.log("The value in store of fbPgId..."+store.state.currentFbPgId);
          if(leToken){
              next();
          }
          if(!leToken || leToken==null || leToken==undefined || leToken=="")
          {
            next('/');
          }
        }
    }
  ]
})

