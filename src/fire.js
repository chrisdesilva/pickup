import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "pickup-1570408445367.firebaseapp.com",
  databaseURL: "https://pickup-1570408445367.firebaseio.com/",
  projectId: "pickup-1570408445367",
  storageBucket: "pickup-1570408445367.appspot.com",
  messagingSenderId: "972713176894",
  appId: "1:972713176894:web:e61ad83c8dc931c3c4c66f"
}

firebase.initializeApp(config);

const db = firebase.firestore();
//Added this in order to make firebase storage work :)
//const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db/*, storage*/ as default } 

