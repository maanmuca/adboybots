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
                    <v-flex  xs12>
                            <v-textarea
                            label="About Us"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                            hint="Hint text"
                            ></v-textarea>
                    </v-flex>
                    <v-flex  xs12>
                        <v-expansion-panel>
                            <v-expansion-panel-content>
                            <div slot="header" color="black">Opening Hours</div>
                            <v-card>
                                <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                            </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-flex>
                     <v-btn
                    :disabled="!valid"
                    @click="submit"
                    class="info"
                    >
                    submit
                    </v-btn>
                    <v-btn @click="clear" class="info">clear</v-btn>
                </v-card>
            </v-flex>
            </v-layout>
        </v-container>
        </v-content>
        </v-app>
  
</template>
<script>
import adboyBotsUsersHeader from '@/components/adboyBotsUsersHeader'
 export default {
 components:{adboyBotsUsersHeader},
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
      checkbox: false,

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
