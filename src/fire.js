import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default } 

