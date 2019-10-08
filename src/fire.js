import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "pickup-93fa2.firebaseapp.com",
  databaseURL: "https://pickup-93fa2.firebaseio.com",
  projectId: "pickup-93fa2",
  storageBucket: "pickup-93fa2.appspot.com",
  messagingSenderId: "77922381802",
  appId: "1:77922381802:web:2d76c18228c4e2e7f50c93"
}

firebase.initializeApp(config);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default }
