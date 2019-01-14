<template>
    <v-app>
        <v-content style="background-color:white;">
            <v-container fixed grid-list-md  class="text-xs-center"> 
                 
              <v-progress-circular
                :rotate="-90"
                :size="250"
                :width="30"
                :value="value"
                color="primary"
                class="ma-5 pa-5 title"
                >
               {{ value }}
                </v-progress-circular>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
 


 export default {

 data: () => ({
     info:null,
     profileName:null,
     profileUrl:null,
      interval: {},
        value: 0
    }),
    beforeDestroy () {
      clearInterval(this.interval)
    },
    created:function(){
     let lecookie = this.$cookie.get('request_adboyBots_token');
     this.profileName = this.$cookie.get('user_name');
     this.profileUrl = this.$cookie.get('url_img_profile');
     this.$router.push('/mydashboardFacebook');
    },
  mounted: function () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
     
    
  },
    
 
 }
 </script>

 
    

