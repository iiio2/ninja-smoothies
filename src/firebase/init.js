import firebase from "firebase/app"; 
import "firebase/firestore"; 


var firebaseConfig = {
    apiKey: "AIzaSyDEtI4bEhpk7KguZouD-WJeTlCLrs9XeJk",
    authDomain: "ninja-smoothies-f4139.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-f4139.firebaseio.com",
    projectId: "ninja-smoothies-f4139",
    storageBucket: "ninja-smoothies-f4139.appspot.com",
    messagingSenderId: "647028500304",
    appId: "1:647028500304:web:9925e3ea34578918b06e55"
  };
  // Initialize Firebase
  var firebaseApp =  firebase.initializeApp(firebaseConfig);

  firebaseApp.firestore().settings({timestampsInSnapshots:true}); 

  export default firebaseApp.firestore(); 