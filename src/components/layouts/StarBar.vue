<template>
    <div>
      <v-app-bar
      color="white"
      dense
      flat
      height="60"
      z-index = "10"
    >
    <div class="logo" @click="linkToHome">
        <span class="logo-img"><img src="../../assets/keep.png" alt="" height="40" width="40"></span>
        <span class="font-weight-bold logo-title">Keep</span>  
    </div>
    <v-spacer></v-spacer>
      <v-menu
              bottom
              min-width="150px"
              rounded
              offset-y
              open-on-hover
              class="d-none d-sm-flex"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  v-on="on"
                  class="d-none d-sm-flex"
                >
                  <v-avatar size="40">
                    <img :src="userPic" alt="userPic">
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-avatar>
                      <img :src="userPic" alt="userPic">
                    </v-avatar>
                    <h5 class="mt-1 text-capitalize">{{ userName }}</h5>
                    <p class="caption mt-1">
                      {{ email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                      depressed
                      rounded
                      text
                      @click="signOut"
                    >
                      Sign Out
                    </v-btn>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
    <!-- <v-btn text color="yellow darken-3" class="text-capitalize">{{userName}}</v-btn>
      <v-tooltip bottom max-width="100">
        <template v-slot:activator="{ on, attrs }">
          <v-img
          :src="userPic"
          aspect-ratio="1"
          max-height="50"
          max-width="40"
          contain
          position="fill"
          class="profile"
          @click="signOut"
          v-bind="attrs" v-on="on"
        ></v-img>
        </template>
              <span class="caption">Sign Out</span> 
       </v-tooltip>    -->
      
    </v-app-bar>
    <hr>  
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
    data(){
     return {
       userName: '',
       userPic: null
     }
    },
    methods: {
         linkToHome(){
        this.$router.push('/home')
      },
       signOut(){
        firebase.auth().signOut().then(() => {
           this.$router.push('/')
        })
      } 
    },
    
    created(){
      var user = firebase.auth().currentUser;

      if (user != null) {
        user.providerData.forEach(profile => {
          this.userName = profile.displayName
          this.userPic = profile.photoURL
        }); //this will give you all the urls once there is user data
      }
    }
    
}
</script>

<style scoped>
  .logo{
    width: 7vw;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }
  .profile{
    border-radius: 50%;
  }
  @media(max-width:1200px){
    .logo{
      margin-left: 2.5%;
    }
  }
  @media(max-width:750px){
    img{
      margin-left: 12px;
     
    }
    .logo{
      margin-left: 3%;
    }
  }
  @media(max-width: 600px){
    .logo{
      margin-left: 14%;
    }
    .logo-title{
      margin-left: 2%;
    }
  }
  
</style>