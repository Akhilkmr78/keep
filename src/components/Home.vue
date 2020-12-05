<template>
  <div>
     <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="d-flex d-sm-none"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="profilePic"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-capitalize">{{userName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item link @click="takeToStar">
          <v-list-item-icon>
            <v-icon color="yellow darken-4">mdi-star-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="yellow--text text--darken-4">Starred</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logOut">
          <v-list-item-icon>
            <v-icon color="yellow darken-4">mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="yellow--text text--darken-4">Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> 
     <nav-bar @searcher="searchNote" @normalizer="normalized" @refresh="reload" @opener="navOpener" :uid="userId" :name="userName" :profilePicture="profilePic" :email="userMail"></nav-bar>
     <div>
        <div class="userin"  v-if="!isSearched">
        <form class="inputfrm" @submit.prevent="addNote">
           <div class="container outliner">
                <div class="text-field" v-if="isClicked">
                  <input type="text" name="title" id="title" autofocus placeholder= "Title" v-model="title">
                </div>
                <div @click.stop="showArea">
                    <textarea type="text" id="area"  rows="1" placeholder="Start adding your note here ..." v-model = "note" class="mr-2"></textarea>
                </div>
                <div>
                   <span><v-tooltip bottom max-width="96">
                           <template v-slot:activator="{ on, attrs }">
                               <v-btn small icon @click="closeArea" v-bind="attrs" v-on="on">
                                   <v-icon small>mdi-cancel</v-icon>
                               </v-btn>
                           </template>
                           <span>Clear</span>
                         </v-tooltip>     
                    </span>
                    <span class="caption pink--text mx-8">{{feedback}}</span>
                   <span><v-btn class="float-right mt-1" height="26" color="transparent"><button type="submit" value="Submit">Save</button></v-btn></span> 
                </div>
           </div>
        </form>
    </div>
    <v-container>
      </v-container>
     <div v-if="isSearched" class="container index">
        <ul v-for="(item, ind) in filteredNote" :key="ind" class="pl-n2">
          <search :title="item.title" :note="item.note" :id="item.noteId" :color="item.backColor" :starr="item.starred" :uid="userId" @deleteC="removeCard" @editor="showAlert" @updateCol="colorUpdate" @toggler="starNote" class="mt-2"></search>  
        </ul> 
     </div>
     <div v-if="noteIsNotAdded" class="container bulb">
       <div class="placeholder-image">
         <v-icon size="200" disabled light>mdi-lightbulb-outline</v-icon>
         <p>Notes added appear here</p>
       </div>
     </div>
     <transition-group tag="div" name="note-card" class="container index"  @click="closeArea" v-if="!isSearched" mode="out-in">
        <ul v-for="item in items" :key="item.title" class="pl-n2 user-note" ref="userNote">   
            <note-card :title="item.title" :note="item.note" :id="item.noteId" :color="item.backColor" :starr="item.starred" :uid="userId" :timeStamp="item.timestamp" @deleteC="removeCard" @editor="showAlert" @updateCol="colorUpdate" @toggler="starNote" class="mt-2 notewaa"></note-card>
        </ul>   
     </transition-group>
         
     </div>
  </div>
</template>

<script>
import NavBar from './layouts/NavBar.vue'
import NoteCard from './userinput/NoteCard.vue'
import Search from '../components/searched/Search.vue'
import db from '../firebase/init.js'
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';

export default {
    components: {
    NavBar,
    NoteCard,
    Search
  },
  inject: {
      theme: {
        default: { isDark: true },
      },
    },
    data(){
        return{
            isClicked: false,
            items: [],
            note: '',
            title: '',
            backColor: null,
            starred: false,
            isSearched: false,
            searchTerm: '',
            userId: '',
            userName: '',
            userMail: '',
            profilePic: null,
            drawer: false,
            noteIsNotAdded: true,
            feedback: ''        
        }
    },
    methods: {
        showArea(){
            this.isClicked = true
            this.feedback = ''
        },
        closeArea(){
            this.isClicked = false
            this.title = null
            this.note = null
        },
        
        addNote(){
          if(this.title && this.note){
               db.collection(this.userId).add({
                title: this.title.toUpperCase(),
                note: this.note,
                color: this.backColor,
                starred: this.starred,
                usid: this.userId,
                timestamp: Date.now()
            }).then(() => {
                console.log('added to db')
            }).catch(err => {
                console.log(err.message)
            })
          }else{
            this.feedback = 'Please fill both fields'
          }
            this.note = null
            this.title = null
            this.isClicked = false
            this.starred = false
        },
        removeCard(payload){
            db.collection(this.userId).doc(payload).delete().then(() => {
                this.items = this.items.filter(item => {
                    return item.noteId != payload
                })
            })
        },
        showAlert(){
            this.$router.push('/archive')
        },
        colorUpdate(di,loc){
            db.collection(this.userId).doc(di).update({
                color: loc
            })
        },
        starNote(pyld){
            this.starred = !this.starred 
            db.collection(this.userId).doc(pyld).update({
               starred: this.starred 
            })
        },
        searchNote(sterm){
            if(sterm.length > 0){
                this.isSearched = true
                this.searchTerm = sterm
                
            }else{
                this.isSearched = false
            }
        },
        normalized(){
            this.isSearched = false
        },
        reload(){
         console.log(this.$refs.userNote)
        },
        navOpener(){
            this.drawer = !this.drawer
        },
        takeToStar(){
        this.$router.push({name: 'Starred', params: {user_id: this.userId}})
      },
        logOut(){
          firebase.auth().signOut().then(() => {
           this.$router.push('/')
        })
        }
    },
    computed: {
      filteredNote(){
          return this.items.filter(itm => {
              return itm.title.match(this.searchTerm.toUpperCase())
          })
      }
    },
    watch:{
     items(){
       if(this.items.length > 0){
         this.noteIsNotAdded = false
       }else{
         this.noteIsNotAdded = true
       }
     }
    },
    created(){
        
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            console.log('Huraaaah')
        })
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.userId = user.uid
                this.userName = user.displayName
                this.profilePic = user.photoURL
                this.userMail = user.email
            }
        })
    },
    beforeMount(){
        
        firebase.auth().onAuthStateChanged(user => {
            if(user){
               const ref = db.collection(user.uid).orderBy('timestamp')
               ref.onSnapshot(snapshot => {
               snapshot.docChanges().forEach(change => {
                 if(change.type == "added"){
                    this.items.unshift({
                        title: change.doc.data().title,
                        note: change.doc.data().note,
                        backColor: change.doc.data().color,
                        starred: change.doc.data().starred,
                        noteId: change.doc.id,
                        timestamp: moment(change.doc.data().timestamp).calendar()
                    })
                }
            })
        })
            }
        })
    }
    
}
</script>

<style scoped>
  
  .userin{
      margin-top: 2%;
  }
  .userin .inputfrm{
      position: relative;
      left: auto;
      bottom: 10%;
  }
  .outliner{
      height: auto;
      width: 42vw;
      border: 2px solid grey;
      border-radius: 6px;
      padding: 8px;
  }
  #title{
      width: 40vw;
      outline: none;
      text-indent: 12px;
  }
  #area{
      padding: 4px;
      width: 40vw;
      outline: none;
       text-indent: 8px;
  }
  button{
      outline: aqua;
  }
  .bulb{
    display:flex;
    justify-content: center;
  }

  @media(max-width: 750px){
      .outliner{
          width: 54vw;
          padding-right: 8px;
      }
      #title{
          width: 52vw;
      }
      #area{
          width: 52vw;
      }
  }
 
  .index{
      display: grid;
    grid-template-columns: repeat(auto-fit,24%);
    grid-gap: 4px;
    margin-top: 2px;
  }

 
 @media(max-width: 1200px){
     .index{
        display: grid;
        grid-template-columns: repeat(auto-fit,49%); 
     }
     .user-note{
       margin:auto;
     }
     .outliner{
          width: 75%;
          padding-right: 8px;
         
      }
      #title{
          width: 98%;
      }
      #area{
          width: 98%;
      }
     
 }

 @media(max-width: 600px){
     .index{
         width: 70vw;
         display: grid;
         grid-template-columns: 1fr;
         margin:0;
         padding: 0;
         margin: auto;
     }
     
     .user-note{
         width: 70vw;
         padding: 0;
         margin:auto;
     }
     .notewaa{
         margin: 0;
         padding: 0;
     }
     .outliner{
          width: 82vw;
          padding-right: 8px;
         
      }
      #title{
          width: 76vw;
      }
      #area{
          width: 76vw;
      }
 }

 .note-card-enter-from{
    opacity: 0;
    transform: translateY(25px);
  }
  .note-card-enter-active{
    transition: all 0.2s ease-in;
  }
  .note-card-enter-to{
    opacity: 1;
    transform: translateY(0)
  }
  .note-card-leave-from{
    opacity: 1;
    transform: translateY(0);
  }
  .note-card-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}

.note-card-leave-active {
  transition: all 0.2s ease-out;
  position: absolute;
}

.note-card-move{
  transition: transform 0.2s ease-in;
}
  

</style>