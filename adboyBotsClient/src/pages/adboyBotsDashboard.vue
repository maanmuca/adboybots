<template>
    <v-app>
        <v-toolbar  flat color="white" app class="elevation-1" >
            <v-avatar
                    tile="tile"
                    :size="48"
                    color="white lighten-4"
                    class="hidden-sm-and-down"
                >
                    <img src="@/assets/adboy-logo.png" alt="avatar">
                </v-avatar>
            <v-toolbar-title style="color:#007bff; font-weight: 500;">Adboy Bots</v-toolbar-title>
            
            <v-spacer></v-spacer>
            <!-- <v-toolbar-items class="hidden-sm-and-down" >
                <v-btn style="color:#007bff; " flat><i class="fas fa-ellipsis-v fa-lg"></i></v-btn> -->
                <!-- <v-btn style="color:#007bff; font-weight: 500;" flat>About us</v-btn>
                <v-btn style="color:#007bff; font-weight: 500;" flat>Privacy policy</v-btn>
                <v-btn style="color:#007bff; font-weight: 500;" flat>Terms of use</v-btn> -->
            <!-- </v-toolbar-items> -->
            <v-toolbar-items >
                <v-btn flat v-on:click="deleteCookie()"><a href="https://localhost:443/auth/logout">Log out</a></v-btn>
                <v-btn flat><v-avatar
                 :size="40"
                  color="transparent"
                >
                    <img :src="profileUrl" alt="avatar">
                </v-avatar></v-btn>
                
                <v-btn flat>Hi {{profileName}} !</v-btn>
                <v-menu offset-y>
                
                <v-btn slot="activator" flat><v-icon  style="color:green;">fas fa-robot</v-icon></v-btn>
                <v-list  v-if="chatbots.length>0">
                    <v-list-tile
                    v-for="(itemMenu, index) in chatbots"
                    :key="index"  
                   
                    >
                    <v-list-tile-title><v-icon>{{ itemMenu.icon }}</v-icon> {{ itemMenu.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
                <v-list  v-else>
                    <v-list-tile>
                    <v-list-tile-title><v-icon>fas fa-robot</v-icon>Not Chatbots at this moment!</v-list-tile-title>
                    </v-list-tile>
                </v-list>
                </v-menu>
                <v-menu offset-y>
                <v-btn style="color:#007bff;" slot="activator" flat><i class="material-icons">more_vert</i></v-btn>
                <v-list>
                <v-list-tile>
                    <v-list-tile-title>About us</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                    <v-list-tile-title>Privacy policy</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                    <v-list-tile-title>Terms of use</v-list-tile-title>
                    </v-list-tile>
                </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar> 
        <v-content>
            <v-dialog
                v-model="myLoader"
                >
                <template>
                <v-layout>
                    <v-flex
                    xs12
                    fluid
                    style="padding:200px; background-color:white;"
                    class="text-xs-center"
                    light
                    >
                    <v-progress-circular
                        :size="200"
                        color="primary"
                        indeterminate
                    >
                    Loading...
                    </v-progress-circular>
                    </v-flex>
                </v-layout>
            </v-dialog>
            <v-container fixed grid-list-md text-xs-center> 
                 <v-toolbar dark color="primary">
                    <v-toolbar-side-icon>
                        <v-icon small>fab fa-facebook-messenger</v-icon>
                    </v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">Facebook Messenger</v-toolbar-title>
                </v-toolbar>
                <v-layout row wrap>
                    <v-flex  xs6 >
                        <v-card light color="white" style= "height:450px; overflow-y: scroll; " class="pa-3"  >
                            <v-hover v-for="(pageInfo,indexPageInfo) in pagesInfo" :key="'page-info'+indexPageInfo" >       
                                <v-card v-on:click="changePage(indexPageInfo)"  color="white" light slot-scope="{ hover }" :class="`mb-3 elevation-${hover ? 3 : 6}`" >
                                    <v-card-actions class="pa-2">
                                    <v-icon class="pl-4 pr-2" color="#007bff">fab fa-facebook</v-icon>    Facebook page
                                    
                                    </v-card-actions>
                                     <v-divider light></v-divider>
                                    <v-layout   >
                                        <v-flex xs2 class="pt-4 text-xs-right">
                                        <img :src="pageInfo.url_img_page" class="mt-2" alt="avatar" width="48" height="48">
                                        </v-flex>
                                        
                                        <v-flex xs8 class="pt-3 text-xs-center">
                                        <v-card-title primary-title>
                                            <div>
                                            <div class="title">{{pageInfo.name_page}}</div>
                                            </div>
                                            
                                        </v-card-title>
                                        </v-flex>
                                        <v-flex xs2>
                                        <v-card-title primary-title>
                                            <div>
                                            <div>State:</div>
                                            <div v-if="pageInfo.state=='active'"><v-icon color="green">fas fa-robot</v-icon></div>
                                            <div v-if="pageInfo.state=='active'">Active</div>
                                            <div v-if="pageInfo.state=='errors'"><v-icon color="red">fas fa-robot</v-icon></div>
                                            <div v-if="pageInfo.state=='errors'">errors</div>
                                            <div v-if="pageInfo.state=='inactive'"><v-icon color="orange">fas fa-robot</v-icon></div>
                                            <div v-if="pageInfo.state=='inactive'">Not active</div>
                                             <div v-if="pageInfo.state=='notChatbot'"><v-icon color="grey">fas fa-robot</v-icon></div>
                                            <div v-if="pageInfo.state=='notChatbot'">Not Chatbot</div>
                                            </div>
                                        </v-card-title>
                                        </v-flex>
                                        
                                    </v-layout>
                                </v-card>
                            </v-hover>
                        </v-card>
                    </v-flex>
                     <v-flex  xs6 >
                        <v-card light color="white" style= "height:450px; " class="pa-3"  >
                              <template v-for="(pageInfo,indexPageInfo) in pagesInfo" >    
                                <v-card v-if="pageSelected==pageInfo.name_page" :key="'page-info-card'+indexPageInfo" color="white" light >
                                    <v-card-actions class="pa-2">
                                    <v-icon class="pl-4 pr-2" color="#007bff">fas fa-robot</v-icon>    Chatbot:
                                    
                                    </v-card-actions>
                                     <v-divider light></v-divider>
                                    
                                        <v-layout>
                                          <v-flex xs6>
                                              <v-card color="white" height="200" class="ml-2 pl-5 pr-5 pb-5 pt-3">
                                                  <img :src="pageInfo.url_img_page" class="mt-2" alt="avatar" width="72" height="72">
                                                   <div class="subheading">{{pageInfo.name_page}}</div>
                                              </v-card>
                                          </v-flex>
                                          <v-flex xs6>
                                              <v-card color="#007bff" dark height="200" class="mr-2 pa-4">
                                                  <div class="subheading">Reachable Users:</div>
                                                  <div class="display-1 pt-1">{{pageInfo.reachable_users}}</div>
                                                  <div class="subheading">Active users this week:</div>
                                                  <div class="display-1 pt-1">{{pageInfo.reachable_users_week}}</div>
                                              </v-card>
                                          </v-flex>
                                        </v-layout>
                                        <v-layout>
                                          <v-flex xs12>
                                              <v-card color="white" height="150" class="mr-2 ml-2 pa-1">
                                                  <div class="subheading">State:</div>
                                                  <div class="headline" v-if="pageInfo.state=='active'" style="color:green;">{{pageInfo.state}}</div>
                                                   <div class="headline" v-if="pageInfo.state=='inactive'" style="color:orange;">{{pageInfo.state}}</div>
                                                   <div class="headline" v-if="pageInfo.state=='errors'" style="color:red;">{{pageInfo.state}}</div>
                                                   <div class="headline" v-if="pageInfo.state=='notChatbot'" style="color:grey;">Not Chatbot</div>
                                                  <v-layout v-if="pageInfo.state=='inactive'">
                                                      <v-flex xs6>
                                                          <router-link style="text-decoration:none;" :to="'/profilebot/'+pageInfo.id_page"><v-btn color="info" v-on:click="setLoader()">Edit</v-btn></router-link>
                                                      </v-flex>
                                                      <v-flex xs6>
                                                          <v-btn color="error">Delete</v-btn>
                                                      </v-flex>
                                                  </v-layout>
                                                  <v-layout v-if="pageInfo.state=='errors'">
                                                      <v-flex xs12 class="text-xs-center">
                                                          <router-link style="text-decoration:none;" :to="'/profilebot/'+pageInfo.id_page"><v-btn color="info" v-on:click="setLoader()">Edit</v-btn></router-link>
                                                      </v-flex>
                                                  </v-layout>
                                                  <v-layout v-if="pageInfo.state=='active'">
                                                      <v-flex xs6>
                                                          <router-link style="text-decoration:none;" :to="'/profilebot/'+pageInfo.id_page"><v-btn color="info" v-on:click="setLoader()">Edit</v-btn></router-link>
                                                      </v-flex>
                                                      <v-flex xs6>
                                                          <v-btn color="warning">Stop</v-btn>
                                                      </v-flex>
                                                  </v-layout>
                                                  <v-layout v-if="pageInfo.state=='notChatbot'">
                                                      <v-flex xs12>
                                                          <router-link style="text-decoration:none;"  :to="'/profilebot/'+pageInfo.id_page"><v-btn color="info" >Create Chatbot</v-btn></router-link>
                                                      </v-flex>
                                                  </v-layout>
                                              </v-card>
                                          </v-flex>
                                        </v-layout>
                                    <v-divider light></v-divider>
                                </v-card>
                              </template>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container> 
        </v-content>
        </v-app>
</template>
<script>
 import axios from 'axios';
 export default {
 name:'adboyBotsDashboard',
 data: () => ({
     myLoader:null,
    pageSelected:null,
    profileName:null,
    profileUrl:null,
    chatbots:[],
    pagesInfo:null
     
 }),

     created:  function () {
      
      this.getFbPages();
      
      this.profileName = this.$cookie.get('user_name');
      this.profileUrl = this.$cookie.get('url_img_profile');
    },
  
 methods:
  {
      setLoader()
      {
          this.$set(this,"myLoader",true);
      },
      getFbPages()
      {
           this.$set(this,"myLoader",true);
          let lecookie = this.$cookie.get('request_adboyBots_token');
          let url = 'https://localhost/api/facebookPages';
            // console.log("Just about to send request to..."+url);
            // console.log("this.$store.state.adboyBotsToken..."+this.$store.state.adboyBotsToken);
            axios({
            method:'get',
            url:url,
            headers: {'Authorization': `bearer ${lecookie}`}
            })
            .then(facebookPages => {
                this.$set(this,"myLoader",false);
                //console.log("facebookPages--->>>>--->>>"+JSON.stringify(facebookPages));
                this.$set(this,"pagesInfo",facebookPages.data);
                this.$set(this,"pageSelected",facebookPages.data[0].name_page);
            })
      },
      deleteCookie()
      {
          let lecookie ="";
          this.$store.dispatch('getAdboyBotsToken',lecookie);
          this.$cookie.delete('request_adboyBots_token');
          this.$cookie.delete('user_name');
          this.$cookie.delete('url_img_profile');    
      },
      changePage(indexPageInfo)
      {
         this.$set(this,'pageSelected',this.pagesInfo[indexPageInfo].name_page);
      }
    }
 
}
</script>