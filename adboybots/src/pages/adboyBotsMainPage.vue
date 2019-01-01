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
                <v-btn flat>Hi </v-btn>
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
        <v-content>
            <v-container fixed grid-list-md text-xs-center> 
                 <v-toolbar dark color="primary">
                    <v-toolbar-side-icon>
                        <v-icon small>fas fa-comments</v-icon>
                    </v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">Platforms</v-toolbar-title>
                </v-toolbar>
                <v-layout row wrap class="text-xs-center">
                    <v-flex  xs12 >
                        <v-card light color="white" style= "height:450px;" class="pa-3"  >
                            <p class="display-1">Choose a platform</p>
                            <p>Select a platform to create a new chatbot</p>
                            <p  >
                              <template v-for="(button,indexButton) in buttons">
                                <router-link  style="text-decoration:none;"  :key="'index-route-link-'+indexButton" :to="button.route">
                                <span    :key="'index-button-'+indexButton" class="display-4 pl-5 pr-5" ><v-icon   color="#007bff" style="font-size:64px; "  >{{button.icon}}</v-icon></span>
                                </router-link>
                              </template> 
                            </p>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
 
 import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'

 export default {
 components:{adboyBotsUsersHeader},
 data: () => ({
     styleButtons:'padding-left:10px; padding-right:10px; text-decoration:none; ',
     buttons:[
         {icon:'fab fa-facebook-messenger',route:'/mydashboardFacebook'},
         {icon:'fab fa-whatsapp',route:'/mydashboardFacebook'},
         {icon:'fab fa-skype',route:'/mydashboardFacebook'},
     ]
    }),
    mounted:function()
    {
        console.log("On mounted");
         axios.get('/user?ID=12345')
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
 }
 </script>
 <style>
  .index-route-link-0{
      text-decoration: none;
  }
 </style>
 
    

