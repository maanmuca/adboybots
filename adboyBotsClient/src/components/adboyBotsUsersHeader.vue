<template>
<div>
    
    <v-navigation-drawer
    :mini-variant.sync="mini"
    v-model="drawer"
    :style="'height:'+drawerSize+'px; top:90px;'"
    app
    
  >
    <v-toolbar flat class="transparent"  >
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
             <img :src="fbPgImgUrl" alt="avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{fbPgName}}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile
        class="pt-2 pb-2"
      >
     
        <router-link to="/mydashboardFacebook">
          <v-list-tile-action>
            <v-icon   color="#007bff">fas fa-home</v-icon>
          </v-list-tile-action>
        </router-link>
          <v-list-tile-content>
            <v-list-tile-title  color="#007bff">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        
      </v-list-tile>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        class="pt-2 pb-2"
      >
     
        <router-link :to="item.linkTo+fbPgId">
          <v-list-tile-action>
            <v-icon   color="#007bff">{{ item.icon }}</v-icon>
          </v-list-tile-action>
        </router-link>
          <v-list-tile-content>
            <v-list-tile-title  color="#007bff">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        
      </v-list-tile>
     

    </v-list>
    
  </v-navigation-drawer >
  <v-toolbar  flat color="white" app class="elevation-1" >
      <v-avatar
            tile="tile"
            :size="40"
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
           <v-list>
            <v-list-tile
              v-for="(itemMenu, index) in chatbots"
              :key="index"  
            >
              <v-list-tile-title><v-icon>{{ itemMenu.icon }}</v-icon> {{ itemMenu.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>
         <v-menu offset-y>
          <v-btn style="color:#007bff;" slot="activator" flat><i class="material-icons">more_vert</i></v-btn>
           <v-list class="hidden-md-and-up">
             <v-list-tile class="text-xs-center"><v-icon style="color:green;">fas fa-robot</v-icon></v-list-tile>
            <v-list-tile
              v-for="(itemMenu, index) in items"
              :key="index"
              
            >
              <v-list-tile-title><v-icon>{{ itemMenu.icon }}</v-icon> {{ itemMenu.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
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
</div>
</template>
<style>
a {
  text-decoration: none;
}
</style>
<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        fbPgImgUrl:null,
        fbPgName:null,
        fbPgId:null,
        profileName:null,
        profileUrl:null,
        drawerSize:null,
       
        drawer: true,
        items: [
          
          { title: 'Profile', icon: 'fas fa-pen',linkTo:'/profilebot/' },
          { title: 'Scripts', icon: 'fas fa-book',linkTo:'/scripts/' },
          { title: 'Ai FAQ', icon: 'fas fa-brain',linkTo:'/aifaq/' },
          { title: 'People', icon: 'fas fa-users',linkTo:'/fbusers/' },
          { title: 'Broadcast', icon: 'fas fa-broadcast-tower',linkTo:'/broadcast/' },
          { title: 'Analytics', icon: 'fas fa-chart-area',linkTo:'/analytics/' },
          { title: 'Settings', icon: 'fas fa-cog',linkTo:'/settings/' }
        ],
        chatbots:[
          {title:'Dentist in Melbourne', icon:'fas fa-robot'},
          {title:'Education Review Australia Community', icon:'fas fa-robot'}
        ],
        mini: true,
        right: true,
      }
    },
    created:function () 
    { 
      this.profileName = this.$cookie.get('user_name');
      this.profileUrl = this.$cookie.get('url_img_profile'); 
      let fbPgId = this.$store.state.currentFbPgId;
      console.log("fbPgId from store..."+fbPgId);
      this.$set(this,'fbPgId',fbPgId);
      this.getImageUrl(fbPgId);
     
      window.addEventListener('load', () => {
        console.log(this.$el.clientHeight)
        this.drawerSize = 500; 
      })   
    },
   
    methods:
      {
        getImageUrl(fbPgId){
        console.log("fbPgId..."+fbPgId);
        let url = 'https://localhost/api/facebookPage';
        let leToken = this.$cookie.get('request_adboyBots_token');

        axios({
        method:'get',
        url:url,
        params: {
            fbPgId: fbPgId
        },
        headers: {'Authorization': `bearer ${leToken}`}
        })
        .then(page => {
            console.log("facebook page-->"+JSON.stringify(page.data.url_img_page));
            //alert("Just about to populate categories");
            this.$set(this,"fbPgImgUrl",page.data.url_img_page);
            this.$set(this,"fbPgName",page.data.name_page);
           
        }).catch(function (error) {
            console.log(error);
        });
      },
        
          deleteCookie()
          {
              let lecookie ="";
              this.$store.dispatch('getAdboyBotsToken',lecookie);
              this.$cookie.delete('request_adboyBots_token');
              this.$cookie.delete('user_name');
              this.$cookie.delete('url_img_profile');    
          }
        }
  }
</script>