<template>
  <div>
   <div v-show="rating">
     <v-btn
            class="my-n4"
            fab
            dark
            x-small
            depressed
            absolute
            color="yellow darken-2"
            
            >
            <v-icon dark>
                mdi-star
            </v-icon>
            </v-btn>
      </div>   
    <div> 
          <v-hover>
              <template v-slot:default="{ hover }">
                    <v-card
                class="ma-2"
                :elevation="hover ? 2 : 0"
                max-width="270"
                min-width="220"
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
            <span>
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }"> 
                  <v-tooltip bottom>
                   <template v-slot:activator="{ on: tooltip }">   
                    <v-btn small class= "pa-4" icon  v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                        <v-icon small>mdi-palette</v-icon>
                    </v-btn>
                   </template>
                  <span class="caption">Color</span>
                  </v-tooltip>   
                </template> 
                 <v-color-picker
                    disabled
                    hide-canvas
                    hide-inputs
                    hide-mode-switch
                    width="200"
                    elevation="12"
                    show-swatches
                    swatches-max-height="100"
                    v-model="due"
                    @update:color="updateColor(id, due)"
                    ></v-color-picker>   
                </v-menu> 
            </span>
            <span class="star">
              <v-tooltip bottom max-width="100">
               <template v-slot:activator="{ on, attrs }">   
                 <v-btn small class="pa-4" @click="starred(id)" icon v-bind="attrs" v-on="on">
                    <v-icon small>mdi-star</v-icon>
                </v-btn>
               </template>
               <span class="caption" v-if="!rating">Star</span>
               <span class="caption" v-if="rating">Unstar</span> 
              </v-tooltip>  
            </span>
            <span class="times">{{timeStamp}}</span>
        </v-card-actions>
      </v-card> 
     </template>
    </v-hover>       
  </div>
 </div> 
</template>

<script>
import db from '../../firebase/init.js'
export default {
    props: ['title', 'note', 'id', 'color', 'starr', 'uid', 'timeStamp'],
    data(){
       return {
           due: '',
           colorName: this.color,
           rating: this.starr,
           userId: this.uid
       }
    },
    methods: {
       deleteCard(di){
           this.$emit('deleteC', di)
       },
       openModal(){
           this.$emit('editor')
       },
       updateColor(ident, col){
           this.$emit('updateCol', ident, col)
           db.collection(this.userId).doc(ident).get().then(doc => {
           this.colorName = doc.data().color
        })
       },
       starred(dir){
          this.$emit('toggler', dir)
          db.collection(this.userId).doc(dir).get().then(doc => {
              this.rating = doc.data().starred
          })
         
       } 
    }
    
}
</script>

<style scoped>
   .note-card{
      border: 2px solid black;
      max-height: fit-content;
      max-width: fit-content;
  }
  a{
      text-decoration: none;
  }
  .times{
      color: grey;
      font-size: 0.56rem;
      padding: 2px;
      position: relative;
      left: 12px;
  }
  
</style>