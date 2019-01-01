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
                    @click="saveProfile();"
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
                                v-on:change="displayMyOpeningHours()"
                                ></v-checkbox> 
                            </v-flex>  
                            <v-flex xs4 class="pl-3" >
                                <v-select
                                    :items="myTime"
                                    label="Opening Hour"
                                    v-model="openingHour.openingTime"
                                    v-on:change="displayMyOpeningHours()"
                                ></v-select>
                            </v-flex>
                            <v-flex xs4 class="pl-3">
                                <v-select
                                    :items="myTime"
                                    label="Closing Hour"
                                    v-model="openingHour.closingTime"
                                     v-on:change="displayMyOpeningHours()"
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
                    @click="saveProfile();"
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

 export default {
 components:{adboyBotsUsersHeader,openingHours},
 data: () => ({


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
     openingHours:
     [
         {day:"Monday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
         {day:"Tuesday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
         {day:"Wednesday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
         {day:"Thursday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
         {day:"Friday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
         {day:"Saturday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true},
         {day:"Sunday",openingTime:"9:00 am",closingTime:"5:00 pm",dayOpen:true}
     ]

      
 }),
 methods: {
          openDialog(){
              alert("open dialog");
              if(!dialog)
              {
                  this.dialog =true;
              }
          }
      }
 
}
</script>
