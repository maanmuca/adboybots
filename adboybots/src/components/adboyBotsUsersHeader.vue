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
            <v-icon  style="color:green;">fas fa-robot</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Dentist in Melbourne</v-list-tile-title>
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
        v-for="item in items"
        :key="item.title"
        class="pt-2 pb-2"
      >
     
     
        <v-list-tile-action>
          <v-icon   color="#007bff">{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title  color="#007bff">{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
     
      </v-list-tile>
    </v-list>
    
  </v-navigation-drawer >
  <v-toolbar  flat color="white" app >
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
      <v-toolbar-items>
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
<script>
  export default {
    data () {
      return {
        drawerSize:null,
       
        drawer: true,
        items: [
          { title: 'Dashboard', icon: 'fas fa-home' },
          { title: 'Profile', icon: 'fas fa-pen' },
          { title: 'Ai FAQ', icon: 'fas fa-brain' },
          { title: 'Analytics', icon: 'fas fa-chart-area' },
          { title: 'People', icon: 'fas fa-users' },
          { title: 'Scripts', icon: 'far fa-file-alt' },
          { title: 'Broadcast', icon: 'fas fa-broadcast-tower' },
          { title: 'Settings', icon: 'fas fa-cog' }
        ],
        chatbots:[
          {title:'Dentist in Melbourne', icon:'fas fa-robot'},
          {title:'Education Review Australia Community', icon:'fas fa-robot'}
        ],
        mini: true,
        right: true,
      }
    },
    created () 
    { // would work in 'ready', 'attached', etc.
      window.addEventListener('load', () => {
        console.log(this.$el.clientHeight)
        this.drawerSize = 500; 
      })
    }
  }
</script>