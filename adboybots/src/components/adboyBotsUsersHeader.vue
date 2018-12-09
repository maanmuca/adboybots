<template>
    <v-toolbar   flat color="white" >
      <v-avatar
            tile="tile"
            :size="48"
            color="grey lighten-4"
          >
            <img src="@/assets/adboy-logo.png" alt="avatar">
          </v-avatar>
      <v-toolbar-title style="color:#007bff; font-weight: 500;">Adboy Bots</v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" >
        <v-btn style="color:#007bff; font-weight: 500;" flat>About us</v-btn>
        <v-btn style="color:#007bff; font-weight: 500;" flat>Privacy policy</v-btn>
        <v-btn style="color:#007bff; font-weight: 500;" flat>Terms of use</v-btn>
      </v-toolbar-items>
    </v-toolbar> 
</template>