<template>
    <div>
        <v-toolbar color="white"   flat >
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-avatar
            tile="tile"
            :size="40"
            color="grey lighten-4"
            >
            <img src="@/assets/adboy-logo.png" alt="avatar">
            </v-avatar>
        <v-toolbar-title style="color:#007bff; font-weight: 500;">Adboy Bots</v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" >
        <v-btn style="color:#007bff; font-weight: 500;" flat>About us</v-btn>
        <v-btn style="color:#007bff; font-weight: 500;" flat>Privacy policy</v-btn>
        <v-btn style="color:#007bff; font-weight: 500;" flat>Terms of use</v-btn>
        </v-toolbar-items>
        </v-toolbar>
        <v-app light>
        <v-content>
        <section>
            <v-parallax style="background-image: linear-gradient(white, white);" >
            <v-layout
                column
                align-center
                justify-center
                class="white--text"
            >
                <img src="@/assets/adboy-logo.png" height="150" class="mb-5" alt="">
                <h1 class="blue--text mb-2 display-1 text-xs-center">Welcome to Adboy Bots content management system</h1>
                <div class="subheading mb-3 text-xs-center">It is nice to meet you!</div>
                    <router-link to="/mydashboard">
                    <v-btn
                    class="darken-4 lighten-2 mt-5"
                    color="#007bff"
                    dark
                    large
                    >
                    Login with Facebook
                    </v-btn>
                    </router-link>
            </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-layout
            column
            wrap
            class="my-5"
            align-center
            >
            <v-flex xs12 sm4 class="my-3">
                <div class="text-xs-center">
                <h2 class="headline">It's nice to meet you!</h2>
                <span class="subheading">
                    Cras facilisis mi vitae nunc 
                </span>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-container grid-list-xl>
                <v-layout row wrap align-center>
                    <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">fab fa-whatsapp-square</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">Whatsapp Chatbots</div>
                        </v-card-title>
                        <v-card-text>
                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                        </v-card-text>
                    </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">fab fa-facebook-square</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Facebook Chatbots</div>
                        </v-card-title>
                        <v-card-text>
                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                        </v-card-text>
                    </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">fab fa-skype</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">Skype Chatbots</div>
                        </v-card-title>
                        <v-card-text>
                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                        </v-card-text>
                    </v-card>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-flex>
            </v-layout>
        </section>

        <section>
            <v-parallax style="background-image: linear-gradient(#4da3ff,#007bff);" >
            <v-layout column align-center justify-center>
                <div class="headline white--text mb-3 text-xs-center">Social media chatbots have never been easier</div>
                <em>Kick-start your application today</em>
                <v-btn
                class="blue lighten-2 mt-5"
                dark
                large
                href="/pre-made-themes"
                >
                Get Started
                </v-btn>
            </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-container grid-list-xl>
            <v-layout row wrap justify-center class="my-5">
                <v-flex xs12 sm4>
                <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Company info</div>
                    </v-card-title>
                    <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                </v-card>
                </v-flex>
                <v-flex xs12 sm4 offset-sm1>
                <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Contact us</div>
                    </v-card-title>
                    <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    </v-card-text>
                    <v-list class="transparent">
                    <v-list-tile>
                        <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">phone</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>777-867-5309</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">place</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>7/45 Wellington St </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">email</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>tech@adboy.com</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    </v-list>
                </v-card>
                </v-flex>
            </v-layout>
            </v-container>
        </section>
        </v-content>
    </v-app>
        <v-footer
    dark
    height="auto"
  >
    <v-card
      flat
      tile
      class="lighten-1 white--text text-xs-center"
      color="#007bff"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2018 — <strong>Adboy Bots</strong>
      </v-card-text>
    </v-card>
  </v-footer>
    </div>
</template>
<script>
 export default {
 name:'AdboyBotsWelcome',
 data: () => ({
     icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
 })
}
</script>


