import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "pick-up-1.firebaseapp.com",
  databaseURL: "https://pick-up-1.firebaseio.com",
  projectId: "pick-up-1",
  storageBucket: "pick-up-1.appspot.com",
  messagingSenderId: "685399764272",
  appId: "1:685399764272:web:e4b4c044ec3737c3"
}

firebase.initializeApp(config);

const db = firebase.firestore();
//Added this in order to make firebase storage work :)
const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default, storage } 

