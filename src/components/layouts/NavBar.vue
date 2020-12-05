<template>
  <div>
    <v-app-bar
      color="white"
      dense
      flat
      height="60"
      z-index = "10"
    >
      <div class="nav-bars">
        <div class="logo">
            <span><img src="../../assets/keep.png" alt="" height="40" width="40"></span>
            <span class="font-weight-bold app-title">Keep</span>  
        </div>
        <div>
          <v-text-field
          v-model="search" 
          dense
        solo hide-details
        clearable
        clear-icon="mdi-close-circle-outline" 
        label="Search" 
        @input="searchTerm(search)"
        @click:clear="normalize"
        prepend-inner-icon = "mdi-magnify" 
        class="mob-search d-flex d-sm-none"></v-text-field>
        </div>
        <div>
          <v-btn icon class="ham d-flex d-sm-none mr-n5" @click.stop="navDrawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
      </div>  

  <v-spacer></v-spacer>
    
    <v-col
          cols="12"
          xs="3"
          sm="5"
          md="5"
          lg="5"
          class="d-none d-sm-flex"
        >
          <v-text-field
        v-model="search"
        label="Search"
        dense
        solo
        prepend-inner-icon = "mdi-magnify"
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
        @input="searchTerm(search)"
        @click:clear="normalize"
        class="d-none d-sm-flex mob-search"
      ></v-text-field>
    </v-col>
    
  <v-spacer></v-spacer>
       
         <v-tooltip bottom max-width="100">
           <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="takeToStar" v-bind="attrs" v-on="on" class="d-none d-sm-flex mr-2">
             <v-badge
                color="pink"
                dot
                :value="isStarred"
              > 
              <v-icon>mdi-star-outline</v-icon>
             </v-badge>   
            </v-btn>
           </template>
               <span class="caption">Starred</span>
           </v-tooltip>
            <!-- <v-btn text color="yellow darken-3" class="text-capitalize d-none d-sm-flex">{{name}}</v-btn> -->
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
                    <img :src="profilePicture" alt="userPic">
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-avatar>
                      <img :src="profilePicture" alt="userPic">
                    </v-avatar>
                    <h5 class="mt-1 text-capitalize">{{ name }}</h5>
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
            <!-- <v-tooltip bottom max-width="100">
               <template v-slot:activator="{ on, attrs }">
                  <v-img
                  :src="profilePicture"
                  aspect-ratio="1"
                  max-height="50"
                  max-width="40"
                  contain
                  position="fill"
                  class="profile d-none d-sm-flex"
                  @click="signOut"
                  v-bind="attrs" v-on="on"
                ></v-img>
               </template>
              <span class="caption">Sign Out</span> 
            </v-tooltip>   -->
      
    </v-app-bar>
    <hr>
    
    </div>
</template>

<script>
import db from '../../firebase/init.js'
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
    props: ['uid', 'name', 'profilePicture', 'email'],
    data(){
        return {
            search: '',
            userId: this.uid,
            drawer: false,
            group: null,
            navItems: [],
            isStarred: false
        }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
    methods: {
      searchTerm(term){
            this.$emit('searcher', term)
        },
      normalize(){
           this.$emit('normalizer')
      } , 
      takeToStar(){
        this.$router.push({name: 'Starred', params: {user_id: this.uid}})
      },
      signOut(){
        firebase.auth().signOut().then(() => {
           this.$router.push('/')
        })
      },
      navDrawer(){
        this.$emit('opener')
      }
    },
    beforeUpdate(){
      const ref = db.collection(this.uid).where('starred', '==', true)
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          if(doc.data().starred){
            this.isStarred = true
          }else{
            this.isStarred = false
          }
        })
      })
    }
     
}
</script>

<style scoped>
  
  a{
    text-decoration: none;
  }
  .logo{
    width: 7vw;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }
  @media(max-width:1200px){
    .logo{
      margin-left: 34%;
    }
  }

  @media(max-width:750px){
    img{
      margin-left: 12px;
    }
    .logo{
      margin-left: 42%;
    }
  }
  .profile{
    border-radius: 50%;
    cursor: pointer;
  }
  .menu-display{
    width: 13vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  @media(max-width:600px){
  .nav-bars{
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .mob-search{
    
    width:80%;
    position: relative;
    left: 10%;
    font-size: 0.8rem;
  }
  
  .app-title{
    margin-left: 14%;
  }
  .logo{
    margin-left: 15%;
  }
  }
  
</style>