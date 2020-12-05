<template>
 <div>
   <div class="text-center" >
    <v-dialog
      v-model="dialog"
      width="474"
      persistent 
      overlay-opacity="0.4"
      :overlay-color= "backColor"
    >
      <v-card :color="backColor">
         <form @submit.prevent="updateNote">
             <div>
                <input type="text" placeholder="Title" class="text-field title" v-model="title">
             </div>
             <div>
                 <textarea autofocus placeholder="The note" rows="1" class="text-field note" v-model="note" v-linkified>
                 </textarea>
             </div>
            <div class="text-center">
              <button>
                  <v-btn
                    class="ma-2"
                    text
                    color="black"
                    height="22"
                  >
                    Done
                  </v-btn>
              </button>
             </div>
         </form>
      </v-card>
    </v-dialog>
  </div>
 </div>
</template>

<script>
import db from '../firebase/init.js'
import firebase from 'firebase/app';
import 'firebase/auth';
  export default {
    data () {
      return {
        dialog: true,
        title: '',
        note: '',
        id: '',
        backColor: '',
        crntUsrUid: ''
      }
    },
    methods: {
      updateNote(){
        if(this.title && this.note){
          db.collection(this.crntUsrUid).doc(this.id).update({
            title: this.title.toUpperCase(),
            note: this.note,
            timestamp: Date.now()
          }).then(() => {
            this.$router.push('/home')
          }).catch(err => {
            console.log(err.message)
          })
        }
      }
    },
    created(){
        this.crntUsrUid = firebase.auth().currentUser.uid
        let ref = db.collection(this.crntUsrUid).where('title', '==', this.$route.params.note_id)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                const document = doc.data()
                this.title = document.title
                this.note = document.note
                this.backColor = document.color
                this.id = doc.id
            })
        })
    },
    
  }
</script>

<style scoped>
  .text-field{
    width: 34vw;
    padding: 12px;
    position: relative;
    left: 4px;
    top: 4px;
    text-indent: 2px;
    outline: none;
  }
  @media(max-width:1200px){
    .text-field{
      width: 96%;
    }
  }
  @media(max-width:750px){
    .text-field{
      width: 96%;
    }
  }
  @media(max-width: 600px){
    .text-field{
      width: 96%;
      font-size: 0.89rem;
    }
  }
</style>


     
   