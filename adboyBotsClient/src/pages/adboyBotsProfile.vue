<template>
  
        <v-app>
        <adboyBotsUsersHeader></adboyBotsUsersHeader>
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
                        <v-icon small>fas fa-pen</v-icon>
                    </v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">Profile</v-toolbar-title>
            </v-toolbar>
            <v-layout row wrap>
            <v-flex  xs6 >
                <v-card light color="white" style= "height:450px;" class="pa-5" >
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="bussinesName"
                    :counter="80"
                    label="Bussiness Name"
                     v-on:change="saveDetailsChatbot(fbPgId)"
                    ></v-text-field>
                    <v-select
                    v-model="category"
                    :items="categories"
                    label="Category"
                    v-on:change="saveDetailsChatbot(fbPgId)"
                    ></v-select>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                     v-on:change="saveDetailsChatbot(fbPgId)"
                    ></v-text-field>
                    <v-text-field 
                    type="tel" 
                     v-model="contactNumber"
                      v-on:change="saveDetailsChatbot(fbPgId)"
                    label="Contact Number :">
                    </v-text-field>
                     <v-text-field 
                     v-model="address"
                      v-on:change="saveDetailsChatbot(fbPgId)"
                     :counter="320"
                    label="Adress"
                    >
                    </v-text-field>
                </v-form>
                </v-card>
            </v-flex>
            <v-flex  xs6>
                <v-card light color="white" style= "height:450px;" class="pa-5" >
                    <v-layout>
                        <v-flex  xs4>
                            <v-text-field 
                            v-model="city"  
                            v-on:change="saveDetailsChatbot(fbPgId)"
                            label="City">
                            </v-text-field>   
                        </v-flex>
                        <v-flex  xs4>
                            <v-text-field 
                            v-model="state"  
                             v-on:change="saveDetailsChatbot(fbPgId)"
                            label="state">
                            </v-text-field>  
                        </v-flex>
                        <v-flex  xs4>
                            <v-text-field 
                            v-model="postcode" 
                             v-on:change="saveDetailsChatbot(fbPgId)"
                            label="Zipcode/Postcode">
                            </v-text-field>  
                        </v-flex>
                        
                    </v-layout>
                    <v-layout class="pt-3">
                    <v-flex  xs6>
                            <v-textarea
                            v-model="aboutUs" 
                             v-on:change="saveDetailsChatbot(fbPgId)"
                            label="About Us"
                            hint="Hint text"
                            ></v-textarea>
                    </v-flex>
                    <!-- -------------------------------------Opening Hours----------------------------- -->
                    <v-flex  xs6 class="mt-5">
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
                                            @click="dialog = false"
                                            >
                                            Cancel
                                            </v-btn>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-btn
                                            color="primary"
                                            @click="dialog = false"
                                             v-on:click="saveDetailsChatbot(fbPgId)"
                                            >
                                            Save
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
                                            @click="dialog = false"
                                            >
                                            Cancel
                                            </v-btn>
                                    </v-flex>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                    </v-flex>
                     <!-- -------------------------------------Opening Hours----------------------------- -->
                    </v-layout>
                    <v-flex  xs12 class="ma-2 pt-4">
                     <v-btn  class="info" @click="$vuetify.goTo('#myAttributes')">Define attributes</v-btn>
                    </v-flex>
                </v-card>
            </v-flex>
            
            </v-layout>
            <!-- -------------------------------------Categories table----------------------------- -->
            <adboybotsAttributesTable id="myAttributes"></adboybotsAttributesTable>
            <!-- -------------------------------------Categories table----------------------------- -->
            
        </v-container >
        </v-content>
        </v-app>
  
</template>
<script>
 
 import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'
 import openingHours from '@/components/componentsProfile/openingHours.vue'
 import adboybotsAttributesTable from '@/components/componentsProfile/adboybotsAttributesTable.vue'
 import axios from 'axios'; 
 import {store} from '../store';


 export default {
 components:{adboyBotsUsersHeader,openingHours,adboybotsAttributesTable},
 data: () => ({
      myLoader:null,
      leToken:null,
      fbPgId:null,
      bussinesName:"",
      category:"",
      email: "",
      contactNumber:"",
      address:"",
      city:"",
      state:"",
      postcode:"",
      aboutUs:"",
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 80) || 'Name must be less than 80 characters'
      ],
      
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      categories: [
        'Food',
        'Sports',
        'Education',
        'Hobbie'
      ],
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
    
      let fbPgId = this.$route.params.id;
      this.$set(this,"fbPgId",fbPgId);
      store.commit('setCurrentFbPgId',this.$route.params.id);
      this.$set(this,'leToken',this.$cookie.get('request_adboyBots_token'));
      this.getProfileInfo(fbPgId);
      this.profileName = this.$cookie.get('user_name');
      this.profileUrl = this.$cookie.get('url_img_profile');    
      
    },
    methods:
    {
       
        getProfileInfo(fbPgId){
          this.$set(this,"myLoader",true);
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
           
            //console.log("chatbot...getProfileInfo"+JSON.stringify(chatbot));
             this.$set(this,"myLoader",false);
            this.$set(this,"bussinesName",chatbot.data.bussinesName);
            this.$set(this,"category",chatbot.data.category);
            this.categories.push(chatbot.data.category);
            this.$set(this,"email",chatbot.data.email);
            this.$set(this,"contactNumber",chatbot.data.contactNumber);
            this.$set(this,"address",chatbot.data.address);
            this.$set(this,"city",chatbot.data.city);
            this.$set(this,"state",chatbot.data.state);
            this.$set(this,"postcode",chatbot.data.postcode);
            this.$set(this,"aboutUs",chatbot.data.aboutUs);
            this.$set(this,"openingHours",chatbot.data.openingHours);
           
        }).catch(function (error) {
            console.log(error);
        });
      },
    
      saveDetailsChatbot(fbPgId){
             let lecookie = this.$cookie.get('request_adboyBots_token');

             console.log("Opening hours to save..."+this.openingHours);
             
             let url = 'https://localhost/api/saveDetailsChatbot';
             axios({
                method:'post',
                url:url,
                data:{ 
                        fbPgId:fbPgId,
                        bussinesName:this.bussinesName,
                        category:this.category,
                        email:this.email,
                        contactNumber:this.contactNumber,
                        address:this.address,
                        city:this.city,
                        state:this.state,
                        postcode:this.postcode,
                        aboutUs:this.aboutUs,
                        openingHours:this.openingHours
                        },
                headers: {'Authorization': `bearer ${lecookie}`}
                })
                .catch(function (error) {
                    console.log(error);
                });
      },
      updateFacebookPageState(fbPgId)
      {
             let lecookie = this.$cookie.get('request_adboyBots_token');
             
             let url = 'https://localhost/api/updateStateFacebookPage';
             axios({
                method:'post',
                url:url,
                data:{state:"inactive",fbPgId:fbPgId},
                headers: {'Authorization': `bearer ${lecookie}`}
                })
                .catch(function (error) {
                    console.log(error);
                });

      },
      openDialog()
      {
        if(!dialog)
        {
            this.dialog =true;
        }
      }
      
    },
    
 
}
</script>
