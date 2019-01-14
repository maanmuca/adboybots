import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios);



export const store =  new Vuex.Store({
    state:{
        currentFbPgId:null,
        adboyBotsToken:null,
        setFacebookPagesInfo:null,
        chatbotPages:[]
    },
  mutations: {
    setCurrentFbPgId:(state,currentFbPgId)=>{
        state.currentFbPgId = currentFbPgId;
    },
    setCookie:(state,cookieToken)=> {
        // mutate state
        state.adboyBotsToken = cookieToken;
      },
    setFacebookPages:(state,facebookPages)=> {
      // mutate state
      state.facebookPagesInfo = facebookPages;
    },
    setChatbotPage:(state,newChatbot)=>{
        console.log("saving chatbot..."+JSON.stringify(newChatbot));
        state.chatbotPages.push(newChatbot);
    }
  },
    actions:{
        getAdboyBotsToken:(context,cookieToken)=>{

            context.commit('setCookie',cookieToken);
        },
        setFacebookPagesInfo:(context,adboyBotsToken)=>{
            let url = 'https://localhost/api/facebookPages';
            // console.log("Just about to send request to..."+url);
            // console.log("this.$store.state.adboyBotsToken..."+this.$store.state.adboyBotsToken);
            axios({
            method:'get',
            url:url,
            headers: {'Authorization': `bearer ${adboyBotsToken}`}
            })
            .then(facebookPages => {
                console.log("results in store--->"+JSON.stringify(facebookPages.data));
                context.commit('setFacebookPages', facebookPages.data);
            })
        },
        
    }
})

