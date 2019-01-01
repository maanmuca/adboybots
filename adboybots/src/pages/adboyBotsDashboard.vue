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
                        <v-icon small>fab fa-facebook-messenger</v-icon>
                    </v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">Facebook Messenger</v-toolbar-title>
                </v-toolbar>
                <v-layout row wrap>
                    <v-flex  xs6 >
                        <v-card light color="white" style= "height:450px; overflow-y: scroll; " class="pa-3"  >
                            <v-hover>       
                                <v-card color="white" light slot-scope="{ hover }" :class="`elevation-${hover ? 3 : 6}`" >
                                    <v-card-actions class="pa-2">
                                    <v-icon class="pl-4 pr-2" color="#007bff">fab fa-facebook</v-icon>    Facebook page
                                    
                                    </v-card-actions>
                                     <v-divider light></v-divider>
                                    <v-layout>
                                        <v-flex xs2 class="pt-4 text-xs-right">
                                        <img src="@/assets/adboy-logo.png" class="mt-2" alt="avatar" width="48" height="48">
                                        </v-flex>
                                        <v-flex xs8 class="pt-3 text-xs-center">
                                        <v-card-title primary-title>
                                            <div>
                                            <div class="title">Education Review Australia Community</div>
                                            </div>
                                        </v-card-title>
                                        </v-flex>
                                        <v-flex xs2>
                                        <v-card-title primary-title>
                                            <div>
                                            <div>State:</div>
                                            <div><v-icon color="green">fas fa-robot</v-icon></div>
                                            <div>Active</div>
                                            </div>
                                        </v-card-title>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider light></v-divider>
                                    
                                </v-card>
                            </v-hover>
                        </v-card>
                    </v-flex>
                     <v-flex  xs6 >
                        <v-card light color="white" style= "height:450px; " class="pa-3"  >
                                  
                                <v-card color="white" light >
                                    <v-card-actions class="pa-2">
                                    <v-icon class="pl-4 pr-2" color="#007bff">fas fa-robot</v-icon>    Chatbot:
                                    
                                    </v-card-actions>
                                     <v-divider light></v-divider>
                                    
                                        <v-layout>
                                          <v-flex xs6>
                                              <v-card color="white" height="200" class="ml-2 pl-5 pr-5 pb-5 pt-3">
                                                  <img src="@/assets/adboy-logo.png" class="mt-2" alt="avatar" width="72" height="72">
                                                   <div class="subheading">Education Review Australia Community</div>
                                              </v-card>
                                          </v-flex>
                                          <v-flex xs6>
                                              <v-card color="#007bff" dark height="200" class="mr-2 pa-4">
                                                  <div class="subheading">Reachable Users:</div>
                                                  <div class="display-1 pt-1">785</div>
                                                  <div class="subheading">Active users this week:</div>
                                                  <div class="display-1 pt-1">235</div>
                                              </v-card>
                                          </v-flex>
                                        </v-layout>
                                        <v-layout>
                                          <v-flex xs12>
                                              <v-card color="white" height="150" class="mr-2 ml-2 pa-1">
                                                  <div class="subheading">State:</div>
                                                  <div class="headline" style="color:green;">Active</div>
                                                  <v-layout>
                                                      <v-flex xs4>
                                                          <router-link style="text-decoration:none;" to="/profilebot"><v-btn color="info">Edit</v-btn></router-link>
                                                      </v-flex>
                                                      <v-flex xs4>
                                                          <v-btn color="warning">Stop</v-btn>
                                                      </v-flex>
                                                      <v-flex xs4>
                                                          <v-btn color="error">Delete</v-btn>
                                                      </v-flex>
                                                  </v-layout>
                                              </v-card>
                                          </v-flex>
                                        </v-layout>
                                   
                                    <v-divider light></v-divider>
                                    
                                </v-card>
                            
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container> 
        </v-content>
        </v-app>
</template>
<script>
 export default {
 name:'adboyBotsDashboard',
 data: () => ({
     chatbots:[
          {title:'Dentist in Melbourne', icon:'fas fa-robot'},
          {title:'Education Review Australia Community', icon:'fas fa-robot'}
        ],
 })
 
}
</script>