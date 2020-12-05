<template>
    <div>
      <star-bar></star-bar> 
        <div class="container">
           <ul class="index">
          <li v-for="starredItem in starredItems" :key="starredItem.title" class="user-note">
              <v-card
                class="ma-1"
                max-width="250"
                min-width="220"
                :color="starredItem.color"
                outlined
            >
                <v-list-item two-line> 
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-1 font-weight-medium mb-1 text-center">
                        {{starredItem.title}}
                        </v-list-item-title>
                        <v-card-text class="font-weight-bold" v-linkified>{{starredItem.note}}</v-card-text>
                    </v-list-item-content>
                </v-list-item>
                <v-card-actions class="mt-n6">
            <div class="card-help">
                    <span>
                    <router-link :to="{name: 'Archive', params: {note_id: starredItem.title}}">
                        <v-tooltip bottom max-width="96">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small class= "pa-4" icon  v-bind="attrs" v-on="on">
                                <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span class="caption">Edit Note</span>
                        </v-tooltip>   
                    </router-link>
                </span>
                <span class="times">{{starredItem.timestamp}}</span>
            </div>
            
        </v-card-actions>
         </v-card>
          </li>
      </ul> 
        </div>   
      <div v-if="noStarredNotes" class="container star">
       <div class="placeholder-image">
         <v-icon size="200" disabled light>mdi-star-outline</v-icon>
         <p> Starred Notes appear here</p>
       </div>
     </div>
    </div>
</template>

<script>
import db from '../../firebase/init'
import moment from 'moment'
import StarBar from '../layouts/StarBar.vue'
export default {
    components: {
      StarBar
    },
   
    data(){
        return {
            usaId: '',
            starredItems: [],
            noStarredNotes: true
        }
    },
    watch:{
        starredItems(){
          if(this.starredItems.length > 0){
              this.noStarredNotes = false
          }else{
              this.noStarredNotes = true
          }
        }
    },
    mounted(){
      const ref = db.collection(this.usaId)
      ref.get().then(snapshot => {
         snapshot.forEach(doc => {
             if(doc.data().starred){
                 this.starredItems.push({
                     title: doc.data().title,
                     note: doc.data().note,
                     color: doc.data().color,
                     id: doc.id,
                     timestamp: moment(doc.data().timestamp).calendar()
                 })
             }
         })
      })
    },
    created(){
        this.usaId = this.$route.params.user_id
    }
}
</script>

<style scoped>
   li{
      list-style: none;
  }
  a{
      text-decoration: none;
  }
  .index{
      display: grid;
    grid-template-columns: repeat(auto-fill,24%);
    grid-gap: 8px;
    margin-top: 12px;
  }
  .star{
      display:flex;
      justify-content: center;
      align-items: center;
  }
  @media(max-width: 1200px){
     .index{
        display: grid;
        grid-template-columns: repeat(auto-fit,48%);
     }
     .user-note{
         margin:auto;
     }
 } 
  .times{
      color: grey;
      font-size: 0.58rem;
      padding: 2px;
  }
  .card-help{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
  }
  @media(max-width:600px){
      .index{
         width: 70vw;
         display: grid;
         grid-template-columns: 1fr;
         margin:0;
         padding: 0;
         margin: auto;
     }
  }
</style>