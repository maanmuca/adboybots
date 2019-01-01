<template>
  
        <v-app>
        <adboyBotsUsersHeader></adboyBotsUsersHeader>
        <v-content>
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
                    ></v-text-field>
                    <v-select
                    v-model="category"
                    :items="categories"
                    label="Category"
                    ></v-select>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    ></v-text-field>
                    <v-text-field 
                    type="tel" 
                     v-model="contactNumber"
                    label="Contact Number :">
                    </v-text-field>
                     <v-text-field 
                     v-model="address"
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
                            label="City">
                            </v-text-field>   
                        </v-flex>
                        <v-flex  xs4>
                            <v-text-field 
                            v-model="state"  
                            label="state">
                            </v-text-field>  
                        </v-flex>
                        <v-flex  xs4>
                            <v-text-field 
                            v-model="postcode" 
                            label="Zipcode/Postcode">
                            </v-text-field>  
                        </v-flex>
                        
                    </v-layout>
                    <v-layout class="pt-3">
                    <v-flex  xs6>
                            <v-textarea
                            v-model="aboutUs" 
                            label="About Us"
                            hint="Hint text"
                            ></v-textarea>
                    </v-flex>
                    
                    <v-flex  xs6 class="mt-5">
                        <openingHours></openingHours>
                    </v-flex>
                    </v-layout>
                    <v-flex  xs12 class="ma-2 pt-4">
                     <v-btn
                        :disabled="!valid"
                        class="info"
                     >
                       Save Details
                     </v-btn>
                     <v-btn  class="info" @click="$vuetify.goTo('#myAttributes')">Define attributes</v-btn>
                    </v-flex>
                </v-card>
            </v-flex>
            
            </v-layout>
           
            <adboybotsAttributesTable id="myAttributes"></adboybotsAttributesTable>
                    
        </v-container >
        </v-content>
        </v-app>
  
</template>
<script>
 
 import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'
 import openingHours from '@/components/componentsProfile/openingHours.vue'
 import adboybotsAttributesTable from '@/components/componentsProfile/adboybotsAttributesTable.vue'

 export default {
 components:{adboyBotsUsersHeader,openingHours,adboybotsAttributesTable},
 data: () => ({
      bussinesName:null,
      category:null,
      email: null,
      contactNumber:null,
      address:null,
      city:null,
      state:null,
      postcode:null,
      aboutUs:null,
      myAttributes:"myAttributes",
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
    
 })
 
}
</script>
