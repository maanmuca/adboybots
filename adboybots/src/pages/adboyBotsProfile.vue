<template>
  
        <v-app>
        <adboyBotsUsersHeader></adboyBotsUsersHeader>
        <v-content>
        <v-container fixed grid-list-md text-xs-center>
            <v-layout row wrap>
            <v-flex  xs6 >
                <v-card light color="white" style= "height:515px;" class="pa-5" >
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="80"
                    label="Bussiness Name"
                    required
                    ></v-text-field>
                    <v-select
                    v-model="select"
                    :items="categories"
                    :rules="[v => !!v || 'Item is required']"
                    label="Category"
                    required
                    ></v-select>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>
                    <v-text-field 
                    type="tel" 
                    mask="(###) ### - ####" 
                    label="Label Text">
                    </v-text-field>
                     <v-text-field 
                    label="Adress"
                    required
                    >
                    </v-text-field>
                </v-form>
                </v-card>
            </v-flex>
            <v-flex  xs6>
                <v-card light color="white" style= "height:515px;" class="pa-5" >
                    <v-layout>
                        <v-flex  xs4>
                            <v-text-field   
                            label="City">
                            </v-text-field>   
                        </v-flex>
                        <v-flex  xs4>
                            <v-text-field 
                            label="state">
                            </v-text-field>  
                        </v-flex>
                        <v-flex  xs4>
                            <v-text-field 
                            label="Zipcode/Postcode">
                            </v-text-field>  
                        </v-flex>
                        
                    </v-layout>
                    <v-layout class="pt-3">
                    <v-flex  xs6>
                            <v-textarea
                            label="About Us"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
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
                        submit
                     </v-btn>
                     <v-btn  class="info">Define attributes</v-btn>
                    </v-flex>
                </v-card>
            </v-flex>
            </v-layout>
        </v-container>
        </v-content>
        </v-app>
  
</template>
<script>
 import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'
 import openingHours from '@/components/openingHours'

 export default {
 components:{adboyBotsUsersHeader,openingHours},
 data: () => ({
     
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 80) || 'Name must be less than 80 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      categories: [
        'Food',
        'Sports',
        'Education',
        'Hobbie'
      ],
      openingDays:[
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
      ],
      checkbox: false,
      time: null,
      menu2: false,
      modal2: false,

        methods: {
        submit () {
            if (this.$refs.form.validate()) {
            // Native form submission is not yet supported
            axios.post('/api/submit', {
                name: this.name,
                email: this.email,
                select: this.select,
                checkbox: this.checkbox
            })
            }
        },
        clear () {
            this.$refs.form.reset()
        }
        }
 })
 
}
</script>
