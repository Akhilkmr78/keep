import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAhzCC2iqzrNiljVg2JV2kZM2br50tUPng",
    authDomain: "keep-clone-d2d76.firebaseapp.com",
    databaseURL: "https://keep-clone-d2d76.firebaseio.com",
    projectId: "keep-clone-d2d76",
    storageBucket: "keep-clone-d2d76.appspot.com",
    messagingSenderId: "923156271414",
    appId: "1:923156271414:web:0522353949a1f72e5da397"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();