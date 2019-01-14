<template>
        <v-app>
        <adboyBotsUsersHeader></adboyBotsUsersHeader>
        <v-content>
            <!-- <v-dialog
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
            </v-dialog> -->
            
            <v-container fixed grid-list-md class="text-xs-center">
                <v-toolbar dark color="primary">
                    <v-toolbar-side-icon>
                        <v-icon small>fas fa-users</v-icon>
                    </v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">Facebook Users</v-toolbar-title>
                    <v-spacer></v-spacer>
                     <v-toolbar-items class="hidden-sm-and-down">
                        <v-btn flat>
                            Create Audience
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-layout row wrap>
                    <v-flex  xs12 class="text-xs-left pa-2" >
                      <v-card light color="white">
                        <template v-for="(myFBAudience, indexMyFbAudience) in  myFBAudiences">
                            <span :key="'fb-audience-tab'+indexMyFbAudience">
                                <v-btn
                                
                                color="primary"
                                >
                                All users
                                </v-btn>
                            </span>
                        </template>
                      </v-card>
                    </v-flex>
                    <v-flex  class="text-xs-center">
                       <v-card lighxs12t color="white" class="pa-5">
                           <p>   
                                <span class="title">Attributes audience: Audience 1</span>
                            </p> 
                            <v-container>
                                <v-layout>
                                   
                                    <v-flex  xs2 class="pt-5">   
                                        <span>Attibute:</span>
                                    </v-flex>
                                     <v-flex  xs2>   
                                         <span><v-select
                                            :items="attributeList"
                                            label="Attribute:"
                                            ></v-select>
                                         </span>
                                    </v-flex>
                                     <v-flex  xs1 class="pt-5">   
                                         <span>is:</span>
                                    </v-flex>
                                     <v-flex  xs2>   
                                        <span><v-select
                                            :items="attributeValueList"
                                            label="Attribute Value:"
                                            ></v-select></span>
                                    </v-flex>
                                     <v-flex  xs2>   
                                         <span><v-select
                                            :items="conditionValueList"
                                            label="Condition Value:"
                                            ></v-select></span>
                                    </v-flex>
                                     <v-flex  xs2 class="pt-3" >   
                                         <span>
                                            <v-btn
                                            color="primary"
                                            >
                                            ADD
                                            </v-btn>  
                                        </span>
                                    
                                    </v-flex>
                                       
                                       
                                        
                                       
                                       
                                </v-layout> 
                            </v-container>
                       </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex  xs12 >
                        <v-card light color="white" style= "height:450px; overflow-y: scroll; " class="pa-3"  >
                             <v-data-table
                                :headers="headers"
                                :items="fbUsers"
                                class="elevation-1"
                             >
                                <template
                                slot="items"
                                slot-scope="props"
                                >
                                <td class="text-xs-right">
                                     <v-avatar
                                        slot="activator"
                                        size="36px"
                                        >
                                        <img
                                            :src="props.item.FbProfilePicture"
                                            alt="Avatar"
                                        >
                                     </v-avatar>
                                </td>
                               
                                <td class="text-xs-right">
                                     {{ props.item.FbMessengerId }}
                                </td>
                                
                                <td class="text-xs-right">
                                    {{ props.item.FirstName}}
                                </td>
                                <td class="text-xs-right">
                                    {{ props.item.LastName }}
                                </td>
                                <td class="text-xs-right">
                                   <v-btn class="info"  small @click="dialogAttributeFbUsers()">User Attributes</v-btn>
                                   <v-dialog
                                        v-model="dialogAttributeFbUsersControl"
                                        max-width="350"
                                    >
                                        <v-card>
                                        <v-container>
                                        <v-layout row wrap class="text-xs-center">
                                            <v-flex>
                                                <p>User Name: {{FirstName}} {{LastName}}</p>
                                            </v-flex>
                                            <v-flex xs12>
                                            <v-btn class="info"  small @click="dialogAttributeFbUsers()">Cancel</v-btn>
                                            <v-btn class="info" v-if="nameTemplateIsvalid==true"  small @click="updateNameTemplate(indexTemplate)">Update Template</v-btn>
                                            <v-btn class="info" v-if="nameTemplateIsvalid==false" small  disabled>Update Template</v-btn>
                                            </v-flex>
                                        </v-layout>
                                        </v-container>
                                        
                                        </v-card>
                                    </v-dialog>
                                </td>
                                <td class="text-xs-right">
                                   {{ props.item.Locale }}
                                </td>
                                <td class="text-xs-right">
                                   {{ props.item.Timezone }}
                                </td>
                                <td class="text-xs-right">
                                   {{ props.item.LastInteraction }}
                                </td>
                                </template>
                             </v-data-table>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        </v-app>
</template>
<script>
 
import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'
import axios from 'axios'; 
import {store} from '../store';

 export default {
 components:{adboyBotsUsersHeader},
 data: () => ({
   fbAudienceSelected:"All Users",
   myFBAudiences:
    [
        {
            fbAudienceName:"All Users",
            fbAudienceFilters:
            [
                {
                    attributeNameFBAudience:"--",
                    attributeValueFBAudience:"--",
                    conditionFBAudience:"--"
                }
            ]

        }
    ],
   attributeList:[],
   attributeValueList:[],
   dialogAttributeFbUsersControl:false,
   myLoader:false,
   fbUsers:[],
   conditionValueList:
   [
       "AND",
       "OR",
       "--",
   ],
   headers:[
       {
        text: '',
        align: 'center',
        sortable: true,
        value:'FbProfilePicture'
    },
    {
        text: 'FB Messenger id',
        align: 'center',
        sortable: true,
        value:'FbMessengerId'
    },
    
    {
        text: 'First Name',
        align: 'center',
        sortable: true,
        value:'FirstName'
    },
    {
        text: 'Last Name',
        align: 'center',
        sortable: true,
        value:'LastName'
    },
    ,
    {
        text: 'Attributes',
        align: 'center',
        sortable: true,
        value:'Attributes'
    },
    {
        text: 'Locale',
        align: 'center',
        sortable: true,
        value:'Locale'
                
    },
    {
        text: 'Timezone',
        align: 'center',
        sortable: true,
        value:'Timezone'
    },
    {
        text: 'Last interaction',
        align: 'center',
        sortable: true,
        value:'LastInteraction'
    }
   ],
   pokemons:[
      {
      "abilities": [
      "Overgrow"
      ],
      "detailPageURL": "/us/pokedex/bulbasaur",
      "weight": 15.2,
      "weakness": [
      "Fire",
      "Flying",
      "Ice",
      "Psychic"
      ],
      "number": "001",
      "height": 28,
      "collectibles_slug": "bulbasaur",
      "featured": "true",
      "slug": "bulbasaur",
      "name": "Bulbasaur",
      "ThumbnailAltText": "Bulbasaur",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
      "id": 1,
      "type": [
      "grass",
      "poison"
      ]
      },
      {
      "abilities": [
      "Overgrow"
      ],
      "detailPageURL": "/us/pokedex/ivysaur",
      "weight": 28.7,
      "weakness": [
      "Fire",
      "Flying",
      "Ice",
      "Psychic"
      ],
      "number": "002",
      "height": 39,
      "collectibles_slug": "ivysaur",
      "featured": "true",
      "slug": "ivysaur",
      "name": "Ivysaur",
      "ThumbnailAltText": "Ivysaur",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
      "id": 2,
      "type": [
      "grass",
      "poison"
      ]
      },
      {
      "abilities": [
      "Thick Fat"
      ],
      "detailPageURL": "/us/pokedex/venusaur",
      "weight": 342.8,
      "weakness": [
      "Fire",
      "Psychic",
      "Flying",
      "Ice"
      ],
      "number": "003",
      "height": 94,
      "collectibles_slug": "venusaur",
      "featured": "true",
      "slug": "venusaur",
      "name": "Venusaur",
      "ThumbnailAltText": "Venusaur",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",
      "id": 3,
      "type": [
      "grass",
      "poison"
      ]
      },
      {
      "abilities": [
      "Overgrow"
      ],
      "detailPageURL": "/us/pokedex/venusaur",
      "weight": 220.5,
      "weakness": [
      "Fire",
      "Flying",
      "Ice",
      "Psychic"
      ],
      "number": "003",
      "height": 79,
      "collectibles_slug": "venusaur",
      "featured": "true",
      "slug": "venusaur",
      "name": "Venusaur",
      "ThumbnailAltText": "Venusaur",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png",
      "id": 3,
      "type": [
      "grass",
      "poison"
      ]
      },
      {
      "abilities": [
      "Blaze"
      ],
      "detailPageURL": "/us/pokedex/charmander",
      "weight": 18.7,
      "weakness": [
      "Ground",
      "Rock",
      "Water"
      ],
      "number": "004",
      "height": 24,
      "collectibles_slug": "charmander",
      "featured": "true",
      "slug": "charmander",
      "name": "Charmander",
      "ThumbnailAltText": "Charmander",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
      "id": 4,
      "type": [
      "fire"
      ]
      },
      {
      "abilities": [
      "Blaze"
      ],
      "detailPageURL": "/us/pokedex/charmeleon",
      "weight": 41.9,
      "weakness": [
      "Ground",
      "Rock",
      "Water"
      ],
      "number": "005",
      "height": 43,
      "collectibles_slug": "charmeleon",
      "featured": "true",
      "slug": "charmeleon",
      "name": "Charmeleon",
      "ThumbnailAltText": "Charmeleon",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
      "id": 5,
      "type": [
      "fire"
      ]
      },
      {
      "abilities": [
      "Drought"
      ],
      "detailPageURL": "/us/pokedex/charizard",
      "weight": 221.6,
      "weakness": [
      "Water",
      "Rock",
      "Electric"
      ],
      "number": "006",
      "height": 67,
      "collectibles_slug": "charizard",
      "featured": "true",
      "slug": "charizard",
      "name": "Charizard",
      "ThumbnailAltText": "Charizard",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
      "id": 6,
      "type": [
      "fire",
      "flying"
      ]
      },
      {
      "abilities": [
      "Tough Claws"
      ],
      "detailPageURL": "/us/pokedex/charizard",
      "weight": 243.6,
      "weakness": [
      "Dragon",
      "Rock",
      "Ground"
      ],
      "number": "006",
      "height": 67,
      "collectibles_slug": "charizard",
      "featured": "true",
      "slug": "charizard",
      "name": "Charizard",
      "ThumbnailAltText": "Charizard",
      "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
      "id": 6,
      "type": [
      "fire",
      "dragon"
      ]
      }
   ],
   fbPgId:null,
   leToken:null,  
 }),
 created:function(){
      let fbPgId = this.$route.params.id;
      this.$set(this,"fbPgId",fbPgId);
      store.commit('setCurrentFbPgId',this.$route.params.id);
      this.$set(this,'leToken',this.$cookie.get('request_adboyBots_token'));
      this.populateFbUsers();
  },
  mounted:function(){

  },
  methods:{
      dialogAttributeFbUsers()
      {
          if(dialogAttributeFbUsersControl)
          {
              this.$set(this,"dialogAttributeFbUsersControl",false);
          }
          if(!dialogAttributeFbUsersControl)
          {
              this.$set(this,"dialogAttributeFbUsersControl",true);
          }
      },
      populateFbUsers()
      {
          for(var i=0;i<this.pokemons.length;i++)
          {
              let myFbUserId = (6575643454535+i); 
              console.log("myFbUserId..."+myFbUserId);
              this.fbUsers.push({
                'FbMessengerId':myFbUserId,
                'FbProfilePicture':this.pokemons[i].ThumbnailImage,
                'FirstName':this.pokemons[i].name,
                'LastName':this.pokemons[i].slug,
                'Attributes':"",
                'Locale':"AU",
                'imezone':"VIC (GMT+11)",
                'LastInteraction':"Thu Nov 29 2018 19:46:56 GMT+0000 (UTC)"
              }
              );
          }
      }
  }
 } 

</script>
