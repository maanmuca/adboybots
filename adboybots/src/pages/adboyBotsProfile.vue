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
                                <v-layout class="pa-2">
                                <v-flex xs4 >
                                    <v-select
                                    v-model="select"
                                    :items="openingDays"
                                    :rules="[v => !!v || 'Item is required']"
                                    label="Opening Days"
                                    required
                                    ></v-select>
                                </v-flex>
                                    
                                <v-flex xs4 >
                                    <v-dialog
                                        ref="dialog"
                                        v-model="modal2"
                                        :return-value.sync="time"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                        slot="activator"
                                        v-model="time"
                                        label="Opening"
                                        prepend-icon="access_time"
                                        readonly
                                        ></v-text-field>
                                        <v-time-picker
                                        v-if="modal2"
                                        v-model="time"
                                        full-width
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex xs4>
                                    <v-dialog
                                        ref="dialog"
                                        v-model="modal2"
                                        :return-value.sync="time"
                                        persistent
                                        lazy
                                        full-width
                                        width="290px"
                                    >
                                        <v-text-field
                                        slot="activator"
                                        v-model="time"
                                        label="Closing"
                                        prepend-icon="access_time"
                                        readonly
                                        ></v-text-field>
                                        <v-time-picker
                                        v-if="modal2"
                                        v-model="time"
                                        full-width
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-flex>
                                </v-layout>
                            </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-flex>
                    <v-flex  xs12 class="ma-2">
                     <v-btn
                        :disabled="!valid"
                        @click="submit"
                        class="info"
                     >
                        submit
                     </v-btn>
                     <v-btn @click="clear" class="info">Define attributes</v-btn>
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
