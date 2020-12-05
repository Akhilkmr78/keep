<template>
    <div class="landing">
        <div class="logo">
             <div class="combined-logo pa-1">
                <span class="app-logo"><img src="../../assets/keep.png" alt="" height="40" width="40"></span>
                <span class="font-weight-bold">Keep</span>   
             </div>
            <div class="stores">
              <span><img src="../../assets/play.png" alt="" height="24" width="24" class="mr-2"></span>
              <span><img src="../../assets/apple.png" alt="" height="28" width="28"></span>      
            </div> 
        </div>
        <div class="page-illust">
        </div>
        <div class="infor">
            <div class="info-card">
               <h1 class="text-center info-title">Keep all your notes organized and customized.</h1>
               <h3 class="text-center grey--text info-subtitle">With our tool organizing is no longer a hassle.</h3>
               <h4 class="text-center info-caption">Write.Plan.and Keep</h4>
            </div>
            <v-btn
                tile
                dark
                outlined
                rounded
                color="black"
                class="text-capitalize mt-2"
                @click="googleSignIn"
                >
                <v-icon left>
                    mdi-google
                </v-icon>
                Sign in 
                </v-btn>
        </div>
                 
        <div class="footer">
          <span class="px-4 subtitle-2">Privacy</span>
          <span class="px-4 subtitle-2">&copy; 2020 Keep</span>
        </div>     
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    methods:{
        googleSignIn(){
            const provider = new firebase.auth.GoogleAuthProvider();
           firebase.auth().signInWithPopup(provider).then(result => {
          console.log(result.user.uid)
          console.log('success..google acc linked')
          this.$router.push({name:'Home'})
        }).catch(err => {
          console.log(err.message)
        })
        }
    }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  
  .landing{
      height: 100vh;
      width: 100vw;
      margin: 0;
      display: grid;
      grid-template: 9vh 82vh 6vh/56vw 44vw;
      grid-gap: 4px;
      grid-template-areas: "header header"
                            "info illust"
                            "footer footer";
  }
  
  .logo{   
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-area: header;
  }

  .combined-logo{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 0.6%;
  }
 
  #landing-illust{
      position: relative;
      
  }
  .bio{
      border-radius: 12px;
      position: relative;
      top: 18%;
      left: 10%;
      font-family: 'Montserrat', sans-serif;
  }
  .signin-button{
      position: relative;
      left: 17%;
  }
  .page-illust{
      background-image: url('../../assets/todo.svg');
      background-repeat: no-repeat;
      background-position: 24px 50px;
      background-size: 70%;
      grid-area: illust;
  }
  .infor{
     grid-area: info;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
  }
  .info-card{
      background-color: rgb(255, 255, 189);
      width: fit-content;
      height: fit-content;
      padding: 18px;
  }
  .footer{
      grid-area: footer;
      display: flex;
      align-items: center;
      justify-content: flex-end;

  }

  .stores{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin-right: 2%;
  }

  @media(max-width:1500px) and (orientation: landscape){
      .page-illust{
        background-position: center;
        background-size: 75%;
    } 
  }

  @media(max-width:1200px) and (orientation: portrait){
    .landing{
        display: grid;
      grid-template: 8vh 36vh 48vh 6vh/1fr;
      grid-gap: 4px;
      grid-template-areas: "header header"
                            "info info"
                            "illust illust"
                            "footer footer";
    }
    .page-illust{
        background-position: center;
        background-size: 55%;
    }
  }
  @media(max-width:1200px) and (orientation: landscape){
     .page-illust{
        background-position: center;
        background-size: 75%;
    } 
  }
  @media(max-width:600px) and (orientation: portrait){
     .landing{
        display: grid;
      grid-template: 1fr 5fr 4fr 1fr/1fr;
      grid-gap: 4px;
      grid-template-areas: "header header"
                            "info info"
                            "illust illust"
                            "footer footer";
    }
    .info-title{
        font-size: 1.4rem;
    }
    .info-subtitle{
        font-size: 1rem;
    } 
  }
   @media(max-width:700px) and (orientation: landscape){
      .landing{
        display: grid;
      grid-template: 1fr 6fr 4fr 1fr/1fr 1fr;
      grid-template-areas: "header header"
                            "info illust"
                            "info illust"
                            "footer footer";
      } 
      .info-title{
        font-size: 1.3rem;
    }
    .info-subtitle{
        font-size: 1rem;
    }
    .page-illust{
        background-position: center;
    } 
   }
</style>