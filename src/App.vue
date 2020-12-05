<template>
 <div >
   <v-app>
    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
 </div>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
   @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
   body::-webkit-scrollbar{
       width: 6px;
   }
   body::-webkit-scrollbar-track{
       color: #FFEE58FF;
   }
   body::-webkit-scrollbar-thumb{
       background: #FFB300FF;
   }
   *{
     font-family: 'Montserrat', sans-serif;
   }
</style>
