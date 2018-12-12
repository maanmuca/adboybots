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
                <v-layout class="pa-2">
                    <v-flex xs4 >
                        <v-checkbox
                        label="Monday"
                        light
                        color="#007bff"
                        checkbox
                        ></v-checkbox>
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
                <v-layout class="pa-2">
                    <v-flex xs4 >
                        <v-checkbox
                        label="Monday"
                        light
                        color="#007bff"
                        checkbox
                        ></v-checkbox>
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
                <v-layout class="pa-2">
                    <v-flex xs4 >
                        <v-checkbox
                        label="Monday"
                        light
                        color="#007bff"
                        checkbox
                        ></v-checkbox>
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
                <v-layout class="pa-2">
                    <v-flex xs4 >
                        <v-checkbox
                        label="Monday"
                        light
                        color="#007bff"
                        checkbox
                        ></v-checkbox>
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
                <v-layout class="pa-2">
                    <v-flex xs4 >
                        <v-checkbox
                        label="Monday"
                        light
                        color="#007bff"
                        checkbox
                        ></v-checkbox>
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
                <v-layout class="pa-2">
                    <v-flex xs4 >
                        <v-checkbox
                        label="Monday"
                        light
                        color="#007bff"
                        checkbox
                        ></v-checkbox>
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
                <v-layout class="pa-2">
                    <v-flex xs4 >
                        <v-checkbox
                        label="Monday"
                        light
                        color="#007bff"
                        checkbox
                        ></v-checkbox>
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
 import openingHours from '@/components/openingHours'

 export default {
 components:{adboyBotsUsersHeader,openingHours},
 data: () => ({
     
     dialog:false,
      openingDays:[
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
      ],
      time: null,
      menu2: false,
      modal2: false,

      
 }),
 methods: {
          saveProfile(){

          },
          closeDialog(){
              alert("closing dialog");
          },
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
