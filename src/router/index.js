import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Archived from '../components/Archived.vue'
import Search from '../components/searched/Search.vue'
import Starred from '../components/starred/Starred.vue'
import Landing from '../components/layouts/LandingPage.vue'
import firebase from 'firebase/app';
import 'firebase/auth'; 

Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Landing', component: Landing
  },
  {
    path: '/home', name: 'Home', component: Home, props: true, beforeEnter(to,from,next){
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          next()
        }else{
          next('/')
        }
      })
    }
  },
  {
    path: '/archive/:note_id', name: 'Archive', component: Archived, props: true
  },
  {
    path: '/archive', redirect: '/home'
  },
  {
    path: '/search', name: 'Search', component: Search
  },
  {
    path: '/starred/:user_id', name: 'Starred', component: Starred
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
