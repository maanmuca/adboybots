<template>
    <div>  
        <v-toolbar   flat color="white" >
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
        <v-container grid-list-md text-xs-center>
            <v-layout  row wrap>
               
            <v-flex justify-space-around xs12 lg12 md12>        
                <span class="group" >
                    <v-tabs
                    color="#007bff"
                    dark
                    slider-color="white"
                    >
                    <v-tab :key="1" ripple><v-tooltip bottom><v-icon class="fab fa-facebook-f"  slot="activator"></v-icon><span>Tooltip</span></v-tooltip></v-tab>
                    <v-tab-item :key="1">
                    <v-layout  row wrap>
                        <v-flex xs6 elevation-0   height="440px">
                        <v-card color="white"  height="440px" elevation-2 style="overflow-y: scroll; " >
                                    
                                    <v-list two-line color="white">
                                         <v-list-tile  avatar ripple>
                                            <v-list-tile-content>
                                                <v-list-tile-title><strong style="color:#007bff;"><v-icon class="pr-5" style="color:#007bff;" >fab fa-facebook</v-icon>Facebook Pages</strong></v-list-tile-title>
                                            </v-list-tile-content>
                                          </v-list-tile>
                                        <v-divider></v-divider>
                                   
                                        
                                        <v-list-tile key="index" avatar ripple>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Dentist in Melbourne</v-list-tile-title> 
                                                <v-list-tile-sub-title>Best dentist in Melbourne ever!</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-badge left color="red">
                                                    <span slot="badge">!</span>
                                                <v-icon color="grey lighten-1">star_border</v-icon>
                                                </v-badge>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile key="index" avatar ripple>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Dentist in Melbourne</v-list-tile-title> 
                                                <v-list-tile-sub-title>Best dentist in Melbourne ever!</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-badge left color="green">
                                                    <span slot="badge">&#10004;</span>
                                                <v-icon color="grey lighten-1">star_border</v-icon>
                                                </v-badge>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                   
                                     </v-list>
                               
                        </v-card>
                        
                        </v-flex>
                        <v-flex xs6 elevation-0  height="440px">
                        <v-card  color="white" light  height="440px" elevation-2  >
                            <v-container fluid grid-list-lg>
                                <v-layout row wrap>
                                <v-flex xs12 class="text-xs-center" >
                                    <p class="subheading pt-1"><strong>Connected to Dentist in Melbourne Page</strong></p>
                                </v-flex>
                                <v-flex xs12 class="text-xs-center" >
                                    <div class="text-xs-center">
                                    <v-img
                                    :src="`https://picsum.photos/500/300?image=14`"
                                    :lazy-src="`https://picsum.photos/10/6?image=14`"
                                    
                                    aspect-ratio="1"
                                    height="100px"
                                    class="grey lighten-2"
                                    >
                                    
                                    </v-img>
                                    </div>
                                </v-flex>
                               <v-flex xs12 class="text-xs-center" >
                                   <p class="title">State: <span style="color:green;">Active</span></p>
                                </v-flex>
                                <v-flex xs6 class="text-xs-center" >
                                       <p class="title">Rechable Users:</p>
                                       <p class="display-1">545</p>
                                </v-flex>
                                 <v-flex xs6 class="text-xs-center" >
                                       <p class="title">Active users this week:</p>
                                       <p class="display-1">234</p>
                                </v-flex>
                                <v-flex xs12 class="text-xs-center" >
                                       <v-btn color="info">Edit</v-btn>
                                       <v-btn color="warning">Stop</v-btn>
                                       <v-btn color="error">Delete</v-btn>
                                </v-flex>
                                
                                </v-layout>
                            </v-container>
                        </v-card>
                        </v-flex>
                    </v-layout>
                    </v-tab-item>
                    <v-tab :key="2" disabled ripple><v-tooltip bottom><v-icon class="fab fa-skype" slot="activator" ></v-icon><span>Tooltip</span></v-tooltip></v-tab>
                    <v-tab-item :key="2">
                        <v-card flat>
                        <v-card-text>GOD</v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab :key="3" disabled ripple><v-icon class="fab fa-whatsapp"></v-icon></v-tab>
                    <v-tab-item :key="3">
                        <v-card flat>
                        <v-card-text>GOD</v-card-text>
                        </v-card>
                    </v-tab-item>
                    </v-tabs>
                </span>
            </v-flex>
           
            </v-layout>
        </v-container>    
    </div>
</template>
<script>
import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'
 export default {
 name:'adboyBotsDashboard',
 components:{adboyBotsUsersHeader},
 data: () => ({
     items: [
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
      ]
 })
 
}
</script>