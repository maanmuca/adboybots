<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
        <v-btn
        slot="activator"
        color="info"
        dark
      >
        Opening hours
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
        >
          <v-layout>
               <v-flex xs6 class="mt-3">
                   <p class="title">Opening Hours</p>
              </v-flex>
              <v-flex xs3>
                   <v-btn
                    color="primary"
                    @click="saveProfile(fbPgId)"
                    >
                    Save
                    </v-btn>
              </v-flex>
               <v-flex xs3>
                   <v-btn
                    color="primary"
                    @click="dialog = false"
                    >
                    Cancel
                    </v-btn>
              </v-flex>
          </v-layout>
        </v-card-title>

        <v-card>
            <v-container>
                
                    
                    <template v-for="(openingHour,indexOpeningHours) in openingHours">  
                    <v-layout class="pa-2" :key="indexOpeningHours">
                       
                            <v-flex xs4 >
                                <v-checkbox
                                v-model="openingHour.dayOpen" 
                                :label="openingHour.day"
                                light
                                color="#007bff"
                                checkbox
                                :key="indexOpeningHours"
                               
                                ></v-checkbox> 
                            </v-flex>  
                            <v-flex xs4 class="pl-3" >
                                <v-select
                                    :items="myTime"
                                    label="Opening Hour"
                                    v-model="openingHour.openingTime"
                                    
                                ></v-select>
                            </v-flex>
                            <v-flex xs4 class="pl-3">
                                <v-select
                                    :items="myTime"
                                    label="Closing Hour"
                                    v-model="openingHour.closingTime"
                                     
                                ></v-select>
                            </v-flex>
                        
                    </v-layout>
                    </template>
               
            </v-container>
        </v-card>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
           <v-flex xs6 class="mt-3">
                   <p class="title"></p>
              </v-flex>
              <v-flex xs3>
                   <v-btn
                    color="primary"
                    @click="saveProfile(fbPgId)"
                    >
                    Save
                    </v-btn>
              </v-flex>
               <v-flex xs3>
                   <v-btn
                    color="primary"
                    @click="dialog = false"
                    >
                    Cancel
                    </v-btn>
              </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
 import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'
 import openingHours from '@/components/componentsProfile/openingHours'
  import axios from 'axios';

 export default {
 components:{adboyBotsUsersHeader,openingHours},
 data: () => ({

     leToken:null,
     fbPgId:null,
     myTime:[
                '12:00 am','12:30 am',
                '1:00 am','1:30 am',
                '2:00 am','2:30 am',
                '3:00 am','3:30 am',
                '4:00 am','4:30 am',
                '5:00 am','5:30 am',
                '6:00 am','6:30 am',
                '7:00 am','7:30 am',
                '8:00 am','8:30 am',
                '9:00 am','9:30 am',
                '10:00 am','10:30 am',
                '11:00 am','11:30 am',
                '12:00 pm','12:30 pm',
                '1:00 pm','1:30 pm',
                '2:00 pm','2:30 pm',
                '3:00 pm','3:30 pm',
                '4:00 pm','4:30 pm',
                '5:00 pm','5:30 pm',
                '6:00 pm','6:30 pm',
                '7:00 pm','7:30 pm',
                '8:00 pm','8:30 pm',
                '9:00 pm','9:30 pm',
                '10:00 pm','10:30 pm',
                '11:00 pm','11:30 pm',
            ],
     dialog:false,
     openingHours:null

      
 }),
 created: function () {
     let leToken = this.$cookie.get('request_adboyBots_token');
     this.$set(this,'leToken',leToken);
     let fbPgId = this.$store.state.currentFbPgId;
     alert("this.$store.state.currentFbPgId..."+fbPgId);
     this.$set(this,'fbPgId',fbPgId);
     this.getOpeningHours(fbPgId);
 },
 methods: {
          saveProfile(fbPgId)
          {
              let url ='https://localhost/api/saveOpeningHours'; 
                axios({
                method:'post',
                url:url,
                data:{openingHours:this.openingHours,fbPgId:fbPgId},
                headers: {'Authorization': `bearer ${this.leToken}`}
                })
                .catch(function (error) {
                    console.log(error);
                });
          },
          openDialog(){
              if(!dialog)
              {
                  this.dialog =true;
              }
          },
          getOpeningHours(fbPgId){
              let url = 'https://localhost/api/getChatbot';
    
            axios({
            method:'get',
            url:url,
            params: {
                fbPgId: fbPgId
            },
            headers: {'Authorization': `bearer ${this.leToken}`}
            })
            .then(chatbot => {
                console.log("chatbot...getOpeningHours"+JSON.stringify(chatbot.data.openingHours));
                 alert("this.$store.state.currentFbPgId..."+JSON.stringify(chatbot.data.openingHours));
               this.$set(this,"openingHours",chatbot.data.openingHours);
            }).catch(function (error) {
                console.log(error);
            });
          }
      }
 
}
</script>
