<template>
   <div>
     <li>
         <v-card
                class="ma-auto"
                max-width="240"
                :color="colorName"
                outlined
            >
                <v-list-item two-line> 
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-1 font-weight-medium mb-1 text-center">
                        {{title}}
                        </v-list-item-title>
                        <v-card-text class="font-weight-bold" v-linkified>{{note}}</v-card-text>
                    </v-list-item-content>
                </v-list-item>
                <v-card-actions class="mt-n6">
          <div class="note-icon">
             <span>
                <router-link :to="{name: 'Archive', params: {note_id: title}}">
                    <v-tooltip bottom max-width="96">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn small class= "pa-4" icon @click = "openModal" v-bind="attrs" v-on="on">
                            <v-icon small>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span class="caption">Edit Note</span>
                    </v-tooltip>   
                </router-link>
            </span>
            <span>
              <v-tooltip bottom max-width="100" open-delay="200">
               <template v-slot:activator="{ on, attrs }">   
                 <v-btn small class= "pa-4" icon @click="deleteCard(id)" v-bind="attrs" v-on="on">
                    <v-icon small>mdi-delete</v-icon>
                </v-btn>
               </template>
               <span class="caption">Delete Note</span> 
              </v-tooltip>  
            </span> 
          </div>          
            
        </v-card-actions>
         </v-card>
     </li>  
   </div> 
</template>

<script>
import db from '../../firebase/init.js'
export default {
    props: ['title', 'note', 'id', 'color', 'uid'],
     data(){
       return {
           due: '',
           colorName: '',
           userId: this.uid
           
       }
    },
    methods: {
       deleteCard(di){
           this.$emit('deleteC', di)
       },
       openModal(){
           this.$emit('editor')
       }
    },
    mounted(){
        const ref1 = db.collection(this.userId).doc(this.id)
        ref1.get().then(doc => {
            this.colorName = doc.data().color
        })
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
  .star{
      position: absolute;
      left: 80%;
  }
  @media(max-width:750px){
     .searched-card{
          padding: 0;
          margin-left: 20%;
          
      } 
  }
  @media(max-width:600px){
      .searched-card{
          padding: 0;
          margin: 0;
          margin: auto;
      }
  }
</style>